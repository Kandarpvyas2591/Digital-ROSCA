import { useState, useRef } from 'react';
import { HiPencilSquare } from 'react-icons/hi2';
import { getMe } from '../services/apiROSCAgroup';

const User = async function () {
  const User = await getMe();
  return User;
};

export default function ProfilePage() {
  // const [user, setUser] = useState({
  //   name: 'Kandarp Vyas',
  //   email: 'kandarpvyas2591@gmail.com',
  //   pan: 'ABCDE1234F',
  //   mobile: '9876543210',
  //   reputation: 85,
  //   joinedGroups: ['Wealth Builders', 'Smart Savers'],
  //   createdGroups: ['Future Fund'],
  // });
  console.log('User:', User);
  const [user, setUser] = useState(User);

  const [edit, setEdit] = useState(false);
  const formRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      name: formData.get('name'),
      email: formData.get('email'),
      pan: formData.get('pan'),
      mobile: formData.get('mobile'),
      reputation: user.reputation,
      joinedGroups: user.joinedGroups,
      createdGroups: user.createdGroups,
    };
    setUser(updatedUser);
    setEdit(false);
    console.log(updatedUser);
  }

  function handleCancel() {
    formRef.current.reset();
    setEdit(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Navbar */}
      {/* <nav className="flex justify-between bg-purple-500 px-6 py-4 text-white">
        <h1 className="text-xl font-bold">Profile Settings</h1>
      </nav> */}

      {/* Profile Section */}
      <div className="mx-auto max-w-3xl rounded bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Your Account
        </h2>

        <form
          ref={formRef}
          className="mx-auto max-w-3xl rounded bg-white p-6 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user.username}
                className="w-full rounded border bg-gray-100 p-2"
                disabled={!edit}
              />
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="w-full rounded border bg-gray-100 p-2"
                disabled={!edit}
              />
            </div>
            <div>
              <label className="text-gray-600">PAN Number</label>
              <input
                type="text"
                name="pan"
                defaultValue={user.pan}
                className="w-full rounded border bg-gray-100 p-2"
                disabled={!edit}
              />
            </div>
            <div>
              <label className="text-gray-600">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                defaultValue={user.mobileNumber}
                className="w-full rounded border bg-gray-100 p-2"
                disabled={!edit}
              />
            </div>
            <div className="flex w-full items-end justify-between">
              <div></div>
            </div>
            <div className="flex items-end justify-end">
              <HiPencilSquare
                size={24}
                className="ml-4 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setEdit(true)}
              />
            </div>
          </div>
          {edit && (
            <div className="mt-4 flex justify-end gap-5">
              <button
                type="reset"
                onClick={handleCancel}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          )}
        </form>

        {/* Groups Section */}
        <div className="mt-6">
          <label className="text-gray-600">Reputation Score</label>
          <input
            type="number"
            value={user.reputation}
            className="w-full rounded border bg-gray-100 p-2"
            disabled={!edit}
          />
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Joined Groups</h3>
          <ul className="list-disc pl-6 text-gray-600">
            {user?.joinedGroups?.map((group, index) => (
              <li key={index}>{group}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Created Groups
          </h3>
          <ul className="list-disc pl-6 text-gray-600">
            {user?.createdGroups?.map((group, index) => (
              <li key={index}>{group}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
