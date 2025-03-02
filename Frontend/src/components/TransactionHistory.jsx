import { useEffect, useState } from 'react';
import { getMe, getUserTransactions } from '../services/apiROSCAgroup';
import Loader from './Loader';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const user = await getMe();
        console.log('Fetched user:', user);
        const transactionsData = await getUserTransactions(user._id);
        console.log('Fetched transactions:', transactionsData);
        setTransactions(transactionsData.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto mt-10 max-w-6xl rounded-lg bg-white p-6 shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg border border-gray-200 bg-white">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Avatar</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${tx.sender.name}`}
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">
                  {tx.receiver.username || tx.receiver.name}
                </td>
                <td className="px-4 py-2 font-semibold">{tx.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${
                      tx.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : tx.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="rounded bg-purple-500 px-3 py-1 text-white"
                    onClick={() => setSelectedTransaction(tx)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Window */}
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Transaction Details</h2>
            <p>
              <strong>Sender:</strong> {selectedTransaction.sender.username} (
              {selectedTransaction.sender.name ? 'Group' : 'User'})
            </p>
            <p>
              <strong>Receiver:</strong>
              {selectedTransaction.receiver.name ||
                selectedTransaction.receiver.username}
              ({selectedTransaction.sender.name ? 'Group' : 'User'})
            </p>
            <p>
              <strong>Amount:</strong> {selectedTransaction.amount}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`rounded px-2 py-1 text-xs font-semibold ${
                  selectedTransaction.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : selectedTransaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {selectedTransaction.status}
              </span>
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {new Date(selectedTransaction.date).toLocaleString()}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 rounded bg-gray-500 px-3 py-1 text-white"
                onClick={() => setSelectedTransaction(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
