# WealthCoin Marketplace Escrow

## Contracts

The marketplace uses the deployed Polygon mainnet contracts:

- WTC: `0x394b57F4a40ff31530d66f904e1Db2C6516c018F`
- Chain: Polygon mainnet, chain ID `137`
- Factory: configured with `VITE_ESCROW_FACTORY_ADDRESS`

Set the factory address in `.env`:

```env
VITE_ESCROW_FACTORY_ADDRESS=0x...
```

The application does not deploy or redeploy contracts and never hardcodes the factory address.

## Purchase flow

A buyer may need to approve and fund three separate transactions:

1. **Create escrow**: the factory creates an escrow and emits `EscrowCreated`.
2. **Approve WTC**: the buyer approves the new escrow address to spend the locked WTC amount.
3. **Fund escrow**: the escrow pulls WTC from the buyer and becomes `Paid`.

The buyer receives a wallet confirmation and pays gas for each transaction. A user rejection is shown as “You cancelled the transaction”.

The purchase UI locks its WTC amount from the listing USD price and current GeckoTerminal WTC/USD rate. The on-chain escrow `priceInWTC` is re-read before funding. Supabase escrow fields are updated only after the successful chain sequence and never reverse a successful chain action.

## Chain and Supabase

Supabase is the listing/index layer. The escrow contract is the source of truth for state and parties. Successful state-changing actions update `status_chain` best-effort and failures are logged without reversing the chain transaction.

Run `supabase/migrations/20261123_escrow_marketplace.sql` in Supabase to add escrow fields, dispute storage, wallet storage, and indexes.
