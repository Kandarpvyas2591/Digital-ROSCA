/* eslint-disable react/prop-types */
function JoinedGroup({ user }) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold">Groups Joined</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {user?.joinedGroups?.length > 0 ? (
          user.joinedGroups.map((group) => (
            <div
              key={group._id}
              className="cursor-pointer rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105 hover:transform"
              onClick={() => {
                window.location.href = `/dashboard/group/${group._id}`;
              }}
            >
              <h3 className="text-lg font-semibold">{group.name}</h3>
              <p>Contribution: {group.contributionAmount}</p>
              <p>Duration: {group.cycleDuration} months</p>
              <p>Members: {group.members?.length || 0}</p>
            </div>
          ))
        ) : (
          <p>No groups joined yet.</p>
        )}
      </div>
    </div>
  );
}

export default JoinedGroup;
