// Transaction service for handling API calls related to transactions

import axios from "axios";
import { API_URL } from "../constants";

// Define transaction interface according to API documentation
export interface Transaction {
  id?: number;
  date: string;
  description: string;
  credit: number | null;
  debit: number | null;
  runningBalance: number | null;
}

// API request interface based on API documentation
export interface TransactionRequest {
  description: string;
  amount: number;
  type: "credit" | "debit";
  date?: string;
}

export const saveTransaction = async (transactionData: Omit<Transaction, "id"> | TransactionRequest): Promise<Transaction> => {
  try {
    // Save transaction to database via API
    const { data } = await axios.post(`${API_URL}/transactions`, transactionData);
    return data.data;
  } catch (error) {
    console.error("Error saving transaction:", error);
    throw error;
  }
};

// Function to get all transactions
export const getTransactions = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/transactions`);
    return data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
