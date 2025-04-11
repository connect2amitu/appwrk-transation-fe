import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./Add.css";
import { saveTransaction } from "../services/transactionService";

/**
 Transaction type will be dropdown with one option can be selected at one time (Credit/Debit), Amount  & Description should be required field.  
 On Click of Save, it will create new transaction record in Database and redirect to Office Transactions  page 
 */
const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare transaction data according to API documentation
      const transactionData = {
        description,
        amount: parseFloat(amount),
        type: transactionType as "credit" | "debit",
        date: new Date().toISOString(), // Full ISO 8601 date format with time
      };

      // Save transaction to database via API
      await saveTransaction(transactionData);

      // Show success toast notification
      toast.success("Transaction saved successfully");

      // Redirect to transactions page
      navigate("/");
    } catch (error) {
      // Show error toast notification
      toast.error("Failed to save transaction. Please try again.");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="add-transaction-container">
      <div className="add-transaction-form">
        <div className="form-header">New Transaction Page</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="transactionType">Transaction Type</label>
            <select id="transactionType" value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" required value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-buttons">
            <button type="submit" className="save-btn" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
