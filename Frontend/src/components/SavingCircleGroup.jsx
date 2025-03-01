import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiUsers, HiClock, HiCurrencyDollar } from 'react-icons/hi2';
import { getGroupById, joinGroup } from '../services/apiROSCAgroup';
import Loader from './Loader';
import AuthModal from '../components/AuthModal';
async function handleJoinGroup(groupId) {
  const data = await joinGroup(groupId);
  console.log(data);
  await data.json();
  console.log(data);
}

function GroupDetail() {
  const [isvisible, setIsvisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalIconColor, setModalIconColor] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const [roscaGroup, setRoscaGroup] = useState(null);

  useEffect(() => {
    async function fetchGroup() {
      const group = await getGroupById(id);
      setRoscaGroup(group);
      console.log('Group Data:', group); // Debug log
    }
    fetchGroup();
  }, [id]);

  if (!roscaGroup) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-8">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">
          {roscaGroup.name}
        </h2>

        <div className="space-y-2 text-gray-700">
          <p className="flex items-center gap-2">
            <HiCurrencyDollar className="text-green-500" />
            <strong>Contribution:</strong> {roscaGroup.contributionAmount}
          </p>
          <p className="flex items-center gap-2">
            <HiClock className="text-blue-500" />
            <strong>Duration:</strong> {roscaGroup.cycleDuration}
          </p>
          <p className="flex items-center gap-2">
            <HiUsers className="text-purple-500" />
            <strong>Members:</strong> {roscaGroup.members.join(', ')}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Go Back
          </button>
          <button
            onClick={() => {
              handleJoinGroup(roscaGroup._id);
              setModalTitle('Joined Successful!');
              setModalMessage('Welcome to the Group!');
              setModalIconColor('bg-purple-500');
              setIsvisible(true);
              setTimeout(() => {
                window.location.href = '/dashboard';
              }, 2500);
            }}
            className="ml-4 mt-6 rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
          >
            Join
          </button>
        </div>
      </div>
      <AuthModal
        isVisible={isvisible}
        title={modalTitle}
        message={modalMessage}
        iconColor={modalIconColor}
        onClose={() => setIsvisible(false)}
      />
    </div>
  );
}

export default GroupDetail;
