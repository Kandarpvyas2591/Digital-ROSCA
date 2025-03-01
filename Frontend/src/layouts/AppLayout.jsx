import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.isLoading;
  return (
    <div className="">
      {isLoading && <Loader />}
      <Header />
      <div>
        <main className="h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
