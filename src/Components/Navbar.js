import React from "react";
import "./Navbar.css";

const Navbar = ({ transactions = [] }) => {

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + (Number(transaction.amount) || 0), 0); 

  const totalProfit = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((sum, transaction) => sum + (Number(transaction.amount) || 0), 0); 

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>
          Transaction <span className="highlight">Tracker</span>
        </h2>
      </div>
      <div className="navbar-totals">
        <p className="expense">
          Total Expenses: <span>₹{totalExpenses.toFixed(2)}</span>
        </p>
        <p className="profit">
          Total Profit: <span>₹{totalProfit.toFixed(2)}</span>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
