// import React, { useEffect, useState } from "react";
// import { getPayrollContract } from "./contract";

// function AddEmployee() {
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState("");
//   const [form, setForm] = useState({
//     address: "",
//     name: "",
//     dailyPay: "",
//     hoursPerDay: ""
//   });

//   useEffect(() => {
//     const init = async () => {
//       const instance = await getPayrollContract();
//       setContract(instance);

//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       setAccount(accounts[0]);
//     };
//     init();
//   }, []);

//   const handleAddEmployee = async () => {
//     try {
      
//       const tx = await contract.addEmployee(
//         form.address,
//         form.name,
//         Number(form.dailyPay),
//         Number(form.hoursPerDay)
//       );
//       await tx.wait();
//       alert("Employee added successfully!");
//     } catch (err) {
//       console.error("Error adding employee:", err);
//       alert("Failed to add employee. Check console.");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Add Employee</h2>
//       <input placeholder="Employee Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
//       <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
//       <input placeholder="Daily Pay" type="number" onChange={(e) => setForm({ ...form, dailyPay: e.target.value })} />
//       <input placeholder="Hours Per Day" type="number" onChange={(e) => setForm({ ...form, hoursPerDay: e.target.value })} />
//       <button onClick={handleAddEmployee}>Add Employee</button>
//     </div>
//   );
// }

// export default AddEmployee;



import React, { useState } from "react";
import { ethers } from "ethers";
import { getPayrollContract } from "../contract";  // Correct path

function AddEmployee() {
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [name, setName] = useState("");
  const [dailyPay, setDailyPay] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    if (!employeeAddress || !name || !dailyPay || !hoursPerDay) {
      alert("All fields are required");
      return;
    }

    try {
      const contract = await getPayrollContract();
      const tx = await contract.addEmployee(
        employeeAddress,
        name,
        ethers.utils.parseEther(dailyPay), // Ether to Wei
        Number(hoursPerDay)                // Plain integer
      );
      await tx.wait();
      alert("Employee added successfully!");
    } catch (err) {
      alert("Failed to add employee: " + err.message);
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleAddEmployee}>
        <input
          type="text"
          placeholder="Employee Address"
          value={employeeAddress}
          onChange={(e) => setEmployeeAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Daily Pay in Ether"
          value={dailyPay}
          onChange={(e) => setDailyPay(e.target.value)}
        />
        <input
          type="number"
          placeholder="Hours per Day"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
