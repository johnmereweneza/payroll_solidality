// import React, { useState } from "react";
// import { ethers } from "ethers";
// import { contractAddress, abi } from "../contract";

// function ClaimSalary() {
//   const [employeeAddress, setEmployeeAddress] = useState("");

//   const claimSalary = async () => {
//     if (!ethers.utils.isAddress(employeeAddress)) {
//       alert("Invalid Ethereum address");
//       return;
//     }

//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const contract = new ethers.Contract(contractAddress, abi, signer);

//       const tx = await contract.claimSalary(employeeAddress);
//       await tx.wait();
//       alert("Salary claimed successfully!");
//     } catch (err) {
//       console.error("Error claiming salary:", err);
//     }
//   };

//   return (
//     <div>
//       <h2>Claim Salary</h2>
//       <input
//         type="text"
//         placeholder="Employee Ethereum Address"
//         value={employeeAddress}
//         onChange={(e) => setEmployeeAddress(e.target.value)}
//       />
//       <button onClick={claimSalary}>Claim Salary</button>
//     </div>
//   );
// }

// export default ClaimSalary;



import React from "react";
import { getPayrollContract } from "../contract";

function ClaimSalary() {
  const claimSalary = async () => {
    try {
      const contract = await getPayrollContract();
      const tx = await contract.claimSalary();
      await tx.wait();
      alert("Salary claimed successfully!");
    } catch (err) {
      console.error("Error claiming salary:", err);
    }
  };

  return (
    <div>
      <h2>Claim Salary</h2>
      <button onClick={claimSalary}>Claim Salary</button>
    </div>
  );
}

export default ClaimSalary;