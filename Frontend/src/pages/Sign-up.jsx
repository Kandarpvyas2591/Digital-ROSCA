import { useRef, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { signUp } from '../services/apiROSCAgroup';
import AuthModal from '../components/AuthModal';

function SignUp() {
  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalIconColor, setModalIconColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Submitted', data);
    try {
      const user = await signUp(data);
      if (user) {
        setModalTitle('Sign Up Successful!');
        setModalMessage('Welcome! You have successfully signed up.');
        setModalIconColor('bg-blue-500');
        setIsVisible(true);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2500);
      }
    } catch (error) {
      setModalTitle('Sign Up Failed');
      setModalMessage('An error occurred during sign up. Please try again.');
      setModalIconColor('bg-red-500');
      setIsVisible(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold">Create Account</h2>
        <p className="mb-6 text-center text-gray-600">
          Join us for a transparent and automated savings experience
        </p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center rounded-md border px-4 py-2">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="username"
                placeholder="Enter your full name"
                className="ml-2 w-full focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center rounded-md border px-4 py-2">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="ml-2 w-full focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center rounded-md border px-4 py-2">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="ml-2 w-full focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center rounded-md border px-4 py-2">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                name="reEnterPassword"
                placeholder="Re-enter password"
                className="ml-2 w-full focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center rounded-md border px-4 py-2">
              <FaPhone className="text-gray-500" />
              <input
                type="text"
                name="mobileNumber"
                placeholder="Enter your phone number"
                className="ml-2 w-full focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="termsAccepted"
                className="h-4 w-4"
                required
              />
              <label className="text-sm text-gray-700">
                I agree with{' '}
                <span className="text-purple-500">Terms & Conditions</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-purple-500 py-2 text-white hover:bg-purple-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already registered?{' '}
          <a href="/sign-in" className="cursor-pointer text-purple-500">
            Log In
          </a>
        </p>
      </div>
      {isVisible && (
        <AuthModal
          isVisible={isVisible}
          title={modalTitle}
          message={modalMessage}
          iconColor={modalIconColor}
          onClose={() => setIsVisible(false)}
        />
      )}
    </div>
  );
}

export default SignUp;
