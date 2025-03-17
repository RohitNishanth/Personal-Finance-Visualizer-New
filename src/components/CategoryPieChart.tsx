import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#3498db", "#2ecc71", "#f1c40f", "#e67e22", "#9b59b6"];

interface Transaction {
  amount: number;
  category: string;
}

interface CategoryPieChartProps {
  transactions: Transaction[];
}

export default function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  const categoryData = transactions.reduce((acc: Record<string, number>, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryData).map(([category, amount]) => ({ category, amount }));

  if (!data.length) return <p>No data to display.</p>;

  return (
    <div className="chart-container">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}