# ZPAY

## Project Overview

ZPAY is a confidential payments application built with Zama FHEVM. It gives users a privacy-preserving way to move value on Ethereum while keeping sensitive financial data encrypted on-chain.

With ZPAY, users can:

- Shield funds into an encrypted vault
- View confidential balances
- Send encrypted transfers
- Request confidential withdrawals (unshield)
- Preserve financial privacy using Fully Homomorphic Encryption

## Why ZPAY

Traditional blockchains make balances, transfers, and transaction patterns publicly visible. That transparency is powerful for verification, but it creates a major privacy problem for payments.

ZPAY solves this by using Fully Homomorphic Encryption through Zama FHEVM. Instead of exposing balances and transfer amounts in plaintext, ZPAY keeps payment state encrypted on-chain while still allowing the smart contract to process confidential logic securely.

## Features

- Confidential balances stored as encrypted on-chain state
- Confidential transfers between users without revealing amounts publicly
- Shield deposits that move ETH into the encrypted vault flow
- Confidential withdrawal flow for unshielding funds back to clear ETH
- Local balance decryption for user-side balance visibility
- Event history for shield, transfer, and withdrawal activity
- Responsive desktop and mobile UI
- Sepolia deployment for live demo and testing

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Solidity
- Hardhat
- Zama FHEVM
- ethers.js
- MetaMask
- Vercel

## Smart Contract

ZPAY is powered by a vault contract that keeps balances encrypted on-chain and exposes the core confidential payment flows:

- `shield()`  
  Accepts value into the vault and credits encrypted user balance.

- `transfer()`  
  Moves encrypted value between users without exposing the amount publicly.

- `balanceOf()`  
  Returns the encrypted balance handle associated with a user.

- `unshield()`  
  Starts the confidential withdrawal flow for encrypted funds.

- `finalizeUnshield()`  
  Verifies the decryption result and completes ETH release to the user.

All balances remain encrypted on-chain throughout normal operation. Plaintext amounts are not stored in public contract state.

## Confidential Withdrawal Flow

ZPAY uses a structured confidential withdrawal flow:

1. User requests a withdrawal with `unshield()`.
2. The withdrawal ciphertext becomes publicly decryptable for the withdrawal process.
3. Zama relayer/KMS returns a verified plaintext result.
4. The contract verifies the proof attached to that plaintext.
5. ETH is released to the user.
6. The encrypted balance is reduced accordingly.

## Architecture

```text
User
↓
Frontend (Next.js)
↓
MetaMask
↓
ZPAY Vault (FHEVM)
↓
Encrypted State
↓
Zama Relayer/KMS
↓
Verified Decryption Callback
```

## Hackathon Submission Notes

ZPAY is designed as a practical showcase of confidential payments on Ethereum using Zama FHEVM. The project focuses on proving that privacy-preserving balances, transfers, and withdrawals can be delivered through a familiar wallet-based UX while keeping sensitive financial data encrypted by default.
