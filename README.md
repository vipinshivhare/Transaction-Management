# Transaction Management App

This is a **Transaction Management App** built using React.js and Firebase. The app allows users to manage their financial transactions, including adding, editing, and deleting transactions. It supports real-time updates via Firebase Firestore and is hosted on Firebase Hosting.

## Features

- **Add Transactions**: Enter the transaction amount, description, date, and type (Income or Expense). Duplicate entries are not allowed.
- **Edit Transactions**: Modify existing transactions with an intuitive interface. Duplicate entries are not allowed during editing either; the system validates against existing records.
- **Delete Transactions**: Remove unwanted transactions.
- **Real-Time Updates**: Automatically syncs data across all devices using Firebase Firestore.
- **Responsive Design**: Fully responsive UI, accessible on all devices.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Firebase Firestore (NoSQL database)
- **Hosting**: Firebase Hosting

## Project Structure

```
src/
├── Components/
│   ├── AddTransactionForm.js    # Component for adding new transactions
│   ├── EditTransaction.js       # Component for editing transactions
│   ├── TransactionItem.js       # Component for displaying individual transactions
│   ├── TransactionList.js       # Component for listing all transactions
├── firebase.js                  # Firebase configuration file
├── App.js                       # Main application component
├── index.js                     # Entry point of the application
```

## Getting Started

Follow the steps below to set up and run the project locally:

### Prerequisites

- Node.js and npm installed on your system.
- A Firebase project set up with Firestore and Hosting enabled.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd transaction-management-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:

   - Replace the Firebase configuration in `src/firebase.js` with your own Firebase project settings.

4. Start the development server:

   ```bash
   npm start
   ```

   The app will run locally at `http://localhost:3000/`.

## Firebase Hosting Link

The app is hosted at the following link:
**[Transaction Management App Hosting](https://fir-crud-7ed98.firebaseapp.com/)**


## References

- **React.js Documentation**: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- **Firebase Documentation**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **JavaScript MDN**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


## Acknowledgments

- **React.js**: For the frontend framework.
- **Firebase**: For backend services including Firestore and Hosting.

---

