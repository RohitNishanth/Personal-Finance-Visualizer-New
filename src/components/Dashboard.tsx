interface Transaction {
    id: string;
    amount: number;
    description: string;
    category: string;
  }
  
  interface DashboardProps {
    transactions: Transaction[];
  }
  
  export default function Dashboard({ transactions }: DashboardProps) {
    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
    const recentTransactions = transactions.slice(0, 3);
  
    return (
      <div className="dashboard">
        <div className="card">
          <strong>Total Expenses</strong>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <strong>Recent Transactions</strong>
          <ul>
            {recentTransactions.map((t) => (
              <li key={t.id}>
                {t.description} - ${t.amount.toFixed(2)} ({t.category})
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }