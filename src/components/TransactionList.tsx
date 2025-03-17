interface Transaction {
    id: string;
    amount: number;
    date: string;
    description: string;
    category: string;
  }
  
  interface TransactionListProps {
    transactions: Transaction[];
    onDelete: (id: string) => void;
  }
  
  export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
    if (!transactions.length) return <p>No transactions yet.</p>;
  
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td>${t.amount.toFixed(2)}</td>
              <td>
                <button className="delete" onClick={() => onDelete(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }