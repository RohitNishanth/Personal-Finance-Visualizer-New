interface Transaction {
    amount: number;
    category: string;
  }
  
  interface SpendingInsightsProps {
    transactions: Transaction[];
  }
  
  export default function SpendingInsights({ transactions }: SpendingInsightsProps) {
    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
    const highestCategory = Object.entries(
      transactions.reduce((acc: Record<string, number>, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0];
  
    return (
      <div className="insights">
        <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
        {highestCategory && (
          <p>
            <strong>Highest Spending Category:</strong> {highestCategory[0]} (${highestCategory[1].toFixed(2)})
          </p>
        )}
      </div>
    );
  }