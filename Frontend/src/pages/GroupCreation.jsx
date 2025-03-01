import { useState } from "react";

export default function GroupCreation() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groupType, setGroupType] = useState("normal");
  const [withdrawalDuration, setWithdrawalDuration] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [cycleStartDate, setStartDate] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [payoutPercentage, setPayoutPercentage] = useState(""); // Only for Lender
  const [payoutAmount, setPayoutAmount] = useState(0); // Dynamically calculated
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Update payout amount if group type is lender
  const handleContributionChange = (e) => {
    const amount = e.target.value;
    setContributionAmount(amount);
    if (groupType === "lender" && payoutPercentage) {
      setPayoutAmount((amount * payoutPercentage) / 100); // Calculate payout
    }
  };

  // Update payout amount if payout percentage changes
  const handlePayoutChange = (e) => {
    const percentage = e.target.value;
    setPayoutPercentage(percentage);
    if (groupType === "lender" && contributionAmount) {
      setPayoutAmount((contributionAmount * percentage) / 100); // Calculate payout
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const requestData = {
      name: groupName,
      description,
      groupType,
      withdrawalDuration,
      contributionAmount,
      cycleStartDate,
      registrationDeadline,
      ...(groupType === "lender" && {payoutAmount }), // Include only for lenders
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/rosca/create-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("ROSCA Group Created Successfully!");
      } else {
        setMessage(data.message || "Error creating group.");
      }
    } catch (error) {
      setMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center w-full min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md sm:p-8 md:p-10 lg:p-12">
        <h1 className="mb-8 text-3xl font-semibold text-center text-purple-600">
          Set Up Your ROSCA Group
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Group Name</label>
            <input
              type="text"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Enter Group Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              rows="3"
              required
            />
          </div>

          {/* Group Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Group Type</label>
            <select
              value={groupType}
              onChange={(e) => {
                setGroupType(e.target.value);
                if (e.target.value !== "lender") {
                  setPayoutPercentage("");
                  setPayoutAmount(0);
                }
              }}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            >
              <option value="normal">Normal</option>
              <option value="lender">Lender</option>
            </select>
          </div>

          {/* Payout Percentage (Only for Lender Group Type) */}
          {groupType === "lender" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Payout Percentage</label>
              <input
                type="number"
                placeholder="Enter Payout Percentage"
                value={payoutPercentage}
                onChange={handlePayoutChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          )}

          {/* Contribution Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contribution Amount</label>
            <input
              type="number"
              placeholder="Enter Contribution Amount"
              value={contributionAmount}
              onChange={handleContributionChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Payout Amount (Calculated Automatically for Lender) */}
          {groupType === "lender" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Payout Amount</label>
              <input
                type="number"
                value={payoutAmount}
                readOnly
                className="w-full p-3 border bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={cycleStartDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Registration Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Deadline</label>
            <input
              type="date"
              value={registrationDeadline}
              onChange={(e) => setRegistrationDeadline(e.target.value)}
              max={cycleStartDate}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
              disabled={!cycleStartDate}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="w-full py-3 mt-6 font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
              {loading ? "Creating..." : "Create ROSCA Group"}
            </button>
          </div>

          {/* Success/Error Message */}
          {message && <p className="mt-4 text-center text-purple-600">{message}</p>}
        </form>
      </div>
    </section>
  );
}
