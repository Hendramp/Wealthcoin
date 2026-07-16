// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title WealthCoinGenesis
 * @notice Fixed-term Genesis Early Access contract for WealthCoin.
 *
 * Buyers send native POL and receive WTC immediately.
 *
 * Genesis rules:
 * - 1 POL = 350 WTC
 * - Minimum transaction = 1 POL
 * - Maximum cumulative purchase = 5,000 POL per wallet
 * - Maximum total distribution = 21,000,000 WTC
 * - POL is forwarded immediately to the treasury
 * - WTC is delivered in the same transaction
 *
 * The contract must be funded with the full WTC allocation before opening.
 */
contract WealthCoinGenesis is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // =============================================================
    //                         CONSTANTS
    // =============================================================

    /// @notice Number of full WTC received for each full POL.
    uint256 public constant WTC_PER_POL = 350;

    /// @notice Minimum POL allowed in one purchase.
    uint256 public constant MIN_PURCHASE = 50 ether;

    /// @notice Maximum cumulative POL permitted per wallet.
    uint256 public constant MAX_PURCHASE_PER_WALLET = 5_000 ether;

    /// @notice Maximum number of full WTC allocated to Genesis.
    uint256 public constant GENESIS_ALLOCATION_WTC = 21_000_000;

    // =============================================================
    //                     IMMUTABLE CONFIGURATION
    // =============================================================

    /// @notice WealthCoin ERC-20 token.
    IERC20 public immutable wealthCoin;

    /// @notice Address receiving all POL from purchases.
    address payable public immutable treasury;

    /// @notice WTC base unit, derived from the token's decimals.
    uint256 public immutable tokenUnit;

    /// @notice Genesis allocation expressed in token base units.
    uint256 public immutable genesisAllocation;

    // =============================================================
    //                          SALE STATE
    // =============================================================

    /// @notice True only while Genesis purchases are enabled.
    bool public saleOpen;

    /// @notice True after Genesis has been permanently finalized.
    bool public saleFinalized;

    /// @notice Total POL contributed across every wallet.
    uint256 public totalPolRaised;

    /// @notice Total WTC distributed through this contract.
    uint256 public totalWtcSold;

    /// @notice Cumulative POL contributed by each wallet.
    mapping(address => uint256) public polPurchasedByWallet;

    /// @notice Cumulative WTC received by each wallet.
    mapping(address => uint256) public wtcPurchasedByWallet;

    // =============================================================
    //                            EVENTS
    // =============================================================

    event GenesisOpened(uint256 timestamp);

    event GenesisPaused(uint256 timestamp);

    event GenesisResumed(uint256 timestamp);

    event GenesisFinalized(
        uint256 totalPolRaised,
        uint256 totalWtcSold,
        uint256 timestamp
    );

    event TokensPurchased(
        address indexed buyer,
        uint256 polSpent,
        uint256 wtcReceived,
        uint256 cumulativePolSpent,
        uint256 timestamp
    );

    event UnsoldTokensRecovered(
        address indexed recipient,
        uint256 amount
    );

    event ForeignTokenRecovered(
        address indexed token,
        address indexed recipient,
        uint256 amount
    );

    // =============================================================
    //                            ERRORS
    // =============================================================

    error ZeroAddress();
    error UnsupportedTokenDecimals(uint8 decimals);
    error SaleNotOpen();
    error SaleAlreadyOpen();
    error SaleAlreadyFinalized();
    error SaleNotFinalized();
    error BelowMinimumPurchase(uint256 sent, uint256 minimum);
    error WalletCapExceeded(uint256 attemptedTotal, uint256 maximum);
    error AllocationExceeded(uint256 requested, uint256 remaining);
    error InsufficientGenesisFunding(uint256 balance, uint256 required);
    error TreasuryTransferFailed();
    error NoTokensToRecover();
    error CannotRecoverWealthCoinAsForeignToken();
    error DirectPaymentsDisabled();

    // =============================================================
    //                          CONSTRUCTOR
    // =============================================================

    /**
     * @param tokenAddress Deployed WTC token contract.
     * @param treasuryAddress Wallet receiving POL.
     * @param initialOwner Address controlling pause/open/finalize functions.
     */
    constructor(
        address tokenAddress,
        address payable treasuryAddress,
        address initialOwner
    ) Ownable(initialOwner) {
        if (
            tokenAddress == address(0) ||
            treasuryAddress == address(0) ||
            initialOwner == address(0)
        ) {
            revert ZeroAddress();
        }

        uint8 decimals = IERC20Metadata(tokenAddress).decimals();

        // WealthCoin is expected to use a conventional decimal value.
        // Restricting this prevents unsafe exponent calculations.
        if (decimals > 18) {
            revert UnsupportedTokenDecimals(decimals);
        }

        wealthCoin = IERC20(tokenAddress);
        treasury = treasuryAddress;

        tokenUnit = 10 ** uint256(decimals);
        genesisAllocation = GENESIS_ALLOCATION_WTC * tokenUnit;
    }

    // =============================================================
    //                       PURCHASE FUNCTION
    // =============================================================

    /**
     * @notice Purchase WTC with native POL.
     * @dev WTC is delivered and POL forwarded in the same transaction.
     */
    function buyTokens()
        external
        payable
        nonReentrant
        whenNotPaused
    {
        if (!saleOpen || saleFinalized) {
            revert SaleNotOpen();
        }

        if (msg.value < MIN_PURCHASE) {
            revert BelowMinimumPurchase(msg.value, MIN_PURCHASE);
        }

        uint256 newWalletTotal =
            polPurchasedByWallet[msg.sender] + msg.value;

        if (newWalletTotal > MAX_PURCHASE_PER_WALLET) {
            revert WalletCapExceeded(
                newWalletTotal,
                MAX_PURCHASE_PER_WALLET
            );
        }

        uint256 tokenAmount = calculateTokenAmount(msg.value);
        uint256 remaining = remainingAllocation();

        if (tokenAmount > remaining) {
            revert AllocationExceeded(tokenAmount, remaining);
        }

        uint256 contractBalance =
            wealthCoin.balanceOf(address(this));

        if (contractBalance < tokenAmount) {
            revert InsufficientGenesisFunding(
                contractBalance,
                tokenAmount
            );
        }

        // Effects first.
        polPurchasedByWallet[msg.sender] = newWalletTotal;
        wtcPurchasedByWallet[msg.sender] += tokenAmount;
        totalPolRaised += msg.value;
        totalWtcSold += tokenAmount;

        // Deliver WTC immediately.
        wealthCoin.safeTransfer(msg.sender, tokenAmount);

        // Forward POL immediately to treasury.
        (bool sent, ) = treasury.call{value: msg.value}("");

        if (!sent) {
            revert TreasuryTransferFailed();
        }

        emit TokensPurchased(
            msg.sender,
            msg.value,
            tokenAmount,
            newWalletTotal,
            block.timestamp
        );
    }

    // =============================================================
    //                         ADMIN FUNCTIONS
    // =============================================================

    /**
     * @notice Opens Genesis after confirming full funding.
     */
    function openGenesis() external onlyOwner {
        if (saleFinalized) {
            revert SaleAlreadyFinalized();
        }

        if (saleOpen) {
            revert SaleAlreadyOpen();
        }

        uint256 requiredBalance =
            genesisAllocation - totalWtcSold;

        uint256 currentBalance =
            wealthCoin.balanceOf(address(this));

        if (currentBalance < requiredBalance) {
            revert InsufficientGenesisFunding(
                currentBalance,
                requiredBalance
            );
        }

        saleOpen = true;

        if (paused()) {
            _unpause();
        }

        emit GenesisOpened(block.timestamp);
    }

    /**
     * @notice Temporarily stops purchases.
     */
    function pauseGenesis() external onlyOwner {
        saleOpen = false;
        _pause();

        emit GenesisPaused(block.timestamp);
    }

    /**
     * @notice Resumes purchases after a temporary pause.
     */
    function resumeGenesis() external onlyOwner {
        if (saleFinalized) {
            revert SaleAlreadyFinalized();
        }

        uint256 requiredBalance =
            genesisAllocation - totalWtcSold;

        uint256 currentBalance =
            wealthCoin.balanceOf(address(this));

        if (currentBalance < requiredBalance) {
            revert InsufficientGenesisFunding(
                currentBalance,
                requiredBalance
            );
        }

        saleOpen = true;
        _unpause();

        emit GenesisResumed(block.timestamp);
    }

    /**
     * @notice Permanently closes this Genesis phase.
     */
    function finalizeGenesis() external onlyOwner {
        if (saleFinalized) {
            revert SaleAlreadyFinalized();
        }

        saleOpen = false;
        saleFinalized = true;

        if (!paused()) {
            _pause();
        }

        emit GenesisFinalized(
            totalPolRaised,
            totalWtcSold,
            block.timestamp
        );
    }

    /**
     * @notice Recovers unsold WTC only after permanent finalization.
     */
    function recoverUnsoldTokens(
        address recipient
    ) external onlyOwner nonReentrant {
        if (!saleFinalized) {
            revert SaleNotFinalized();
        }

        if (recipient == address(0)) {
            revert ZeroAddress();
        }

        uint256 balance = wealthCoin.balanceOf(address(this));

        if (balance == 0) {
            revert NoTokensToRecover();
        }

        wealthCoin.safeTransfer(recipient, balance);

        emit UnsoldTokensRecovered(recipient, balance);
    }

    /**
     * @notice Recovers an unrelated ERC-20 accidentally sent here.
     * @dev WTC must use recoverUnsoldTokens after finalization.
     */
    function recoverForeignToken(
        address tokenAddress,
        address recipient
    ) external onlyOwner nonReentrant {
        if (
            tokenAddress == address(0) ||
            recipient == address(0)
        ) {
            revert ZeroAddress();
        }

        if (tokenAddress == address(wealthCoin)) {
            revert CannotRecoverWealthCoinAsForeignToken();
        }

        IERC20 foreignToken = IERC20(tokenAddress);
        uint256 balance = foreignToken.balanceOf(address(this));

        if (balance == 0) {
            revert NoTokensToRecover();
        }

        foreignToken.safeTransfer(recipient, balance);

        emit ForeignTokenRecovered(
            tokenAddress,
            recipient,
            balance
        );
    }

    // =============================================================
    //                         VIEW FUNCTIONS
    // =============================================================

    /**
     * @notice Calculates WTC received for a given POL amount.
     */
    function calculateTokenAmount(
        uint256 polAmount
    ) public view returns (uint256) {
        return
            (polAmount * WTC_PER_POL * tokenUnit) /
            1 ether;
    }

    /**
     * @notice Remaining WTC available in the Genesis allocation.
     */
    function remainingAllocation()
        public
        view
        returns (uint256)
    {
        return genesisAllocation - totalWtcSold;
    }

    /**
     * @notice Remaining POL a wallet may contribute.
     */
    function remainingWalletAllowance(
        address buyer
    ) external view returns (uint256) {
        uint256 purchased = polPurchasedByWallet[buyer];

        if (purchased >= MAX_PURCHASE_PER_WALLET) {
            return 0;
        }

        return MAX_PURCHASE_PER_WALLET - purchased;
    }

    /**
     * @notice True when contract is funded for all remaining sales.
     */
    function isFullyFunded() external view returns (bool) {
        return
            wealthCoin.balanceOf(address(this)) >=
            remainingAllocation();
    }

    // =============================================================
    //                      DIRECT PAYMENT GUARDS
    // =============================================================

    receive() external payable {
        revert DirectPaymentsDisabled();
    }

    fallback() external payable {
        revert DirectPaymentsDisabled();
    }
}