import { useState } from 'react';

const dummyData = [
  {
    id: 1,
    type: 'offered',
    offeredBy: 'User A',
    amount: 5000,
    interestRate: 5,
    duration: 12,
  },
  {
    id: 2,
    type: 'requested',
    offeredBy: 'User B',
    amount: 3000,
    interestRate: 7,
    duration: 6,
    reason: 'Medical Emergency',
  },
  {
    id: 3,
    type: 'offered',
    offeredBy: 'ROSCA Group 1',
    amount: 10000,
    interestRate: 4,
    duration: 24,
  },
  {
    id: 4,
    type: 'requested',
    offeredBy: 'User C',
    amount: 2000,
    interestRate: 6,
    duration: 8,
    reason: 'Education Fees',
  },
  {
    id: 5,
    type: 'offered',
    offeredBy: 'User D',
    amount: 7000,
    interestRate: 5.5,
    duration: 18,
  }
];

const LoanPage = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-700 text-center">Loan Offers & Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyData.map((loan) => (
          <div key={loan.id} className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-purple-800">Amount: {loan.amount}</h2>
            <p className="text-gray-600">Interest Rate: {loan.interestRate}%</p>
            <p className="text-gray-600">Duration: {loan.duration} months</p>
            <p className="text-gray-600 font-semibold">Loan Type: {loan.type.charAt(0).toUpperCase() + loan.type.slice(1)}</p>
            <button onClick={() => setSelectedLoan(loan)} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full font-semibold">View Details</button>
          </div>
        ))}
      </div>

      {selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-purple-800">Loan Details</h2>
            <p className="text-gray-700"><strong>Amount:</strong> {selectedLoan.amount}</p>
            <p className="text-gray-700"><strong>Interest Rate:</strong> {selectedLoan.interestRate}%</p>
            <p className="text-gray-700"><strong>Duration:</strong> {selectedLoan.duration} months</p>
            <p className="text-gray-700"><strong>Loan Type:</strong> {selectedLoan.type.charAt(0).toUpperCase() + selectedLoan.type.slice(1)}</p>
            {selectedLoan.type === 'requested' && <p className="text-gray-700"><strong>Requested By:</strong> {selectedLoan.offeredBy}</p>}
            {selectedLoan.type === 'offered' && <p className="text-gray-700"><strong>Offered By:</strong> {selectedLoan.offeredBy}</p>}
            {selectedLoan.type === 'requested' && <p className="text-gray-700"><strong>Reason:</strong> {selectedLoan.reason}</p>}
            <div className="flex gap-4 mt-6">
              <button onClick={() => setSelectedLoan(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md w-full font-semibold">Close</button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full font-semibold">Accept</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanPage;
