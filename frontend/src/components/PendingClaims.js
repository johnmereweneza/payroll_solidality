import React, { useState, useEffect } from "react";
import { getPayrollContract } from "../contract";  // Correct path

function EmployeeList() {
  const [employeeNames, setEmployeeNames] = useState([]);

  const fetchEmployeeList = async () => {
    try {
      const contract = await getPayrollContract();
      const names = await contract.employeeList();
      setEmployeeNames(names);
    } catch (err) {
      alert("Failed to load employee list: " + err.message);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={fetchEmployeeList}>Load Employees</button>
      <ul>
        {employeeNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
