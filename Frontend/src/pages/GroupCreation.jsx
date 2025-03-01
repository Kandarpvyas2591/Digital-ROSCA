import { useState } from 'react';

export default function GroupCreation() {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [groupType, setGroupType] = useState('normal');
  const [cycleDuration, setWithdrawalDuration] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [maxMembers, setMaxMembers] = useState('');
  const [cycleStartDate, setStartDate] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [payoutPercentage, setPayoutPercentage] = useState(''); // Only for Lender
  const [payoutAmount, setPayoutAmount] = useState(0); // Dynamically calculated
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Update payout amount if group type is lender
  const handleContributionChange = (e) => {
    const amount = e.target.value;
    setContributionAmount(amount);
    if (groupType === 'lender' && payoutPercentage) {
      setPayoutAmount((amount * payoutPercentage) / 100); // Calculate payout
    }
  };

  // Update payout amount if payout percentage changes
  const handlePayoutChange = (e) => {
    const percentage = e.target.value;
    setPayoutPercentage(percentage);
    if (groupType === 'lender' && contributionAmount) {
      setPayoutAmount((contributionAmount * percentage) / 100); // Calculate payout
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const requestData = {
      name: groupName,
      description,
      groupType,
      cycleDuration,
      contributionAmount,
      maxMembers,
      cycleStartDate,
      registrationDeadline,
      ...(groupType === 'lender' && { payoutAmount }), // Include only for lenders
    };

    try {
      const response = await fetch(
        'http://localhost:8000/api/v1/rosca/create-group',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(requestData),
        },
      );

      const data = await response.json();
      if (response.ok) {
        setMessage('ROSCA Group Created Successfully!');
      } else {
        setMessage(data.message || 'Error creating group.');
        console.log(data);
      }
    } catch (error) {
      setMessage('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-md sm:p-8 md:p-10 lg:p-12">
        <h1 className="mb-8 text-center text-3xl font-semibold text-purple-600">
          Set Up Your ROSCA Group
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Group Name
            </label>
            <input
              type="text"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Enter Group Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              rows="3"
              required
            />
          </div>

          {/* Group Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Group Type
            </label>
            <select
              value={groupType}
              onChange={(e) => {
                setGroupType(e.target.value);
                if (e.target.value !== 'lender') {
                  setPayoutPercentage('');
                  setPayoutAmount(0);
                }
              }}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
            >
              <option value="normal">Normal</option>
              <option value="lender">Lender</option>
            </select>
          </div>

          {/* Payout Percentage (Only for Lender Group Type) */}
          {groupType === 'lender' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payout Percentage
              </label>
              <input
                type="number"
                placeholder="Enter Payout Percentage"
                value={payoutPercentage}
                onChange={handlePayoutChange}
                className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          )}

          {/* Contribution Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contribution Amount
            </label>
            <input
              type="number"
              placeholder="Enter Contribution Amount"
              value={contributionAmount}
              onChange={handleContributionChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Payout Amount (Calculated Automatically for Lender) */}
          {groupType === 'lender' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payout Amount
              </label>
              <input
                type="number"
                value={payoutAmount}
                readOnly
                className="w-full rounded-lg border bg-gray-100 p-3 focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}

          {/* Withdrawal Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Withdrawal Duration
            </label>
            <input
              type="text"
              placeholder="Enter Duration (e.g., after 1 Month, 2 month etc)"
              value={cycleDuration}
              onChange={(e) => setWithdrawalDuration(e.target.value)}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Max Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Members
            </label>
            <input
              type="number"
              placeholder="Enter Duration (e.g., Weekly, Monthly)"
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={cycleStartDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Registration Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration Deadline
            </label>
            <input
              type="date"
              value={registrationDeadline}
              onChange={(e) => setRegistrationDeadline(e.target.value)}
              max={cycleStartDate}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
              disabled={!cycleStartDate}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-purple-600 py-3 font-medium text-white hover:bg-purple-700"
            >
              {loading ? 'Creating...' : 'Create ROSCA Group'}
            </button>
          </div>

          {/* Success/Error Message */}
          {message && (
            <p className="mt-4 text-center text-purple-600">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
