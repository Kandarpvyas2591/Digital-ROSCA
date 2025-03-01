import { useState } from 'react';

const transactions = [
  {
    id: '001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    totalTransactions: 10,
    roscaGroup: 'Savings Circle A',
  },
  {
    id: '002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    totalTransactions: 15,
    roscaGroup: 'Investment Group B',
  },
  {
    id: '003',
    name: 'Michael Johnson',
    email: 'michael.johnson@email.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    totalTransactions: 8,
    roscaGroup: 'Emergency Fund C',
  },
];

function TransactionHistoryv2() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Transaction History</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">ID</th>
            <th className="border p-3">Avatar</th>
            <th className="border p-3 text-left">Customer</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((user) => (
            <tr key={user.id} className="border hover:bg-gray-50">
              <td className="border p-3">{user.id}</td>
              <td className="border p-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="mx-auto h-10 w-10 rounded-full"
                />
              </td>
              <td className="border p-3">{user.name}</td>
              <td className="border p-3">{user.email}</td>
              <td className="border p-3 text-center">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold">{selectedUser.name}</h2>
            <p className="text-gray-600">
              Total Transactions: {selectedUser.totalTransactions}
            </p>
            <p className="text-gray-600">
              ROSCA Group: {selectedUser.roscaGroup}
            </p>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionHistoryv2;
