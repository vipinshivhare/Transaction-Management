import React from "react";
import "./TransactionItem.css";

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const formatDate = (date) => {
    if (!date) return "Invalid Date";

    try {
      const parsedDate =
        date?.seconds
          ? new Date(date.seconds * 1000)
          : typeof date === "string"
          ? new Date(date)
          : date;

      if (parsedDate.getFullYear() < 1900 || parsedDate.getFullYear() > 2100) {
        return "Invalid Year";
      }

      return parsedDate.toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <li className="transaction-item">
      <div className="transaction-details">
        <h3 className={`transaction-description ${transaction.type.toLowerCase()}`}>
          {transaction.description}
        </h3>
        <p className="transaction-amount">₹{transaction.amount}</p>
        <p className="transaction-type">{transaction.type}</p>
        <p className="transaction-date">On {formatDate(transaction.date)}</p>
      </div>
      <div className="transaction-actions">
        <button className="edit-button" onClick={() => onEdit(transaction)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(transaction.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
