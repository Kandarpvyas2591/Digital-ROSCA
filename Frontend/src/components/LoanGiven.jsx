/* eslint-disable react/prop-types */
function LoanGiven({ user }) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold">Loans Given</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {user?.loansGiven?.length > 0 ? (
          user.loansGiven.map((loan) => (
            <div
              key={loan._id}
              className="cursor-pointer rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105 hover:transform"
            >
              <h3 className="text-lg font-semibold">Amount: {loan.amount}</h3>
              <p>Interest Rate: {loan.interestRate}%</p>
              <p>Duration: {loan.duration} months</p>
            </div>
          ))
        ) : (
          <p>No loans given.</p>
        )}
      </div>
    </div>
  );
}

export default LoanGiven;
