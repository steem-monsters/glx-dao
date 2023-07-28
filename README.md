# GLX DAO - Comprehensive Readme

GLX DAO is a Decentralized Autonomous Organization that implements a governance token contract called GLX, which allows users to participate in voting on proposals to influence the decision-making process within the organization. This Readme provides a comprehensive guide on how to set up and run the GLX DAO application using TypeScript and Hardhat.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Hardhat Configuration](#hardhat-configuration)
- [GLX Token Contract](#glx-token-contract)
- [Deployment](#deployment)
- [Interacting with the GLX DAO](#interacting-with-the-glx-dao)
- [Testing](#testing)
- [Additional Resources](#additional-resources)

## Getting Started

### Prerequisites

To set up and run the GLX DAO application, ensure you have the following installed on your system:

1. Node.js: GLX DAO is built using TypeScript, so make sure you have Node.js installed. You can download it from the official website: https://nodejs.org/

2. Git: You will need Git installed to clone the GLX DAO repository.

### Installation

Follow these steps to set up the GLX DAO application:

1. Clone the Repository:

```bash
git clone <repository-url>
cd glx-dao
```

2. Install Dependencies:

```bash
npm install
```

## Hardhat Configuration

Hardhat is used as the development environment and build tool for the GLX DAO application. The configuration for Hardhat is defined in the `hardhat.config.ts` file in the root directory.

The configuration specifies the solidity version, network settings, and other options for compiling, testing, and deploying contracts.

## GLX Token Contract

The GLX token contract is defined in the `contracts/GLX.sol` file. This contract implements the functionality of an ERC-20 token with additional features for voting and delegation. Key functionalities of the GLX token contract include:

- Token Name, Symbol, and Decimals: The GLX token adheres to the EIP-20 standard with a name, symbol, and decimal places.

- Token Balances: The contract maintains the balance of tokens for each account.

- Delegation: Token holders can delegate their voting power to another account to participate in governance.

- Voting Power: The voting power of each account is determined based on the number of tokens they hold, with modifications using a StakeModifier contract.

- Checkpoints: The contract keeps track of voting checkpoints for each account to enable voting snapshots.

- Minting: The contract allows an admin address to mint additional tokens.

- Cross-chain Bridge: The contract allows transferring tokens to a cross-chain bridge for compatibility with other blockchains.

## Deployment

To deploy the GLX token contract to a network, follow these steps:

1. Set up Infura: You will need an Infura project ID to connect to the desired Ethereum network (e.g., Goerli). Sign up for a free account on the Infura website and obtain the project ID.

2. Update `secrets.json`: Create a `secrets.json` file in the root directory with your Infura project ID and a private key for an account on the desired network.

3. Compile Contracts: Before deploying, compile the Solidity contracts using Hardhat:

```bash
npx hardhat compile
```

4. Deploy the Contract: Use the `deployGLX.ts` script to deploy the GLX token contract to the desired network. Run:

```bash
npx hardhat run --network <network-name> deploy/deployGLX.ts
```

Replace `<network-name>` with the name of the network you want to deploy to, such as `goerli`, `rinkeby`, or `mainnet`.

## Interacting with the GLX DAO

To interact with the GLX DAO contract after deployment, you can use a wallet or a DApp that supports the Ethereum network you deployed to. Interactions with the contract include:

- Transferring Tokens: Users can transfer GLX tokens to other accounts.

- Delegation: Token holders can delegate their voting power to another address.

- Voting: Delegators and token holders can vote on governance proposals.

- View Voting Power: Users can check their current voting power.

## Testing

Testing the GLX DAO contract is crucial to ensure its functionality and security. The test cases are defined in the `test` directory using Hardhat's testing framework.

To run the tests, use the following command:

```bash
npx hardhat test --network <network-name>
```

Replace `<network-name>` with the name of the network you want to test on.

## Additional Resources

For more information on Solidity, Hardhat, and Ethereum development, refer to the following resources:

- Solidity Documentation: https://docs.soliditylang.org/

- Hardhat Documentation: https://hardhat.org/getting-started/

- Ethereum Development with Hardhat and Typescript: