const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const tx = await owner.sendTransaction({
    to: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    value: ethers.parseEther("10")
  });
  await tx.wait();
  console.log("Contract funded with 10 ETH");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
