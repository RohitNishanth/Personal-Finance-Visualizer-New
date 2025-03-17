import { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import MonthlyExpensesChart from "./components/MonthlyExpensesChart";
import CategoryPieChart from "./components/CategoryPieChart";
import Dashboard from "./components/Dashboard";
import BudgetForm from "./components/BudgetForm";
import BudgetVsActualChart from "./components/BudgetVsActualChart";
import SpendingInsights from "./components/SpendingInsights";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  budget?: number;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Uncategorized");

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date || !description) return;
    const newTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount: parseFloat(amount),
      date,
      description,
      category,
    };
    setTransactions((prev) => [...prev, newTransaction]);
    setAmount("");
    setDate("");
    setDescription("");
    setCategory("Uncategorized");
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleBudgetAdd = (category: string, budget: number) => {
    setTransactions((prev) =>
      prev.map((t) => (t.category === category && !t.budget ? { ...t, budget } : t))
    );
  };

  return (
    <div>
      <h1>Personal Finance Visualizer</h1>
      <form onSubmit={handleAdd}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Uncategorized">Uncategorized</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>
      <BudgetForm onAdd={handleBudgetAdd} />
      <h2>Dashboard</h2>
      <Dashboard transactions={transactions} />
      <h2>Transactions</h2>
      <TransactionList transactions={transactions} onDelete={handleDelete} />
      <h2>Monthly Expenses</h2>
      <MonthlyExpensesChart transactions={transactions} />
      <h2>Category Breakdown</h2>
      <CategoryPieChart transactions={transactions} />
      <h2>Budget vs Actual</h2>
      <BudgetVsActualChart transactions={transactions} />
      <h2>Spending Insights</h2>
      <SpendingInsights transactions={transactions} />
    </div>
  );
}

export default App;