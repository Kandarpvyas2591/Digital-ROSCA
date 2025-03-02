import { useState } from 'react';
import transactions from './dummyData';

function TransactionHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Get transactions for the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-semibold">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Avatar</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <button className="px-4 py-1 text-white bg-purple-500 rounded-lg">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`rounded-lg border px-3 py-1 ${
            currentPage === 1 ? 'cursor-not-allowed bg-gray-300' : 'bg-white'
          }`}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`rounded-lg border px-3 py-1 ${
              currentPage === index + 1
                ? 'bg-purple-500 text-white'
                : 'bg-white'
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`rounded-lg border px-3 py-1 ${
            currentPage === totalPages
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-white'
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionHistory;
