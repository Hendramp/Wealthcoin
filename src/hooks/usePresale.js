import { useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACTS, POLYGON_RPC_URL, TARGET_CHAIN_ID } from '../contracts/addresses';
import { ERC20_ABI, PRESALE_ABI, STAKING_ABI } from '../contracts/abis';

const emptyStats = {
  rate: 0n,
  totalSold: 0n,
  totalRaised: 0n,
  remainingTokens: 0n,
  currentStage: 0n,
  currentStageRemaining: 0n,
  started: false,
  paused: false,
  startTime: 0n,
  presaleCap: 0n,
  tokenBalance: 0n,
  polBalance: 0n,
  stakedBalance: 0n,
  pendingRewards: 0n,
  totalStaked: 0n,
};

export function usePresale(account, chainId, providerSource, addToast) {
  const [stats, setStats] = useState(emptyStats);
  const [loading, setLoading] = useState(false);
  const [polInput, setPolInput] = useState('');
  const [estimate, setEstimate] = useState(0n);

  const readProvider = useMemo(() => new ethers.JsonRpcProvider(POLYGON_RPC_URL), []);

  const refresh = useCallback(async () => {
    try {
      const presale = new ethers.Contract(CONTRACTS.WTC_PRESALE, PRESALE_ABI, readProvider);
      const token = new ethers.Contract(CONTRACTS.WTC_TOKEN, ERC20_ABI, readProvider);
      const staking = new ethers.Contract(CONTRACTS.WTC_STAKING, STAKING_ABI, readProvider);

      const [
        rate,
        totalSold,
        totalRaised,
        remainingTokens,
        currentStage,
        started,
        paused,
        startTime,
        presaleCap,
        totalStaked,
      ] = await Promise.all([
        presale.getCurrentRate(),
        presale.totalSold(),
        presale.totalRaised(),
        presale.remainingTokens(),
        presale.currentStage(),
        presale.hasStarted(),
        presale.paused(),
        presale.startTime(),
        presale.PRESALE_CAP(),
        staking.totalStaked().catch(() => 0n),
      ]);

      const currentStageRemaining = 0n;

      let tokenBalance = 0n;
      let polBalance = 0n;
      let stakedBalance = 0n;
      let pendingRewards = 0n;

      if (account) {
        [tokenBalance, polBalance, stakedBalance, pendingRewards] = await Promise.all([
          token.balanceOf(account).catch(() => 0n),
          readProvider.getBalance(account).catch(() => 0n),
          staking.stakedBalance(account).catch(() => 0n),
          staking.pendingRewards(account).catch(() => 0n),
        ]);
      }

      setStats({
        rate,
        totalSold,
        totalRaised,
        remainingTokens,
        currentStage,
        currentStageRemaining,
        started,
        paused,
        startTime,
        presaleCap,
        tokenBalance,
        polBalance,
        stakedBalance,
        pendingRewards,
        totalStaked,
      });
    } catch (error) {
      console.error('PRESALE ERROR:', error);
      addToast?.('Could not load presale data. Check Polygon RPC connection.', 'error');
    }
  }, [account, addToast, readProvider]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 12000);
    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    let cancelled = false;

    async function loadEstimate() {
      try {
        if (!polInput || Number(polInput) <= 0) {
          setEstimate(0n);
          return;
        }

        const presale = new ethers.Contract(CONTRACTS.WTC_PRESALE, PRESALE_ABI, readProvider);
        const tokens = await presale.estimateTokens(ethers.parseEther(polInput));

        if (!cancelled) setEstimate(tokens);
      } catch {
        if (!cancelled) setEstimate(0n);
      }
    }

    loadEstimate();

    return () => {
      cancelled = true;
    };
  }, [polInput, readProvider]);

  const buy = useCallback(async () => {
    if (!account) throw new Error('Connect wallet first.');
    if (chainId !== TARGET_CHAIN_ID) throw new Error('Switch to Polygon Mainnet first.');
    if (!polInput || Number(polInput) <= 0) throw new Error('Enter a valid POL amount.');
    if (!stats.started) throw new Error('Presale has not started yet.');
    if (stats.paused) throw new Error('Presale is currently paused.');
    if (!providerSource) throw new Error('Wallet provider not found.');

    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(providerSource);
      const signer = await provider.getSigner();
      const presale = new ethers.Contract(CONTRACTS.WTC_PRESALE, PRESALE_ABI, signer);
      const tx = await presale.buy({ value: ethers.parseEther(polInput) });

      addToast?.(`Transaction submitted: ${tx.hash.slice(0, 10)}...`, 'info');

      await tx.wait();

      addToast?.(`Purchase complete. You received ${ethers.formatEther(estimate)} WTC.`, 'success');

      setPolInput('');
      await refresh();

      return tx.hash;
    } finally {
      setLoading(false);
    }
  }, [account, addToast, chainId, estimate, polInput, providerSource, refresh, stats.paused, stats.started]);

  return { stats, polInput, setPolInput, estimate, loading, buy, refresh };
}