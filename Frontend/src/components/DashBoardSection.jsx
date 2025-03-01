import CreatedGroup from './CreatedGroup';
import JoinedGroup from './JoinedGroup';
import LoanGiven from './LoanGiven';
import LoanTaken from './LoanTaken';

/* eslint-disable react/prop-types */
const DashBoardSection = ({ user }) => {
  // If user is undefined or null, return loading state
  if (!user) {
    return <p>Loading...</p>;
  }
  console.log(user);

  return (
    <div className="p-6">
      {/* Created Groups */}

      <CreatedGroup user={user} />

      {/* Joined Groups */}

      <JoinedGroup user={user} />

      {/* Loans Taken */}

      <LoanTaken user={user} />

      {/* Loans Given */}

      <LoanGiven user={user} />
    </div>
  );
};

export default DashBoardSection;
