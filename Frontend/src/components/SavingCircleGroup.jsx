import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HiUsers,
  HiClock,
  HiCurrencyDollar,
  HiCalendar,
  HiClipboardDocumentList,
} from 'react-icons/hi2';
import { getGroupById, joinGroup } from '../services/apiROSCAgroup';
import Loader from './Loader';
import AuthModal from '../components/AuthModal';

async function handleJoinGroup(groupId) {
  try {
    const response = await joinGroup(groupId);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error joining group:', error);
  }
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
      try {
        const group = await getGroupById(id);
        setRoscaGroup(group);
        console.log('Group Data:', group);
      } catch (error) {
        console.error('Error fetching group:', error);
      }
    }
    fetchGroup();
  }, [id]);

  if (!roscaGroup) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-8">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">
          {roscaGroup.name}
        </h2>
        <p className="mb-4 text-gray-600">{roscaGroup.description}</p>

        <div className="space-y-2 text-gray-700">
          <p className="flex items-center gap-2">
            <HiClipboardDocumentList className="text-gray-500" />
            <strong>Admin:</strong> {roscaGroup.admin?.name || 'Unknown'}
          </p>
          <p className="flex items-center gap-2">
            <HiCurrencyDollar className="text-green-500" />
            <strong>Contribution:</strong> ${roscaGroup.contributionAmount}
          </p>
          <p className="flex items-center gap-2">
            <HiClock className="text-blue-500" />
            <strong>Duration:</strong> {roscaGroup.cycleDuration} months
          </p>
          <p className="flex items-center gap-2">
            <HiUsers className="text-purple-500" />
            <strong>Members:</strong> {roscaGroup.members.length}/
            {roscaGroup.maxMembers}
          </p>
          <p className="flex items-center gap-2">
            <HiCalendar className="text-orange-500" />
            <strong>Start Date:</strong>{' '}
            {new Date(roscaGroup.cycleStartDate).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            <HiCalendar className="text-red-500" />
            <strong>End Date:</strong>{' '}
            {new Date(roscaGroup.cycleEndDate).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            <HiClipboardDocumentList className="text-indigo-500" />
            <strong>Group Type:</strong> {roscaGroup.groupType}
          </p>
          <p className="flex items-center gap-2">
            <HiCurrencyDollar className="text-yellow-500" />
            <strong>Wallet Balance:</strong> ${roscaGroup.walletAmount}
          </p>
          <p className="flex items-center gap-2">
            <HiClipboardDocumentList className="text-teal-500" />
            <strong>Payout Amount:</strong> ${roscaGroup.payoutAmount || 'N/A'}
          </p>
          <p className="flex items-center gap-2">
            <HiCalendar className="text-gray-700" />
            <strong>Registration Deadline:</strong>{' '}
            {new Date(roscaGroup.registrationDeadline).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Go Back
          </button>
          <button
            onClick={() => {
              handleJoinGroup(roscaGroup._id);
              setModalTitle('Joined Successfully!');
              setModalMessage('Welcome to the Group!');
              setModalIconColor('bg-purple-500');
              setIsvisible(true);
              setTimeout(() => {
                window.location.href = '/dashboard';
              }, 2500);
            }}
            className="ml-4 rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
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
