import { useState } from 'react';

const dummyLoanData = {
  id: 1,
  type: 'offered',
  offeredBy: 'User A',
  amount: 5000,
  interestRate: 5,
  duration: 12,
};

export default function LoanAgreement() {
  const [loanDetails, setLoanDetails] = useState(dummyLoanData);
  const [idProof, setIdProof] = useState(null);
  const [incomeProof, setIncomeProof] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    alert('Loan agreement submitted successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-10 shadow-2xl rounded-2xl w-full max-w-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-purple-800 text-center mb-6">Loan Agreement</h1>
        <div className="bg-white p-6 rounded-lg mb-6">
          <p className="text-purple-800 text-lg font-semibold mb-2">Loan Type: {loanDetails.type.charAt(0).toUpperCase() + loanDetails.type.slice(1)}</p>
          <p className="text-gray-600 mb-2">Amount: <span className="font-semibold">${loanDetails.amount}</span></p>
          <p className="text-gray-700 mb-2">Duration: <span className="font-semibold">{loanDetails.duration} months</span></p>
          <p className="text-gray-700 mb-2">Interest Rate: <span className="font-semibold">{loanDetails.interestRate}%</span></p>
          {loanDetails.type === 'offered' && <p className="text-gray-700 mb-2">Offered By: <span className="font-semibold">{loanDetails.offeredBy}</span></p>}
        </div>

        {loanDetails.type === 'offered' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Upload ID Proof</label>
              <input type="file" onChange={(e) => handleFileChange(e, setIdProof)} className="mt-1 block w-full border border-gray-300 p-2 rounded-lg" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Upload Income Proof</label>
              <input type="file" onChange={(e) => handleFileChange(e, setIncomeProof)} className="mt-1 block w-full border border-gray-300 p-2 rounded-lg" />
            </div>
            <button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300">Submit</button>
          </>
        )}
      </div>
    </div>
  );
}


// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function LoanAgreement() {
//   const router = useRouter();
//   const { loan } = router.query;
//   const [loanDetails, setLoanDetails] = useState(null);
//   const [idProof, setIdProof] = useState(null);
//   const [incomeProof, setIncomeProof] = useState(null);

//   useEffect(() => {
//     if (loan) {
//       setLoanDetails(JSON.parse(loan));
//     }
//   }, [loan]);

//   const handleFileChange = (e, setFile) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = () => {
//     alert('Loan agreement submitted successfully!');
//     router.push('/');
//   };

//   if (!loanDetails) {
//     return <div className="text-center text-xl mt-10">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">
//       <div className="bg-white p-10 shadow-2xl rounded-2xl w-full max-w-2xl transform transition duration-500 hover:scale-105">
//         <h1 className="text-4xl font-extrabold text-purple-800 text-center mb-6">Loan Agreement</h1>
//         <div className="bg-white p-6 rounded-lg mb-6">
//           <p className="text-purple-800 text-lg font-semibold mb-2">Loan Type: {loanDetails.type.charAt(0).toUpperCase() + loanDetails.type.slice(1)}</p>
//           <p className="text-gray-600 mb-2">Amount: <span className="font-semibold">${loanDetails.amount}</span></p>
//           <p className="text-gray-700 mb-2">Duration: <span className="font-semibold">{loanDetails.duration} months</span></p>
//           <p className="text-gray-700 mb-2">Interest Rate: <span className="font-semibold">{loanDetails.interestRate}%</span></p>
//           {loanDetails.type === 'offered' && <p className="text-gray-700 mb-2">Offered By: <span className="font-semibold">{loanDetails.offeredBy}</span></p>}
//           {loanDetails.type === 'requested' && <p className="text-gray-700 mb-2">Requested By: <span className="font-semibold">{loanDetails.offeredBy}</span></p>}
//           {loanDetails.type === 'requested' && <p className="text-gray-700">Reason: <span className="font-semibold">{loanDetails.reason}</span></p>}
//         </div>

//         {loanDetails.type === 'offered' && (
//           <>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Upload ID Proof</label>
//               <input type="file" onChange={(e) => handleFileChange(e, setIdProof)} className="mt-1 block w-full border border-gray-300 p-2 rounded-lg" />
//             </div>
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700">Upload Income Proof</label>
//               <input type="file" onChange={(e) => handleFileChange(e, setIncomeProof)} className="mt-1 block w-full border border-gray-300 p-2 rounded-lg" />
//             </div>
//             <button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300">Submit</button>
//           </>
//         )}

//         {loanDetails.type === 'requested' && (
//           <button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300">Accept</button>
//         )}
//       </div>
//     </div>
//   );
// }
