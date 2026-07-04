import { ethers } from 'ethers';

export function shortAddr(addr) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';
}

export function formatToken(value, decimals = 18, digits = 2) {
  try {
    const formatted = ethers.formatUnits(value ?? 0n, decimals);
    const [whole, frac = ''] = formatted.split('.');
    const wholeFmt = Number(whole).toLocaleString();
    const trimmed = frac.slice(0, digits).replace(/0+$/, '');
    return trimmed ? `${wholeFmt}.${trimmed}` : wholeFmt;
  } catch {
    return '0';
  }
}

export function formatNumber(value, digits = 2) {
  const n = Number(value || 0);
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}

export function formatCountdown(seconds) {
  const total = Math.max(0, Number(seconds || 0));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return { d, h, m, s };
}
