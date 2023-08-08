import * as dotenv from "dotenv";
dotenv.config();
const { INFURA_API_KEY, PRIVATE_KEY, RPC_FAST_KEY } = process.env;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and replace "KEY" with it
const config: HardhatUserConfig = {
  networks: {
    ganache: {
      url: "http://localhost:7545", // the URL where your Ganache instance is running
      accounts: {
        mnemonic:
          "before advance diary mountain loyal find position loan spawn one day inform", // your Ganache mnemonic
      },
    },
    goerli: {
      url: "https://goerli.infura.io/v3/" + INFURA_API_KEY,
      accounts: [PRIVATE_KEY ?? ""],
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/" + INFURA_API_KEY,
      accounts: [PRIVATE_KEY ?? ""],
    },
    bsc: {
      url: "https://bsc-mainnet.rpcfast.com?api_key=" + RPC_FAST_KEY,
      accounts: [PRIVATE_KEY ?? ""],
    },
    avalanche: {
      url: "https://avalanche-mainnet.infura.io/v3/" + INFURA_API_KEY,
      accounts: [PRIVATE_KEY ?? ""],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};

export default config;
