# GLX Contract Deployment and Development Environment Setup

This repository contains code for deploying the GLX contract and setting up the development environment. The GLX contract is deployed to the Ethereum network, and the development environment is configured with the necessary parameters.

## Prerequisites

Before running the code, ensure you have the following prerequisites:

1. Node.js and npm installed on your system.
2. An Ethereum wallet with some Ether for gas fees.
3. Infura API Key to interact with the Ethereum network.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo.git
```

2. Install the project dependencies:

```bash
cd your-repo
npm install
```

## Configuration

1. Create a `.env` file in the project root and add the following environment variables:

```env
PUBLIC_KEY=your_public_key
PRIVATE_KEY=your_private_key
INFURA_API_KEY=your_infura_api_key
ADMIN_ADDRESS=your_admin_address
MINTER_ADDRESS=your_minter_address
STAKE_MODIFIER_ADDRESS=your_stake_modifier_address
GLX=your_glx_contract_address
GLUSD=your_glusd_contract_address
```

Replace `your_public_key`, `your_private_key`, `your_infura_api_key`, `your_admin_address`, `your_minter_address`, `your_stake_modifier_address`, `your_glx_contract_address`, and `your_glusd_contract_address` with your actual values.

## Usage

To deploy the contracts and set up the development environment, run the following command:

```bash
npm run deploy
```

This command will deploy the GLX contract and GLUSD contract if they are not already deployed. It will also set up the development environment with the provided parameters.

## Swagger Documentation

The code contains inline comments to generate Swagger documentation for the API endpoints. The Swagger documentation will provide detailed information about the API endpoints and their functionalities.

## Troubleshooting

If you encounter any issues or errors during deployment or setup, please refer to the error messages in the console. If you need further assistance, feel free to reach out to the project maintainers.