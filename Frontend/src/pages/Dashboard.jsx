import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import SideBar from '../components/SideBar';
import TransactionHistory from '../components/TransactionHistory';
import Loader from '../components/Loader';

function Dashboard() {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-cols-[15rem_1fr]">
      {isLoading && <Loader />}
      <SideBar />
      <div className="overflow-scroll bg-gray-50 p-5 pb-24">
        {location.pathname === '/dashboard' ? <div>Dashboard</div> : <Outlet />}
      </div>
    </div>
  );
}

export default Dashboard;
