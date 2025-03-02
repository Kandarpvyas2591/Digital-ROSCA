import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupById, getMe } from '../services/apiROSCAgroup';
import Loader from './Loader';
import TransactionModal from './TransactionModal';

const GroupDetail = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionDetails, setTransactionDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch group & user data
  useEffect(() => {
    async function fetchData() {
      try {
        const [groupData, userData] = await Promise.all([
          getGroupById(id),
          getMe(),
        ]);

        setGroup(groupData);
        setMe(userData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // Update transaction details after state updates
  useEffect(() => {
    if (group && me) {
      setTransactionDetails({
        type: 'contribution',
        senderType: 'User',
        receiverType: 'ROSCAGroup',
        receiver: id,
        sender: me._id,
        amount: group.contributionAmount,
      });

      console.log('User:', me);
      console.log('Group:', group);
    }
  }, [group, me, id]);

  if (loading) {
    return <Loader />;
  }

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
      <div className="flex items-center justify-end">
        {group.cycleDues?.includes(me?._id) ? (
          <button
            className="h-9 w-20 rounded-xl bg-purple-500 px-3 py-1 text-white hover:bg-purple-700"
            onClick={() => setModalVisible(true)}
          >
            Pay
          </button>
        ) : (
          <button
            className="h-9 w-20 cursor-not-allowed rounded-xl bg-gray-400 px-3 py-1 text-white"
            disabled
          >
            Paid
          </button>
        )}
        {modalVisible && (
          <TransactionModal
            transactionDetails={transactionDetails}
            onClose={() => setModalVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
