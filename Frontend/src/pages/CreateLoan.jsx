import { useState } from 'react';

const CreateLoan = () => {
  const [formData, setFormData] = useState({
    type: 'offer',
    offeredBy: '',
    lenderType: 'User',
    amount: '',
    interestRate: '',
    duration: '',
    expiryDate: '',
    reason: '',
  });

  const [aadharCard, setAadharCard] = useState(null);
  const [incomeCertificate, setIncomeCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'aadharCard') setAadharCard(e.target.files[0]);
    if (e.target.name === 'incomeCertificate')
      setIncomeCertificate(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (formData.type === 'request') {
      if (!aadharCard || !incomeCertificate) {
        setMessage(
          'Aadhar Card & Income Certificate are required for loan requests.',
        );
        setLoading(false);
        return;
      }
      data.append('aadharCard', aadharCard);
      data.append('incomeCertificate', incomeCertificate);
    }

    try {
      const response = await fetch(
        'http://localhost:8000/api/v1/loan/createLoan',
        {
          method: 'POST',
          credentials: 'include',
          body: data,
        },
      );

      const result = await response.json();

      if (response.ok) {
        setMessage('Loan Offer Created Successfully!');
        setFormData({
          type: 'offer',
          offeredBy: '',
          lenderType: 'User',
          amount: '',
          interestRate: '',
          duration: '',
          expiryDate: '',
          reason: '',
        });
        setAadharCard(null);
        setIncomeCertificate(null);
      } else {
        setMessage(result.message || 'Error creating loan offer.');
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
        <h1 className="mb-6 text-center text-3xl font-semibold text-purple-600">
          Create Loan Offer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loan Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
            >
              <option value="offer">Offer</option>
              <option value="request">Request</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Offered By
            </label>
            <input
              type="text"
              name="offeredBy"
              value={formData.offeredBy}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {formData.type === 'offer' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lender Type
                </label>
                <select
                  name="lenderType"
                  value={formData.lenderType}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
                >
                  <option value="User">User</option>
                  <option value="ROSCAGroup">ROSCA Group</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (Months)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {formData.type === 'request' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reason
                </label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Aadhar Card
                </label>
                <input
                  type="file"
                  name="aadharCard"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Income Certificate
                </label>
                <input
                  type="file"
                  name="incomeCertificate"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 py-3 font-medium text-white hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {message && (
            <p className="mt-4 text-center text-purple-600">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default CreateLoan;
