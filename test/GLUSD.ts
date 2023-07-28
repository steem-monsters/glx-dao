import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";

// Import the smart contract artifacts
// import GLUSDArtifact from "../artifacts/contracts/GLUSD.sol/GLUSD.json";

let recipient: Signer; // Define recipient

// Define Mocha's BDD-style hooks (before, beforeEach, after, afterEach)
describe("GLUSD Contract", function () {
  let GLUSD: ContractFactory;
  let glusd: Contract;
  let admin: Signer;
  let minter: Signer;
  let account1: Signer;
  let account2: Signer;

  beforeEach(async function () {
    [admin, minter, account1, account2] = await ethers.getSigners();
    GLUSD = await ethers.getContractFactory("GLUSD");
    glusd = await GLUSD.connect(admin).deploy(
      await minter.getAddress(),
      await admin.getAddress(),
      ethers.constants.AddressZero
    );
    await glusd.deployed();
  });
  
  it("Should have correct initial values", async function () {
    // Test token name, symbol, and decimals
    expect(await glusd.name()).to.equal("Genesis League Governance");
    expect(await glusd.symbol()).to.equal("GLUSD");
    expect(await glusd.decimals()).to.equal(18);
  
    // Test total supply
    expect(await glusd.totalSupply()).to.equal(0);
  
    // Test admin and minter addresses
    expect(await glusd.admin()).to.equal(await admin.getAddress());
    expect(await glusd.minter()).to.equal(await minter.getAddress());
  
    // Test stake modifier contract address
    expect(await glusd.stakeModifier()).to.equal(ethers.constants.AddressZero);
  });  

  it("Should allow token transfers", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(minter).mint(await account1.getAddress(), amountToMint);

    // Transfer tokens from account1 to account2
    const amountToTransfer = ethers.utils.parseEther("100");
    await glusd
      .connect(account1)
      .transfer(await account2.getAddress(), amountToTransfer);

    // Check account balances after transfer
    const balanceAccount1 = await glusd.balanceOf(await account1.getAddress());
    const balanceAccount2 = await glusd.balanceOf(await account2.getAddress());

    expect(balanceAccount1).to.equal(amountToMint.sub(amountToTransfer));
    expect(balanceAccount2).to.equal(amountToTransfer);
  });

  it("Should allow token transfers with approved allowances", async function () {
    // Mint some tokens to account1 and account2
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(minter).mint(await account1.getAddress(), amountToMint);
    await glusd.connect(minter).mint(await account2.getAddress(), amountToMint);

    // Approve account2 to spend tokens on behalf of account1
    const approvedAmount = ethers.utils.parseEther("500");
    await glusd
      .connect(account1)
      .approve(await account2.getAddress(), approvedAmount);

    // Transfer tokens from account1 to account2 using the allowance
    const amountToTransfer = ethers.utils.parseEther("300");
    await glusd
      .connect(account2)
      .transferFrom(
        await account1.getAddress(),
        await account2.getAddress(),
        amountToTransfer
      );

    // Check account balances after transfer
    const balanceAccount1 = await glusd.balanceOf(await account1.getAddress());
    const balanceAccount2 = await glusd.balanceOf(await account2.getAddress());

    expect(balanceAccount1).to.equal(amountToMint.sub(amountToTransfer));
    expect(balanceAccount2).to.equal(amountToTransfer);
  });

  it("Should not allow token transfers if sender does not have enough balance", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("100");
    await glusd.connect(minter).mint(await account1.getAddress(), amountToMint);
  
    // Attempt to transfer more tokens than the balance of account1
    const amountToTransfer = ethers.utils.parseEther("200");
  
    // Use try...catch to check for revert with a specific error message
    try {
      await glusd
        .connect(account1)
        .transfer(await account2.getAddress(), amountToTransfer);
      // If the transaction doesn't revert, the test should fail
      expect.fail("Transaction did not revert as expected.");
    } catch (error: any) {
      // Check if the error message matches the expected one
      expect(error.message).to.include("GLUSD::_transferTokens: transfer amount exceeds balance");
    }
  });

  it("Should emit Transfer event on token transfers", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(minter).mint(await account1.getAddress(), amountToMint);
  
    // Transfer tokens from account1 to account2
    const amountToTransfer = ethers.utils.parseEther("100");
    const tx = await glusd
      .connect(account1)
      .transfer(await account2.getAddress(), amountToTransfer);
  
    // Wait for the transaction to be mined and get the receipt
    const receipt = await tx.wait();
  
    // Check if the Transfer event is emitted in the receipt
    let transferEventFound = false;
    for (const log of receipt.logs) {
      try {
        const parsedLog = glusd.interface.parseLog(log);
        if (parsedLog.name === "Transfer") {
          // Check the event arguments
          expect(parsedLog.args.from).to.equal(await account1.getAddress());
          expect(parsedLog.args.to).to.equal(await account2.getAddress());
          expect(parsedLog.args.value).to.equal(amountToTransfer);
  
          transferEventFound = true;
          break;
        }
      } catch (error) {
        // Ignore errors if the event cannot be parsed with the contract's interface
      }
    }
  
    // Ensure that the Transfer event was found in the receipt
    expect(transferEventFound, "Transfer event not emitted").to.be.true;
  });
  
  it("Should approve tokens for delegated transfers", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(minter).mint(await account1.getAddress(), amountToMint);

    // Approve account2 to spend tokens on behalf of account1
    const amountToApprove = ethers.utils.parseEther("500");
    await glusd
      .connect(account1)
      .approve(await account2.getAddress(), amountToApprove);

    // Check if the allowance is updated correctly
    const allowance = await glusd.allowance(
      await account1.getAddress(),
      await account2.getAddress()
    );
    expect(allowance).to.equal(amountToApprove);
  });

  it("Should emit Approval event on token approvals", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(minter).mint(await account1.getAddress(), amountToMint);

    // Approve account2 to spend tokens on behalf of account1
    const amountToApprove = ethers.utils.parseEther("500");
    const approvalTx = await glusd
      .connect(account1)
      .approve(await account2.getAddress(), amountToApprove);

    // Get the emitted event from the transaction
    const receipt = await approvalTx.wait();
    const approvalEvent = receipt.events?.find(
      (event: { event: string; }) => event.event === "Approval"
    );

    // Assert that the Approval event was emitted
    expect(approvalEvent).to.not.be.undefined;

    // Extract the event parameters and check their values
    const ownerAddress = await account1.getAddress();
    const spenderAddress = await account2.getAddress();
    const allowance = approvalEvent?.args?.amount;

    expect(approvalEvent?.args?.owner).to.equal(ownerAddress);
    expect(approvalEvent?.args?.spender).to.equal(spenderAddress);
    expect(allowance).to.equal(amountToApprove);
  });

  it("Should return the correct allowance", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(minter).mint(await account1.getAddress(), amountToMint);

    // Approve account2 to spend tokens on behalf of account1
    const amountToApprove = ethers.utils.parseEther("500");
    await glusd
      .connect(account1)
      .approve(await account2.getAddress(), amountToApprove);

    // Get the allowance value for account1 and account2
    const allowanceAccount1 = await glusd.allowance(
      await account1.getAddress(),
      await account2.getAddress()
    );
    const allowanceAccount2 = await glusd.allowance(
      await account1.getAddress(),
      await account2.getAddress()
    );

    // Assert that the allowance values are correct
    expect(allowanceAccount1).to.equal(amountToApprove);
    expect(allowanceAccount2).to.equal(0);
  });

  it("Should delegate votes to a delegatee", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(admin).mint(await account1.getAddress(), amountToMint);

    // Account1 delegates votes to account2
    await glusd.connect(account1).delegate(await account2.getAddress());

    // Check the delegatee of account1
    const delegateeOfAccount1 = await glusd.delegates(
      await account1.getAddress()
    );

    // Assert that account1's votes are delegated to account2
    expect(delegateeOfAccount1).to.equal(await account2.getAddress());
  });

  it("Should delegate votes by signature", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(admin).mint(await account1.getAddress(), amountToMint);

    // Prepare the delegation message
    const delegatee = await account2.getAddress();
    const nonce = await glusd.nonces(await account1.getAddress());
    const expiry = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

    // Create the EIP-712 domain separator
    const DOMAIN_TYPEHASH = await glusd.DOMAIN_TYPEHASH();
    const domainSeparator = await glusd.DOMAIN_SEPARATOR();

    // Create the EIP-712 delegation struct hash
    const DELEGATION_TYPEHASH = await glusd.DELEGATION_TYPEHASH();
    const structHash = ethers.utils.solidityKeccak256(
      ["bytes32", "address", "uint256", "uint256", "uint256"],
      [
        DELEGATION_TYPEHASH,
        delegatee,
        nonce,
        expiry,
        await ethers.provider.getNetwork().then((network) => network.chainId),
      ]
    );

    // Create the EIP-712 digest
    const digest = ethers.utils.solidityKeccak256(
      ["bytes2", "bytes32", "bytes32"],
      ["0x19", "0x01", domainSeparator, structHash]
    );

    // Sign the message
    const signature = await account1.signMessage(ethers.utils.arrayify(digest));

    // Parse the signature
    const { v, r, s } = ethers.utils.splitSignature(signature);

    // Delegate votes by signature
    await glusd
      .connect(account1)
      .delegateBySig(delegatee, nonce, expiry, v, r, s);

    // Check the delegatee of account1
    const delegateeOfAccount1 = await glusd.delegates(
      await account1.getAddress()
    );

    // Assert that account1's votes are delegated to account2
    expect(delegateeOfAccount1).to.equal(delegatee);
  });

  it("Should get the current votes balance for an account", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(admin).mint(await account1.getAddress(), amountToMint);

    // Get the current votes balance of account1
    const currentVotes = await glusd.getCurrentVotes(await account1.getAddress());

    // Verify that the current votes balance matches the minted amount after applying the stake modifier
    expect(currentVotes).to.equal(amountToMint);
  });

  it("Should determine the prior number of votes for an account", async function () {
    // Mint some tokens to account1
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(admin).mint(await account1.getAddress(), amountToMint);
  
    // Delegate votes from account1 to account2
    await glusd.connect(account1).delegate(await account2.getAddress());
  
    // Perform some token transfers to update the votes
    await glusd
      .connect(account1)
      .transfer(await account2.getAddress(), ethers.utils.parseEther("500"));
    await glusd
      .connect(account2)
      .transfer(await account1.getAddress(), ethers.utils.parseEther("200"));
  
    // Determine the prior votes for account1 at a specific block number
    const blockNumber = await ethers.provider.getBlockNumber();
    const priorVotes = await glusd.getPriorVotes(
      await account1.getAddress(),
      blockNumber - 1
    );
  
    // Calculate the expected prior votes by converting BigNumber to number
    const expectedVotes =
      amountToMint
        .sub(ethers.utils.parseEther("500"))
        .add(ethers.utils.parseEther("200"))
        .toNumber();
  
    // Verify that the returned prior votes match the expected votes
    expect(priorVotes).to.equal(expectedVotes);
  });
  
  it("Should mint new tokens by the minter", async function () {
    // Get the minter's address from the contract deployment
    const minterAddress = await minter.getAddress();

    // Mint some tokens to the recipient using the minter's address
    const amountToMint = ethers.utils.parseEther("1000");
    await glusd.connect(minter).mint(await recipient.getAddress(), amountToMint);

    // Verify that the recipient's balance is updated correctly
    const recipientBalance = await glusd.balanceOf(await recipient.getAddress());
    expect(recipientBalance).to.equal(amountToMint);
  });

  it("Should not allow token minting by non-minter", async function () {
    // Get the non-minter's address from the contract deployment
    const nonMinterAddress = await account2.getAddress();
  
    // Try to mint some tokens using the non-minter's address
    const amountToMint = ethers.utils.parseEther("1000");
    try {
      await glusd.connect(account2).mint(await recipient.getAddress(), amountToMint);
  
      // If the minting succeeds, the test should fail
      expect.fail("Expected the transaction to revert, but it did not revert.");
    } catch (error: any) {
      // Check that the error message matches the expected error message
      expect(error.message).to.include("Only minter");
  
      // Verify that the recipient's balance remains unchanged
      const recipientBalance = await glusd.balanceOf(await recipient.getAddress());
      expect(recipientBalance).to.equal(0);
    }
  });  

  it("Should bridge transfer tokens to another chain", async function () {
    // Test bridge transfer functionality
    // ... (implement the test for bridgeTransfer)
  });

  it("Should bridge transfer tokens from another chain", async function () {
    // Test bridge transfer from functionality
    // ... (implement the test for bridgeTransferFrom)
  });

  it("Should update admin address", async function () {
    // Test admin address update
    const newAdminAddress = await account2.getAddress();
  
    // Set the new admin address
    await glusd.connect(admin).setAdmin(newAdminAddress);
  
    // Verify that the admin address is updated correctly
    const currentAdminAddress = await glusd.admin();
    expect(currentAdminAddress).to.equal(newAdminAddress);
  });
  
  it("Should update minter address", async function () {
    // Test minter address update
    const newMinterAddress = await account2.getAddress();
  
    // Set the new minter address
    await glusd.connect(admin).setMinter(newMinterAddress);
  
    // Verify that the minter address is updated correctly
    const currentMinterAddress = await glusd.minter();
    expect(currentMinterAddress).to.equal(newMinterAddress);
  });
  
  it("Should update stake modifier address", async function () {
    // Test stake modifier address update
    const newStakeModifierAddress = await account2.getAddress();
  
    // Set the new stake modifier address
    await glusd.connect(admin).setStakeModifier(newStakeModifierAddress);
  
    // Verify that the stake modifier address is updated correctly
    const currentStakeModifierAddress = await glusd.stakeModifier();
    expect(currentStakeModifierAddress).to.equal(newStakeModifierAddress);
  });
  
});
