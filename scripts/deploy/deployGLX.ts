import { ethers } from "hardhat";

export const deployGLX = async () => {

    console.log(`deployGLX.ts Start: \n\n`);

    const contractFactory = await ethers.getContractFactory("GLX");
  
    const contract = await contractFactory.deploy();
  
    await contract.deployed();
  
    console.log(`deploy GLX deployed to: ${contract.address} \n\n`, `deployGLX.ts End: \n\n`);

    return contract.address;
}