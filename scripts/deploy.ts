// Import the necessary modules and functions
import { devEnv } from "../dev/inxex"; // Import the devEnv function from the 'inxex' module
import * as dotenv from "dotenv"; // Import the 'dotenv' module to read environment variables
dotenv.config(); // Load the environment variables from the '.env' file

import { deployGLX, deployGLUSD } from "./deploy/index"; // Import the deployGLX and deployGLUSD functions from the './deploy/index' module

// Extract the required environment variables from the 'process.env' object
const {
  PUBLIC_KEY,
  PRIVATE_KEY,
  INFURA_API_KEY,
  ADMIN_ADDRESS,
  MINTER_ADDRESS,
  STAKE_MODIFIER_ADDRESS,
  GLX,
  GLUSD,
} = process.env;

let glx: string, glusd: string; // Declare two variables to store the contract addresses of GLX and GLUSD

// Define an async function named 'deploy' to deploy the contracts if not already deployed
const deploy = async () => {
  // Check if the GLX contract address is provided in the environment variables
  if (GLX == "") {
    // If not provided, deploy the GLX contract with the specified admin, minter, and stake modifier addresses
    glx = await deployGLX(
      ADMIN_ADDRESS ?? "", // If ADMIN_ADDRESS is not provided, use an empty string
      MINTER_ADDRESS ?? "", // If MINTER_ADDRESS is not provided, use an empty string
      STAKE_MODIFIER_ADDRESS ?? "" // If STAKE_MODIFIER_ADDRESS is not provided, use an empty string
    );
  } else {
    // If GLX contract address is provided, use it directly
    glx = GLX ?? "";
  }

  // Check if the GLUSD contract address is provided in the environment variables
  if (GLUSD == "") {
    // If not provided, deploy the GLUSD contract with the specified admin, minter, and stake modifier addresses
    glusd = await deployGLUSD(
      ADMIN_ADDRESS ?? "", // If ADMIN_ADDRESS is not provided, use an empty string
      MINTER_ADDRESS ?? "", // If MINTER_ADDRESS is not provided, use an empty string
      STAKE_MODIFIER_ADDRESS ?? "" // If STAKE_MODIFIER_ADDRESS is not provided, use an empty string
    );
  } else {
    // If GLUSD contract address is provided, use it directly
    glusd = GLUSD ?? "";
  }
};

// Define the main async function to deploy contracts and set up the development environment
const main = async () => {
  await deploy(); // Deploy the contracts if not already deployed
  await devEnv(
    glx, // Pass the GLX contract address to the devEnv function
    glusd, // Pass the GLUSD contract address to the devEnv function
    PUBLIC_KEY, // Pass the PUBLIC_KEY to the devEnv function
    PRIVATE_KEY, // Pass the PRIVATE_KEY to the devEnv function
    INFURA_API_KEY, // Pass the INFURA_API_KEY to the devEnv function
    ADMIN_ADDRESS, // Pass the ADMIN_ADDRESS to the devEnv function
    MINTER_ADDRESS, // Pass the MINTER_ADDRESS to the devEnv function
    STAKE_MODIFIER_ADDRESS // Pass the STAKE_MODIFIER_ADDRESS to the devEnv function
  );
};

// Call the main function and handle any errors that may occur during execution
main().catch((error) => {
  console.error(error); // Log the error to the console
  process.exitCode = 1; // Set the exit code to 1 to indicate an error
});
