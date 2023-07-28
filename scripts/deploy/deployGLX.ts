import { ethers } from "hardhat";

export const deployGLX = async () => {
    console.log(`deployGLX.ts Start: \n\n`);

    // Define the addresses for admin, minter, and stakeModifier
    const adminAddress = "0xYourAdminAddress"; // Replace with the actual address
    const minterAddress = "0xYourMinterAddress"; // Replace with the actual address
    const stakeModifierAddress = "0xYourStakeModifierAddress"; // Replace with the actual address

    // Get the contract factory
    const contractFactory = await ethers.getContractFactory("GLX");

    // Deploy the contract by passing the addresses as arguments
    const contract = await contractFactory.deploy(
        minterAddress,
        adminAddress,
        stakeModifierAddress
    );

    await contract.deployed();

    console.log(`deploy GLX deployed to: ${contract.address} \n\n`, `deployGLX.ts End: \n\n`);

    return contract.address;
};
