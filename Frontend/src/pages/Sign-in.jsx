import { useRef } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { login } from '../services/apiROSCAgroup';

function SignIn() {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Submitted', data);

    const user = await login(data);
    console.log('User:', user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/dashboard'; // Redirect to dashboard or any other page
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold">Sign In</h2>
        <p className="mb-6 text-center text-gray-600">
          Welcome back! Please log in to your account
        </p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                placeholder="Enter your password"
                className="ml-2 w-full focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-purple-500 py-2 text-white hover:bg-purple-600"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/sign-up" className="cursor-pointer text-purple-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
