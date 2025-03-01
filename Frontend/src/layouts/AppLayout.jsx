import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
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
