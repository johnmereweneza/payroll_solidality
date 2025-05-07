const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimplePayroll", function () {
  let Payroll, payroll;
  let owner, employee1, employee2;

  beforeEach(async function () {
    [owner, employee1, employee2] = await ethers.getSigners();
    Payroll = await ethers.getContractFactory("SimplePayroll");
    payroll = await Payroll.deploy();
    await payroll.waitForDeployment();
  });

  it("should set the deployer as the owner", async function () {
    expect(await payroll.owner()).to.equal(owner.address);
  });

  it("should allow the owner to deposit funds", async function () {
    const depositAmount = ethers.parseEther("1");
    await expect(owner.sendTransaction({ to: payroll.target, value: depositAmount }))
      .to.changeEtherBalance(payroll, depositAmount);
  });

  it("should allow owner to add employees", async function () {
    await payroll.addEmployee(employee1.address, "Alice", 1, 8);
    const names = await payroll.employeeList();
    expect(names).to.include("Alice");
  });

  it("should not allow non-owner to add employees", async function () {
    await expect(
      payroll.connect(employee1).addEmployee(employee1.address, "Alice", 1, 8)
    ).to.be.revertedWith("Only owner can perform this action");
  });

  it("should allow employee to claim salary", async function () {
    await payroll.addEmployee(employee1.address, "Alice", 1, 8);
    await payroll.connect(employee1).claimSalary();

    const pending = await payroll.pendingClaims();
    expect(pending).to.include(employee1.address);
  });

  it("should allow owner to approve claim and transfer funds", async function () {
    await payroll.addEmployee(employee1.address, "Alice", 1, 8);
    await owner.sendTransaction({ to: payroll.target, value: ethers.parseEther("1") });

    await payroll.connect(employee1).claimSalary();

    const claimAmount = 1 * 8;
    await expect(() =>
      payroll.approveClaim(employee1.address)
    ).to.changeEtherBalance(employee1, claimAmount);
  });

  it("should reject claim approval if no pending claim", async function () {
    await expect(
      payroll.approveClaim(employee1.address)
    ).to.be.revertedWith("No pending claim");
  });
});
