import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "../contract";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);

      const employeeCount = await contract.getEmployeeCount();
      const employeeList = [];

      for (let i = 0; i < employeeCount; i++) {
        const employee = await contract.employees(i);
        employeeList.push(employee);
      }

      setEmployees(employeeList);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            <span>Address: {employee.address}</span> -{" "}
            <span>Salary: {ethers.utils.formatEther(employee.salary)} ETH</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
