import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Loader from '../components/Loader';
import DashBoardSection from '../components/DashBoardSection';
import { useEffect, useState } from 'react';
import { getMe } from '../services/apiROSCAgroup';

function Dashboard() {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getMe();
        setUser(userData);
        console.log(user);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }

    fetchUser();
  });

  return (
    <div className="grid h-screen grid-cols-[15rem_1fr]">
      {isLoading && <Loader />}
      <SideBar />
      <div className="overflow-scroll bg-gray-50 p-5 pb-24">
        {location.pathname === '/dashboard' ? (
          <DashBoardSection user={user} />
        ) : (
          // <h1>Dashboard`</h1>
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
