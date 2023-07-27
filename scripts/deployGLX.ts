// deploy/deployGLX.ts
import { ethers, upgrades, waffle } from 'hardhat';
import { GLX } from '../typechain/GLX';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying GLX token contract with the account:', deployer.address);

  // Deploy GLX contract
  const GLXFactory = await ethers.getContractFactory('GLX');
  const glx: GLX = (await upgrades.deployProxy(GLXFactory, [deployer.address, deployer.address, deployer.address])) as GLX;
  await glx.deployed();

  console.log('GLX token contract deployed to:', glx.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
