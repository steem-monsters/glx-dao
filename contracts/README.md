# GLX Token Contract Readme

## Overview

The GLX token contract is a Solidity smart contract representing the "Genesis League Governance" token (GLX). It is an implementation of the ERC-20 standard, with additional functionality for voting delegation and a cross-chain bridge. This document provides comprehensive information about the GLX token contract, including its features, functions, and usage guidelines.

## Contract Details

### Token Information

- **Name:** Genesis League Governance
- **Symbol:** GLX
- **Decimals:** 18
- **Total Supply:** 0 (initially)

### Token Holders

The contract maintains a record of token balances for each account and allows transferring tokens between accounts. Token holders can view their own balances and approve other accounts to spend tokens on their behalf.

### Voting and Delegation

The GLX token contract includes a delegation mechanism, allowing token holders to delegate their voting power to another address. The delegation is used for voting in governance decisions. Delegating votes to another address does not transfer token ownership.

The contract keeps track of voting power checkpoints for each account, allowing efficient vote balance retrieval. The `getCurrentVotes` and `getPriorVotes` functions provide access to the current and past vote balances for a given account.

### Stake Modifier Integration

The contract integrates with an external contract (`IStakeModifier`) to modify the voting power of accounts based on certain conditions. If the `stakeModifier` contract address is set, the voting power of an account is adjusted accordingly. The `getModifiedVotes` function calculates the modified voting power for an account, considering the external stake modifier.

### Admin and Minter Roles

The contract includes an admin role that can update the admin, minter, and stake modifier addresses. The admin role can also mint new tokens to designated accounts.

The minter role is allowed to call the `mint` function to create additional tokens and distribute them to specified accounts.

## Functions

The contract includes several functions to interact with the token and delegate voting power. Here is a brief overview of the key functions:

- **`allowance(address account, address spender) external view returns (uint256)`**: Get the number of tokens `spender` is approved to spend on behalf of `account`.
- **`approve(address spender, uint256 rawAmount) external returns (bool)`**: Approve `spender` to transfer up to `amount` from `msg.sender`.
- **`balanceOf(address account) external view returns (uint256)`**: Get the number of tokens held by the `account`.
- **`transfer(address dst, uint256 rawAmount) public returns (bool)`**: Transfer `amount` tokens from `msg.sender` to `dst`.
- **`transferFrom(address src, address dst, uint256 rawAmount) public returns (bool)`**: Transfer `amount` tokens from `src` to `dst` if `msg.sender` has been approved to spend the tokens.
- **`delegate(address delegatee) public`**: Delegate votes from `msg.sender` to `delegatee`.
- **`delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s) public`**: Delegates votes from signatory to `delegatee` using an EIP-712 signature.
- **`getCurrentVotes(address account) external view returns (uint96)`**: Get the current votes balance for `account`.
- **`getPriorVotes(address account, uint256 blockNumber) public view returns (uint96)`**: Determine the prior number of votes for an account as of a specific block number.
- **`setAdmin(address newAdmin) external adminOnly`**: Set a new admin address. Only callable by the current admin.
- **`setMinter(address newMinter) external adminOnly`**: Set a new minter address. Only callable by the current admin.
- **`setStakeModifier(address newStakeModifier) external adminOnly`**: Set a new stake modifier contract address. Only callable by the current admin.
- **`mint(address toAccount, uint256 amount) external minterOnly`**: Mint additional tokens to the specified account. Only callable by the current minter.

### Cross-chain Bridge Functions

The contract also includes functions for handling cross-chain transfers through a bridge:

- **`bridgeTransfer(address bridgeAddress, uint256 rawAmount, string calldata externalAddress) external returns(bool)`**: Transfer tokens to the cross-chain bridge.
- **`bridgeTransferFrom(address sourceAddress, address bridgeAddress, uint256 rawAmount, string calldata externalAddress) external returns(bool)`**: Transfer tokens from an address to the cross-chain bridge.

## Events

The contract emits several events to keep track of important activities:

- **`Transfer(address indexed from, address indexed to, uint256 amount)`**: Emitted when tokens are transferred between accounts.
- **`Approval(address indexed owner, address indexed spender, uint256 amount)`**: Emitted when an account approves another to spend tokens on its behalf.
- **`DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate)`**: Emitted when an account changes its delegate (voting power delegation).
- **`DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance)`**: Emitted when a delegate account's vote balance changes.
- **`SetAdmin(address indexed newAdmin, address indexed oldAdmin)`**: Emitted when the admin address is updated.
- **`SetMinter(address indexed newMinter, address indexed oldAdmin)`**: Emitted when the minter address is updated.
- **`BridgeTransfer(address indexed sender, address indexed receiver, uint256 amount, string externalAddress)`**: Emitted when tokens are transferred to the cross-chain bridge.
- **`SetStakeModifier(address indexed newStakeModifier, address indexed oldStakeModifier)`**: Emitted when the stake modifier contract address is updated.

## Usage

Before deploying the contract, ensure that you have the required information for constructor parameters:

- `adminAddress`: The address with admin rights for the contract.
- `minterAddress`: The address with minter rights, capable of calling the `mint` function.
- `stakeModifierAddress`: The address of the stake modifier contract that implements the `IStakeModifier` interface.

After deployment, the contract can be used as follows:

1. Token Holders:
   - View your token balance using the `balanceOf` function.
   - Transfer tokens to other accounts using the `transfer` function.
   - Approve other accounts to spend tokens on your behalf using the `approve` function.
   - Delegate your voting power to another address using the `delegate` function.

2. Delegated Voting:
   - View the current vote balance for an account using the `getCurrentVotes` function.
   - Determine the prior vote balance for an account at a specific block number using the `getPriorVotes` function.

3. Admin and Minter Actions:
   - Set a new admin address using the `setAdmin` function (admin-only).
   - Set a new minter address using the `setMinter` function (admin-only).
   - Set a new stake modifier contract address using the `setStakeModifier` function (admin-only).
   - Mint new tokens to designated accounts using the `mint` function (minter-only).

4. Cross-Chain Bridge:
   - Transfer tokens to the cross-chain bridge using the `bridgeTransfer` function.


   - Transfer tokens from an address to the cross-chain bridge using the `bridgeTransferFrom` function.

## Security Considerations

- Before deploying the contract, thoroughly review the code and perform security audits to identify potential vulnerabilities.
- Ensure that the admin and minter roles are assigned to trusted addresses only.
- Use secure methods for storing sensitive data, such as private keys for EIP-712 signature verification.
- Be cautious when interacting with external contracts, especially the `stakeModifier` contract, to prevent potential exploits.

## Disclaimer

The provided information is for educational purposes only and should not be considered as financial or investment advice. Deploying and using smart contracts involves risks, and users should exercise caution and conduct due diligence before interacting with the contract.

## License

The GLX token contract is open-source software released under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute the contract following the terms of the license.