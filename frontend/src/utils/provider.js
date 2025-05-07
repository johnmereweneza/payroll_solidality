import { BrowserProvider } from "ethers";

let provider;

if (window.ethereum) {
  provider = new BrowserProvider(window.ethereum);
  window.ethereum.request({ method: "eth_requestAccounts" });
} else {
  console.error("MetaMask not found!");
}

export default provider;
