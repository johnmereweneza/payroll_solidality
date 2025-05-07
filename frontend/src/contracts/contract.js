
import { ethers } from "ethers";
import abi from "./Payroll.json"; // ABI from compiled Payroll

export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed address

export const getPayrollContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};