import { useState } from "react";

interface BudgetFormProps {
  onAdd: (category: string, budget: number) => void;
}

export default function BudgetForm({ onAdd }: BudgetFormProps) {
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !budget) return;
    onAdd(category, parseFloat(budget));
    setCategory("");
    setBudget("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <button type="submit">Set Budget</button>
    </form>
  );
}