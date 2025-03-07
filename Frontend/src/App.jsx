import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Error from './components/Error';
import Dashboard from './pages/Dashboard';
import GroupCreation from './pages/GroupCreation';
import SavingCircleGroup from './components/SavingCircleGroup';
import SavingsCircles, { groupsLoader } from './pages/Savings-Circles';
import ProfilePage from './pages/Profile';
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';
import LoanOffers from './pages/LoanOffers';
import LoanAgreement from './pages/LoanAgreement';
import TransactionHistory from './components/TransactionHistory';
import GroupDetail from './components/GroupDetail';
import CreateLoan from './pages/CreateLoan';
import AllTransactions from './components/showAllTransaction';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'group/:id',
            element: <GroupDetail />,
          },
          {
            path: 'reports',
            element: <TransactionHistory />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'all-reports',
            element: <AllTransactions />,
          },
        ],
      },
      {
        path: '/group-creation',
        element: <GroupCreation />,
      },
      {
        path: '/savings-circles',
        element: <SavingsCircles />,
        loader: groupsLoader,
      },
      {
        path: '/savings-circles/:id',
        element: <SavingCircleGroup />,
      },
      {
        path: 'Sign-in',
        element: <SignIn />,
      },
      {
        path: 'Sign-up',
        element: <SignUp />,
      },
      {
        path: 'view-loans',
        element: <LoanOffers />,
      },
      {
        path: '/loan-agreement',
        element: <LoanAgreement />,
      },
      {
        path: '/create-loan',
        element: <CreateLoan />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
