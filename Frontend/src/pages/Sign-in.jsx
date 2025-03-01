import { useRef } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

function SignIn() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Submitted", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <p className="mb-6 text-center text-gray-600">
          Welcome back! Please log in to your account
        </p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                placeholder="Enter your password"
                className="w-full ml-2 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-purple-500 cursor-pointer">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
