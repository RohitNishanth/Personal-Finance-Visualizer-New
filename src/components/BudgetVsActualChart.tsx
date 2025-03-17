import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface Transaction {
  amount: number;
  category: string;
  budget?: number;
}

interface BudgetVsActualChartProps {
  transactions: Transaction[];
}

export default function BudgetVsActualChart({ transactions }: BudgetVsActualChartProps) {
  const categoryData = transactions.reduce((acc: Record<string, { actual: number; budget: number }>, t) => {
    acc[t.category] = {
      actual: (acc[t.category]?.actual || 0) + t.amount,
      budget: t.budget || acc[t.category]?.budget || 0,
    };
    return acc;
  }, {});

  const data = Object.entries(categoryData).map(([category, { actual, budget }]) => ({
    category,
    actual,
    budget,
  }));

  if (!data.length) return <p>No data to display.</p>;

  return (
    <div className="chart-container">
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="actual" fill="#3498db" />
        <Bar dataKey="budget" fill="#2ecc71" />
      </BarChart>
    </div>
  );
}