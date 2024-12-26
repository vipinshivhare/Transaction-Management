import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import TransactionItem from "../Components/TransactionItem";
import "../Components/TransactionList.css";

const TransactionList = ({ onEdit, onDelete }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const transactionsCollection = collection(db, "transactions");

    // Real-time listener
    const unsubscribe = onSnapshot(transactionsCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
    });

   
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;

