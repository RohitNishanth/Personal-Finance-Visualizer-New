import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface Transaction {
  amount: number;
  date: string;
}

interface MonthlyExpensesChartProps {
  transactions: Transaction[];
}

export default function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const monthlyData = transactions.reduce((acc: Record<string, number>, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "long", year: "numeric" });
    acc[month] = (acc[month] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }));

  if (!data.length) return <p>No data to display.</p>;

  return (
    <div className="chart-container">
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#3498db" />
      </BarChart>
    </div>
  );
}