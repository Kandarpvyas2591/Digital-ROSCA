import { HiUsers, HiClock, HiCurrencyDollar } from 'react-icons/hi2';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getGroups, getMe } from '../services/apiROSCAgroup';
import { useEffect, useState } from 'react';

function SavingsCircles() {
  const roscaGroups = useLoaderData();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getMe();
        console.log('Fetched user:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }

    fetchUser();
  }, []);

  console.log('User:', user);

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-purple-600">
          Join a ROSCA Group
        </h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-violet-600 text-left text-white">
                <th className="px-6 py-4">Group Name</th>
                <th className="px-6 py-4">Contribution</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Members</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {roscaGroups.map((group, index) => (
                <tr
                  key={group._id}
                  className={`border-b hover:bg-gray-100 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="gap-2 px-6 py-4 font-semibold text-gray-800">
                    <HiUsers className="text-gray-500" />
                    {group.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <HiCurrencyDollar className="text-green-500" />
                    {group.contributionAmount}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <HiClock className="text-blue-500" />
                    {group.cycleDuration} Months
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {group.members.length} / {group.maxMembers} members
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.joinedGroups?.some(
                      (joinedGroup) => joinedGroup._id === group._id,
                    ) ? (
                      <span className="rounded-md bg-green-600 px-5 py-2 text-white">
                        Joined
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          navigate(`/savings-circles/${group._id}`)
                        }
                        className={`${
                          group.members.length === group.maxMembers
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-violet-600 hover:bg-violet-700'
                        } rounded-md px-5 py-2 text-white transition`}
                      >
                        Join
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function groupsLoader() {
  const roscaGroups = await getGroups();
  return roscaGroups;
}

export default SavingsCircles;
