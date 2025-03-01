/* eslint-disable react/prop-types */
const DashBoardSection = ({ user }) => {
  // If user is undefined or null, return loading state
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* Created Groups */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Groups Created</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user?.createdGroup?.length > 0 ? (
            user.createdGroup.map((group) => (
              <div
                key={group._id}
                className="rounded-lg bg-white p-4 shadow-md"
              >
                <h3 className="text-lg font-semibold">{group.name}</h3>
                <p>Contribution: ${group.contributionAmount}</p>
                <p>Duration: {group.cycleDuration} months</p>
                <p>Members: {group.members?.length || 0}</p>
              </div>
            ))
          ) : (
            <p>No groups created yet.</p>
          )}
        </div>
      </div>

      {/* Joined Groups */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Groups Joined</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user?.joinedGroups?.length > 0 ? (
            user.joinedGroups.map((group) => (
              <div
                key={group._id}
                className="rounded-lg bg-white p-4 shadow-md"
              >
                <h3 className="text-lg font-semibold">{group.name}</h3>
                <p>Contribution: ${group.contribution}</p>
                <p>Duration: {group.duration} months</p>
                <p>Members: {group.members?.length || 0}</p>
              </div>
            ))
          ) : (
            <p>No groups joined yet.</p>
          )}
        </div>
      </div>

      {/* Loans Taken */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Loans Taken</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user?.loansTaken?.length > 0 ? (
            user.loansTaken.map((loan) => (
              <div key={loan._id} className="rounded-lg bg-white p-4 shadow-md">
                <h3 className="text-lg font-semibold">
                  Amount: ${loan.amount}
                </h3>
                <p>Interest Rate: {loan.interestRate}%</p>
                <p>Duration: {loan.duration} months</p>
              </div>
            ))
          ) : (
            <p>No loans taken.</p>
          )}
        </div>
      </div>

      {/* Loans Given */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Loans Given</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user?.loansGiven?.length > 0 ? (
            user.loansGiven.map((loan) => (
              <div key={loan._id} className="rounded-lg bg-white p-4 shadow-md">
                <h3 className="text-lg font-semibold">
                  Amount: ${loan.amount}
                </h3>
                <p>Interest Rate: {loan.interestRate}%</p>
                <p>Duration: {loan.duration} months</p>
              </div>
            ))
          ) : (
            <p>No loans given.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoardSection;
