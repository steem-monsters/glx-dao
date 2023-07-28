import { ethers } from "hardhat";

export const deployGLUSD = async () => {

    console.log(`deployGLUSD.ts Start: \n\n`);

    const contractFactory = await ethers.getContractFactory("GLUSD");
  
    const contract = await contractFactory.deploy();
  
    await contract.deployed();
  
    console.log(`deploy GLUSD deployed to: ${contract.address} \n\n`, `deployGLUSD.ts End: \n\n`);

    return contract.address;
}