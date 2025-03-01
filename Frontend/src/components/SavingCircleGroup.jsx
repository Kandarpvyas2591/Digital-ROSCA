import { useParams, useNavigate } from 'react-router-dom';
import { HiUsers, HiClock, HiCurrencyDollar } from 'react-icons/hi2';

const roscaGroups = [
  {
    id: 1,
    name: 'Wealth Builders',
    amount: '$500',
    duration: '6 months',
    members: ['Alice', 'Bob', 'Charlie'],
  },
  {
    id: 2,
    name: 'Smart Savers',
    amount: '$300',
    duration: '3 months',
    members: ['David', 'Eve', 'Frank'],
  },
  {
    id: 3,
    name: 'Future Fund',
    amount: '$700',
    duration: '12 months',
    members: ['Grace', 'Hank', 'Ivy'],
  },
  {
    id: 4,
    name: 'Growth Circle',
    amount: '$200',
    duration: '4 months',
    members: ['Jack', 'Kelly', 'Leo'],
  },
];

function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = roscaGroups.find((g) => g.id === parseInt(id));
  console.log(group);

  if (!group) {
    return (
      <div className="mt-10 text-center text-red-500">Group not found!</div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-8">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">{group.name}</h2>

        <div className="space-y-2 text-gray-700">
          <p className="flex items-center gap-2">
            <HiCurrencyDollar className="text-green-500" />
            <strong>Contribution:</strong> {group.amount}
          </p>
          <p className="flex items-center gap-2">
            <HiClock className="text-blue-500" />
            <strong>Duration:</strong> {group.duration}
          </p>
          <p className="flex items-center gap-2">
            <HiUsers className="text-purple-500" />
            <strong>Members:</strong> {group.members.join(', ')}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default GroupDetail;
