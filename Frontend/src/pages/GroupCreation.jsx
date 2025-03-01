import { useState } from 'react';

function GroupCreation() {
  const [members, setMembers] = useState([]);
  const [memberInput, setMemberInput] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleAddMember = () => {
    if (memberInput.name.trim() !== '') {
      setMembers([...members, memberInput.name]);
      setMemberInput({ name: '', email: '', phone: '' });
    }
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 md:p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-lg sm:max-w-lg sm:p-6 md:max-w-xl md:p-10 lg:max-w-2xl lg:p-12">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 sm:text-3xl">
          Set Up Your ROSCA Group
        </h2>

        <form className="space-y-6">
          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Contribution Cycle Duration
            </label>
            <select className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Number of Contributions
            </label>
            <input
              type="number"
              placeholder="Enter Number"
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Add Member
            </label>
            <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
              <input
                type="text"
                placeholder="Member Name"
                value={memberInput.name}
                onChange={(e) =>
                  setMemberInput({ ...memberInput, name: e.target.value })
                }
                className="mb-3 w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="email"
                placeholder="Member Email"
                value={memberInput.email}
                onChange={(e) =>
                  setMemberInput({ ...memberInput, email: e.target.value })
                }
                className="mb-3 w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="tel"
                placeholder="Member Phone Number"
                value={memberInput.phone}
                onChange={(e) =>
                  setMemberInput({ ...memberInput, phone: e.target.value })
                }
                className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddMember}
            className="w-full rounded-lg bg-purple-600 py-3 font-medium text-white transition duration-200 hover:bg-purple-700"
          >
            Add Another Member
          </button>

          {members.length > 0 && (
            <div className="mt-4 rounded-lg bg-gray-100 p-4">
              <h3 className="mb-2 font-medium text-gray-800">Added Members:</h3>
              <ul className="space-y-2">
                {members.map((member, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm"
                  >
                    <span className="text-gray-700">{member}</span>
                    <button
                      onClick={() => handleRemoveMember(index)}
                      className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white transition duration-200 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Payout Frequency
            </label>
            <select className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Payout Amount
            </label>
            <input
              type="text"
              placeholder="Enter amount or formula"
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Special Conditions
            </label>
            <div className="mt-2 flex items-center">
              <input type="checkbox" className="h-5 w-5 text-purple-600" />
              <span className="ml-2 text-gray-700">Emergency Withdrawals</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-purple-600 py-3 font-medium text-white transition duration-200 hover:bg-purple-700"
          >
            Create ROSCA Group
          </button>
        </form>
      </div>
    </div>
  );
}

export default GroupCreation;
