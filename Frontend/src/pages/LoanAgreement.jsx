import { useState, useEffect } from 'react';

export default function LoanAgreement() {
  const [loanDetails, setLoanDetails] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [incomeProof, setIncomeProof] = useState(null);

  useEffect(() => {
    const storedLoan = localStorage.getItem('selectedLoan');
    if (storedLoan) {
      setLoanDetails(JSON.parse(storedLoan));
    }
  }, []);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (loanDetails.type === 'offer' && (!idProof || !incomeProof)) {
      alert('Please upload both ID Proof and Income Proof.');
      return;
    }
    alert('Loan agreement submitted successfully!');
    window.location.href = '/';
  };

  if (!loanDetails) {
    return <div className="mt-10 text-center text-xl">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-2xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-purple-800">
          Loan Agreement
        </h1>
        <div className="mb-6 rounded-lg bg-white p-6">
          <p className="mb-2 text-lg font-semibold text-purple-800">
            Loan Type:{' '}
            {loanDetails.type.charAt(0).toUpperCase() +
              loanDetails.type.slice(1)}
          </p>
          <p className="mb-2 text-gray-600">
            Amount: <span className="font-semibold">{loanDetails.amount}</span>
          </p>
          <p className="mb-2 text-gray-700">
            Duration:{' '}
            <span className="font-semibold">{loanDetails.duration} months</span>
          </p>
          <p className="mb-2 text-gray-700">
            Interest Rate:{' '}
            <span className="font-semibold">{loanDetails.interestRate}%</span>
          </p>
          {loanDetails.type === 'offer' && (
            <p className="mb-2 text-gray-700">
              Offered By:{' '}
              <span className="font-semibold">{loanDetails.offeredBy}</span>
            </p>
          )}
          {loanDetails.type === 'request' && (
            <p className="mb-2 text-gray-700">
              Requested By:{' '}
              <span className="font-semibold">{loanDetails.offeredBy}</span>
            </p>
          )}
          {loanDetails.type === 'request' && (
            <p className="text-gray-700">
              Reason:{' '}
              <span className="font-semibold">{loanDetails.reason}</span>
            </p>
          )}
        </div>

        {loanDetails.type === 'offer' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload ID Proof
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setIdProof)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Upload Income Proof
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setIncomeProof)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-purple-700"
            >
              Submit
            </button>
          </>
        )}

        {loanDetails.type === 'request' && (
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-purple-700"
          >
            Accept
          </button>
        )}
      </div>
    </div>
  );
}