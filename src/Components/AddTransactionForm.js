import React, { useState } from "react";
import "../Components/AddTransactionForm.css";

const AddTransactionForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    type: "Income",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date
    const parsedDate = new Date(formData.date);
    if (isNaN(parsedDate.getTime())) {
      setError("Invalid date. Please enter a valid date.");
      return;
    }

    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: parsedDate,
    };

    try {
      await onAdd(newTransaction);
      setFormData({ amount: "", description: "", date: "", type: "Income" }); // Clear form
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error adding transaction: ", error);
      setError("Failed to add the transaction. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <input
        type="text"
        placeholder="Enter Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Enter Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      >
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
