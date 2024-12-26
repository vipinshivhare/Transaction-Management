import React, { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import AddTransactionForm from "./Components/AddTransactionForm";
import TransactionList from "./Components/TransactionList";
import EditTransaction from "./Components/EditTransaction";
import "./App.css";
import Navbar from "./Components/Navbar";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [message, setMessage] = useState(""); // State for showing messages

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "transactions"), (snapshot) => {
      const transactionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(transactionsData);
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async (newTransaction) => {
    try {
      const isDuplicate = transactions.some((transaction) => {
        const transactionDate = transaction.date ? new Date(transaction.date) : null;
        const newTransactionDate = newTransaction.date ? new Date(newTransaction.date) : null;

        return (
          transaction.description === newTransaction.description &&
          transaction.amount === newTransaction.amount &&
          transactionDate &&
          newTransactionDate &&
          transactionDate.toISOString() === newTransactionDate.toISOString() &&
          transaction.type === newTransaction.type
        );
      });

      if (isDuplicate) {
        setMessage("This transaction already exists!");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      await addDoc(collection(db, "transactions"), {
        ...newTransaction,
        date: newTransaction.date.toISOString(), // Ensure date is stored as ISO string
      });

      setMessage("Transaction added successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleUpdate = async (id, updatedTransaction) => {
    try {
      const transactionRef = doc(db, "transactions", id);
      await updateDoc(transactionRef, updatedTransaction);
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <Navbar transactions={transactions} />
      <h1>Transaction Management</h1>

      {/* Display message */}
      {message && <p className="message">{message}</p>}

      <AddTransactionForm onAdd={handleAdd} />
      <TransactionList
        transactions={transactions}
        onEdit={(transaction) => setEditingTransaction(transaction)}
        onDelete={handleDelete}
      />
      {editingTransaction && (
        <EditTransaction
          transaction={editingTransaction}
          onUpdate={handleUpdate}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
};

export default App;
