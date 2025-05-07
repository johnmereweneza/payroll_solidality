const hre = require("hardhat");

async function main() {
  const Payroll = await hre.ethers.getContractFactory("Payroll");
  const payroll = await Payroll.deploy();

  await payroll.waitForDeployment();

  console.log("Payroll deployed to:", await payroll.getAddress());
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
