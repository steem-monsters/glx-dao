import { ethers } from "hardhat";

export const deployGLUSD = async (
  minterAddress: string,
  adminAddress: string,
  stakeModifierAddress: string
) => {
  console.log(`deployGLUSD.ts Start: \n\n`);

  // Get the contract factory
  const contractFactory = await ethers.getContractFactory("GLUSD");

  // Deploy the contract by passing the addresses as arguments
  const contract = await contractFactory.deploy(
    minterAddress,
    adminAddress,
    stakeModifierAddress
  );

  await contract.deployed();

  console.log(
    `deploy GLUSD deployed to: ${contract.address} \n\n`,
    `deployGLUSD.ts End: \n\n`
  );

  return contract.address;
};
