import { useState, useEffect } from "react";
import "./Transaction.css";
import { getTransactions, Transaction } from "../services/transactionService";

/**
 * Office Transactions Grid with 5 columns Date, Description, Credit, Debit & Running Balance.
 * Sorting is done to display latest transactions at the top.
 */

// Transaction interface is now imported from transactionService

const TransactionView = () => {
  // State for transactions and loading state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // Get transactions from API
        const fetchedTransactions = await getTransactions();
        console.info("fetchedTransactions =>", fetchedTransactions);

        // Sort transactions by date (latest first)
        const sortedTransactions = [...fetchedTransactions].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setTransactions(sortedTransactions);

        // Calculate running balances
        calculateRunningBalances(fetchedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Calculate running balances
  const calculateRunningBalances = (transactionsData: Transaction[]) => {
    const balances: number[] = [];
    let balance = 0;

    // We need to process in chronological order for running balance
    const chronologicalTransactions = [...transactionsData].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    chronologicalTransactions.forEach((transaction) => {
      if (transaction.credit) {
        balance += transaction.credit;
      }
      if (transaction.debit) {
        balance -= transaction.debit;
      }
      if (transaction.id !== undefined) {
        balances[transaction.id] = balance;
      }
    });
  };

  // Format currency
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="transaction-container">
      <div className="transaction-header">
        <h1>Office Transactions</h1>
        {!isLoading && transactions.length > 0 && (
          <button className="add-transaction-btn" onClick={() => (window.location.href = "/add")}>
            Add Transaction
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading transactions...</p>
        </div>
      ) : transactions.length > 0 ? (
        <div className="transaction-grid">
          <div className="grid-header">
            <div className="grid-cell">Date</div>
            <div className="grid-cell description">Description</div>
            <div className="grid-cell credit">Credit</div>
            <div className="grid-cell debit">Debit</div>
            <div className="grid-cell balance">Running Balance</div>
          </div>

          {transactions.map((transaction) => (
            <div key={transaction.id} className="grid-row">
              <div className="grid-cell">{formatDate(transaction.date)}</div>
              <div className="grid-cell description">{transaction.description}</div>
              <div className="grid-cell credit">{transaction.credit ? formatCurrency(transaction.credit) : "-"}</div>
              <div className="grid-cell debit">{transaction.debit ? formatCurrency(transaction.debit) : "-"}</div>
              <div className="grid-cell balance">{transaction.runningBalance ? formatCurrency(transaction.runningBalance) : "-"}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-transactions">
          <div className="no-transactions-content">
            <h2>No Transactions Found</h2>
            <p>There are no transactions to display. Get started by adding your first transaction.</p>
            <button className="add-first-transaction-btn" onClick={() => (window.location.href = "/add")}>
              Add Your First Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionView;
