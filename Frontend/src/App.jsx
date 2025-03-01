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
            path: 'overview',
            element: <div>Overview</div>,
          },
          {
            path: 'reports',
            element: <div>Reports</div>,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
