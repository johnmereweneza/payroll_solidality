// import { ethers } from 'ethers';
// import Payroll from './contracts/Payroll.json'; // Import the entire JSON as default

// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Deployed contract address

// export const getPayrollContract = async () => {
//   if (!window.ethereum) throw new Error("MetaMask not installed");

//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();
//   const contract = new ethers.Contract(contractAddress, Payroll.abi, signer); // Use Payroll.abi

//   return contract;
// };




import { ethers } from 'ethers';
import Payroll from './contracts/Payroll.json'; // Import the entire JSON as default

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Deployed contract address

export const getPayrollContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Payroll.abi, signer); // Use Payroll.abi

  return contract;
};