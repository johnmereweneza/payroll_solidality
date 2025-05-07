import { ethers, parseEther, isAddress, formatEther } from 'ethers';
import React, { useEffect, useState } from "react";
import { getPayrollContract } from "./contract";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [pendingClaims, setPendingClaims] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    address: "",
    name: "",
    dailyPay: "",
    hoursPerDay: ""
  });

  const [depositAmount, setDepositAmount] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");

  const handleDeposit = async () => {
    if (!depositAmount || isNaN(depositAmount)) {
      alert("Please enter a valid amount in Ether.");
      return;
    }

    try {
      const tx = await contract.deposit({ value: parseEther(depositAmount) });
      await tx.wait();
      alert("Deposit successful!");
    } catch (err) {
      console.error("Error during deposit:", err);
      alert("Deposit failed. Please try again.");
    }
  };

  useEffect(() => {
    const init = async () => {
      const contractInstance = await getPayrollContract();
      setContract(contractInstance);

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    };
    init();
  }, []);

  const fetchEmployees = async () => {
    const names = await contract.employeeList();
    setEmployeeList(names);
  };

  const fetchPendingClaims = async () => {
    const claims = await contract.pendingClaims();
    setPendingClaims(claims);
  };

  const handleAddEmployee = async () => {
    const tx = await contract.addEmployee(
      newEmployee.address,
      newEmployee.name,
      newEmployee.dailyPay,
      newEmployee.hoursPerDay,
    );
    await tx.wait();
    alert("Employee added!");
    fetchEmployees();
  };

  const handleClaimSalary = async () => {
    const tx = await contract.claimSalary();
    await tx.wait();
    alert("Salary claimed!");
  };

  const handleApproveClaim = async (empAddress) => {
    const tx = await contract.approveClaim(empAddress);
    await tx.wait();
    alert(`Approved salary for "${empAddress}"`);
    fetchPendingClaims();
  };

  const checkEmployeeBalance = async (employeeAddress) => {
    if (!isAddress(employeeAddress)) {
      alert("Invalid Ethereum address");
      return;
    }

    try {
      const balance = await contract.getBalance(employeeAddress);
      alert(`Balance for ${employeeAddress}: ${formatEther(balance)} ETH`);
    } catch (err) {
      console.error("Error fetching balance:", err);
      alert("Failed to fetch balance. Please try again.");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Payroll Management System DApp</h1>
      <div className="mb-3"><strong>Connected as:</strong> {account}</div>

      <div className="card mb-4">
        <div className="card-header">Add Employee</div>
        <div className="card-body">
          <input className="form-control mb-2" placeholder="Address" onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })} />
          <input className="form-control mb-2" placeholder="Name" onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
          <input className="form-control mb-2" placeholder="Daily Pay" onChange={(e) => setNewEmployee({ ...newEmployee, dailyPay: e.target.value })} />
          <input className="form-control mb-3" placeholder="Hours Per Day" onChange={(e) => setNewEmployee({ ...newEmployee, hoursPerDay: e.target.value })} />
          <button className="btn btn-primary" onClick={handleAddEmployee}>Add Employee</button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          Employees List
          <button className="btn btn-sm btn-secondary" onClick={fetchEmployees}>Load Employees</button>
        </div>
        <ul className="list-group list-group-flush">
          {employeeList.map((name, idx) => (
            <li className="list-group-item" key={idx}>{name}</li>
          ))}
        </ul>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          Pending Claims
          <button className="btn btn-sm btn-secondary" onClick={fetchPendingClaims}>Load Claims</button>
        </div>
        <ul className="list-group list-group-flush">
          {pendingClaims.map((addr, idx) => (
            <li className="list-group-item d-flex justify-content-between" key={idx}>
              <span>{addr}</span>
              <button className="btn btn-sm btn-success" onClick={() => handleApproveClaim(addr)}>Approve</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card mb-4">
        <div className="card-header">Employee Actions</div>
        <div className="card-body">
          <button className="btn btn-warning" onClick={handleClaimSalary}>Claim Salary</button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Deposit Funds</div>
        <div className="card-body">
          <input className="form-control mb-2" placeholder="Amount in Ether" onChange={(e) => setDepositAmount(e.target.value)} />
          <button className="btn btn-info" onClick={handleDeposit}>Deposit</button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Check Employee Balance</div>
        <div className="card-body">
          <input className="form-control mb-2" placeholder="Employee Address" onChange={(e) => setEmployeeAddress(e.target.value)} />
          <button className="btn btn-dark" onClick={() => checkEmployeeBalance(employeeAddress)}>Check Balance</button>
        </div>
      </div>
    </div>
  );
}

export default App;
