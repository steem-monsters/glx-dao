import { ethers } from "hardhat";

export const deployGLUSD = async () => {
    console.log(`deployGLUSD.ts Start: \n\n`);

    // Define the addresses for admin, minter, and stakeModifier
    const adminAddress = process.env.ADMIN_ADDRESS; // Replace with the actual address
    const minterAddress = process.env.MINTER_ADDRESS; // Replace with the actual address
    const stakeModifierAddress = process.env.STAKE_MODIFIER_ADDRESS; // Replace with the actual address

    // Get the contract factory
    const contractFactory = await ethers.getContractFactory("GLUSD");

    // Deploy the contract by passing the addresses as arguments
    const contract = await contractFactory.deploy(
        minterAddress,
        adminAddress,
        stakeModifierAddress
    );

    await contract.deployed();

    console.log(`deploy GLUSD deployed to: ${contract.address} \n\n`, `deployGLUSD.ts End: \n\n`);

    return contract.address;
};
