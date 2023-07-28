# GLX Contract Tests

This repository contains tests for the GLX smart contract using Hardhat and Chai. The GLX contract is a decentralized governance token contract.

## Table of Contents

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
- [Description](#description)
- [License](#license)

## Installation

To run the tests locally, make sure you have Node.js and npm installed. Then, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install the dependencies:

```bash
npm install
```

3. Compile the contracts (if not done already):

```bash
npx hardhat compile
```

## Running the Tests

To run the tests, use the following command:

```bash
npx hardhat test
```

This will execute the test suite and display the test results.

## Description

The GLX contract is a decentralized governance token contract. The test suite covers various functionalities of the contract, including:

- Checking initial values of the contract (name, symbol, decimals, total supply, admin, minter, stake modifier).
- Testing token transfers between accounts.
- Testing token transfers with approved allowances.
- Ensuring that token transfers fail if the sender does not have enough balance.
- Checking the emission of the "Transfer" event on token transfers.
- Approving tokens for delegated transfers.
- Checking the emission of the "Approval" event on token approvals.
- Verifying token delegation to a delegatee.
- Testing token delegation by signature.
- Verifying the current votes balance for an account.
- Determining the prior number of votes for an account.
- Testing token minting functionality by the minter.
- Verifying that non-minter accounts cannot mint tokens.
- Ensuring the update of admin, minter, and stake modifier addresses.

The test suite uses Hardhat for compiling and running the contracts and Chai for assertions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Make sure to replace "your-username/your-repo" with the appropriate GitHub repository URL for your project. Additionally, update the "Description" section with any additional relevant information about the contract and its functionalities.