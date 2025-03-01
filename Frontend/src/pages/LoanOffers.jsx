import { useState, useEffect } from 'react';

const LoanPage = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/loan/getAllLoanOffer', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data);
        setLoans(data.data || data);
      })
      .catch((error) => console.error('Error fetching loan offers:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-purple-700">
        Loan Offers & Requests
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loans.length > 0 ? (
          loans.map((loan) => (
            <div
              key={loan._id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-purple-800">
                Amount: {loan.amount}
              </h2>
              <p className="text-gray-600">
                Interest Rate: {loan.interestRate}%
              </p>
              <p className="text-gray-600">Duration: {loan.duration} months</p>
              <p className="font-semibold text-gray-600">
                Loan Type:{' '}
                {loan.type?.charAt(0).toUpperCase() + loan.type?.slice(1)}
              </p>
              <button
                onClick={() => setSelectedLoan(loan)}
                className="mt-4 w-full rounded-md bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No loan offers available</p>
        )}
      </div>

      {selectedLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 rounded-lg bg-white p-8 shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold text-purple-800">
              Loan Details
            </h2>
            <p className="text-gray-700">
              <strong>Amount:</strong> {selectedLoan.amount}
            </p>
            <p className="text-gray-700">
              <strong>Interest Rate:</strong> {selectedLoan.interestRate}%
            </p>
            <p className="text-gray-700">
              <strong>Duration:</strong> {selectedLoan.duration} months
            </p>
            <p className="text-gray-700">
              <strong>Loan Type:</strong>{' '}
              {selectedLoan.type?.charAt(0).toUpperCase() +
                selectedLoan.type?.slice(1)}
            </p>
            {selectedLoan.type === 'request' && (
              <p className="text-gray-700">
                <strong>Requested By:</strong> {selectedLoan.offeredBy}
              </p>
            )}
            {selectedLoan.type === 'offer' && (
              <p className="text-gray-700">
                <strong>Offered By:</strong> {selectedLoan.offeredBy}
              </p>
            )}
            {selectedLoan.type === 'request' && (
              <p className="text-gray-700">
                <strong>Reason:</strong> {selectedLoan.reason}
              </p>
            )}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setSelectedLoan(null)}
                className="w-full rounded-md bg-gray-500 px-4 py-2 font-semibold text-white hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={() => {
                  localStorage.setItem(
                    'selectedLoan',
                    JSON.stringify(selectedLoan),
                  );
                  window.location.href = '/loan-agreement';
                }}
                className="w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanPage;
