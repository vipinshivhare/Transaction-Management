import React, { useState, useEffect } from "react";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../Components/EditTransaction.css";

const EditTransaction = ({ transaction, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    type: "Income",
  });

  const [allTransactions, setAllTransactions] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        ...transaction,
        date: transaction.date.seconds
          ? new Date(transaction.date.seconds * 1000).toISOString().split("T")[0]
          : transaction.date,
      });
    }
  }, [transaction]);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsRef = collection(db, "transactions");
        const querySnapshot = await getDocs(transactionsRef);
        const transactions = [];

        querySnapshot.forEach((doc) => {
          if (doc.id !== transaction.id) {
            transactions.push({ id: doc.id, ...doc.data() });
          }
        });

        setAllTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [transaction]);

  useEffect(() => {
    const checkDuplicate = () => {
      if (
        !formData.description ||
        !formData.amount ||
        !formData.date ||
        !formData.type
      ) {
        setIsDuplicate(false);
        return;
      }

      const duplicate = allTransactions.some(
        (t) =>
          t.description === formData.description &&
          t.amount === parseFloat(formData.amount) &&
          new Date(t.date).toISOString().split("T")[0] === formData.date &&
          t.type === formData.type
      );

      setIsDuplicate(duplicate);
    };

    checkDuplicate();
  }, [formData, allTransactions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.date || !formData.type) {
      alert("All fields are required.");
      return;
    }

    if (isDuplicate) {
      alert("This data already exists.");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date),
      };

      const transactionRef = doc(db, "transactions", transaction.id);
      await updateDoc(transactionRef, updatedData);

      onUpdate({ ...transaction, ...updatedData });
      onClose();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-transaction-form">
      <label>
        Description
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </label>
      <label>
        Amount
        <input
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
          required
        />
      </label>
      <label>
        Date
        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
          required
        />
      </label>
      <label>
        Type
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value })
          }
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </label>
      {isDuplicate && (
        <p className="error-message">This transaction already exists.</p>
      )}
      <div className="buttons">
        <button type="submit" disabled={isDuplicate}>
          Save Changes
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTransaction;
