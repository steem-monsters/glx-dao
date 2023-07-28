import { ethers } from "hardhat";

export const deployGLX = async (
  minterAddress:string,
  adminAddress:string,
  stakeModifierAddress:string
) => {
  console.log(`deployGLX.ts Start: \n\n`);

  // Get the contract factory
  const contractFactory = await ethers.getContractFactory("GLX");

  // Deploy the contract by passing the addresses as arguments
  const contract = await contractFactory.deploy(
    minterAddress,
    adminAddress,
    stakeModifierAddress
  );

  await contract.deployed();

  console.log(
    `deploy GLX deployed to: ${contract.address} \n\n`,
    `deployGLX.ts End: \n\n`
  );

  return contract.address;
};
