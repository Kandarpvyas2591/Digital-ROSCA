import { Outlet, useLocation } from 'react-router-dom';
import SideBar from '../components/SideBar';
import TransactionHistory from '../components/TransactionHistory';

function Dashboard() {
  const location = useLocation();

  return (
    <div className="grid h-screen grid-cols-[15rem_1fr]">
      <SideBar />
      <div className="overflow-scroll bg-gray-50 p-5 pb-24">
        {location.pathname === '/dashboard' ? (
          <TransactionHistory />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
