import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../services/apiROSCAgroup'; // API call to fetch group details
import Loader from './Loader';

const GroupDetail = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id);
  useEffect(() => {
    async function fetchGroup() {
      try {
        const groupData = await getGroupById(id);
        setGroup(groupData);
      } catch (error) {
        console.error('Failed to fetch group details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGroup();
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  console.log(group);

  if (!group) {
    return (
      <div className="flex h-screen items-center justify-center">
        Group not found
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">{group.name}</h1>
      <p className="mb-4 text-gray-600">
        {group.description || 'No description available'}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="font-semibold">Cycle Duration:</p>
          <p>{group.cycleDuration} months</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="font-semibold">Contribution Amount:</p>
          <p>{group.contributionAmount}</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="font-semibold">Wallet Amount:</p>
          <p>{group.walletAmount}</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="font-semibold">Group Type:</p>
          <p>{group.groupType}</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="font-semibold">Max Members:</p>
          <p>{group.maxMembers}</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="font-semibold">Cycle Number:</p>
          <p>{group.cycleNumber}</p>
        </div>
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        Members ({group.members.length}/{group.maxMembers})
      </h2>
      <ul className="mt-2 rounded-lg bg-gray-50 p-4">
        {group.members.length > 0 ? (
          group.members.map((member, index) => (
            <li key={index} className="border-b py-1 last:border-none">
              {member.username || member._id}
            </li>
          ))
        ) : (
          <p>No members yet.</p>
        )}
      </ul>

      <div className="mt-6 rounded-lg bg-gray-100 p-4">
        <p className="font-semibold">Admin:</p>
        <p>{group.admin?.username || 'Unknown'}</p>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Created At: {new Date(group.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default GroupDetail;
