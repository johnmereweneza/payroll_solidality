TOPIC : Payroll Management System DApp
_________________________________________


A decentralized payroll application (DApp) that allows employers to add employees, manage salary claims, and disburse payments using Ethereum smart contracts. Built with Solidity, React, Ethers.js, and MetaMask.



Table of Contents
_________________

1. Overview
2. Features
3. Technologies Used
4. Getting Started : 
  A. Prerequisites
  B. Installation
  C. Deployment
  D. Running the Frontend

5. Smart Contract :
  A. Contract Structure
  B. Key Functions

6. Frontend Functionality](#frontend-functionality)
7. Screenshots
8. License


1. Overview
____________

This DApp provides a simple way to manage payrolls on the Ethereum blockchain. It allows the employer to:
A. Add employees
B. Deposit ETH into the contract
C. Approve employee salary claims
D. Monitor pending claims and employee records

Employees can:
A.  Claim their salary based on daily pay and hours
B. Check their current balances



2. Features
_____________

A. Role-based access: Owner vs Employee
B. Smart contract interaction via MetaMask
C. Salary claim and approval system
D. Real-time Ethereum balance checking
E. Full-stack implementation with React and Ethers.js
F. Bootstrap UI for clean layout


3. Technologies Used
________________________

- Solidity : for smart contract
- Hardhat : for local development
- React with : Bootstrap** for frontend
- Ethers.js : for Ethereum interaction
- MetaMask : for wallet connection


4. Getting Started
____________________

A. Prerequisites : 

- Node.js: https://nodejs.org/
- Hardhat: https://hardhat.org/
- MetaMask :https://metamask.io/

B. Installation

bash : 
git clone https://github.com/your-repo/payroll-dapp.git
cd payroll-dapp
npm install
🛠 Deployment
Compile and deploy the contract locally using Hardhat:

bash
Copy
Edit
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
Update the getPayrollContract function to connect to the deployed contract address.

Running the Frontend
In a new terminal:

bash
Copy
Edit
cd client
npm install
npm start
Then open: http://localhost:3000

 5. Smart Contract
 _____________________

 Contract Structure
File: contracts/Payroll.sol

solidity
Copy
Edit
struct Employee {
    address payable wallet;
    string name;
    uint256 dailyPay;
    uint256 hoursPerDay;
    bool isActive;
}

struct PendingClaim {
    uint256 amount;
    bool exists;
}
 Key Functions 
Function	Access	Description
addEmployee()	onlyOwner	Adds a new employee
claimSalary()	onlyEmployee	Employees claim salary
approveClaim()	onlyOwner	Approves and transfers salary
employeeList()	onlyOwner	Lists employee names
pendingClaims()	onlyOwner	Shows pending claims
deposit()	onlyOwner	Deposits ETH to the contract
getEmployee()	public	Returns details of an employee

6. Frontend Functionality :
_____________________________

Employer Interface :

A. Add employees by wallet address and name

B. Deposit Ether to the contract

C. Approve pending claims

D. View list of employee names

E. View pending claim addresses

Employee Interface :
_______________________

A. Claim salary based on configured pay and hours
B. Check ETH balance via contract method
 

