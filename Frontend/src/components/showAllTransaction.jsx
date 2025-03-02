import { useState, useEffect } from 'react';

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/v1/transaction/get-all-transactions',
          {
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        const data = await response.json();
        setTransactions(data.data || []);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, []);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-center text-2xl font-semibold">
        All Transactions
      </h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Type</th>
            <th className="border p-2">Sender ID</th>
            <th className="border p-2">Receiver ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction._id} className="border text-center">
              <td className="border p-2">{transaction.type}</td>
              <td className="border p-2">{transaction.sender}</td>
              <td className="border p-2">{transaction.receiver}</td>
              <td className="border p-2">₹{transaction.amount}</td>
              <td
                className={`border p-2 font-semibold ${
                  transaction.status === 'completed'
                    ? 'text-green-600'
                    : transaction.status === 'failed'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                }`}
              >
                {transaction.status}
              </td>
              <td className="border p-2">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center gap-2">
        <button
          className="rounded-md bg-gray-300 px-4 py-2 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`rounded-md px-4 py-2 ${
              currentPage === i + 1 ? 'bg-purple-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="rounded-md bg-gray-300 px-4 py-2 disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllTransactions;
