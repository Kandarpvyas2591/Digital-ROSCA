import { useRef } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';

function SignUp() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Submitted', data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <p className="mb-6 text-center text-gray-600">
          Join us for a transparent and automated savings experience
        </p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center px-4 py-2 border rounded-md">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full ml-2 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center px-4 py-2 border rounded-md">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="w-full ml-2 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center px-4 py-2 border rounded-md">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="w-full ml-2 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center px-4 py-2 border rounded-md">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                name="reEnterPassword"
                placeholder="Re-enter password"
                className="w-full ml-2 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center px-4 py-2 border rounded-md">
              <FaPhone className="text-gray-500" />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className="w-full ml-2 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="termsAccepted"
                className="w-4 h-4"
                required
              />
              <label className="text-sm text-gray-700">
                I agree with{' '}
                <span className="text-purple-500">Terms & Conditions</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already registered?{' '}
          <a href='/sign-in' className="text-purple-500 cursor-pointer">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
