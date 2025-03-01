import MainNav from './MainNav';

function SideBar() {
  return (
    <aside className="row-span-full flex flex-col gap-8 border-r border-gray-200 bg-gray-50 p-8">
      <MainNav />
    </aside>
  );
}

export default SideBar;
