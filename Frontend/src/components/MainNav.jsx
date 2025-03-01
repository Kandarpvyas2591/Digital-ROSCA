import { NavLink } from 'react-router-dom';
import {
  HiMiniSquares2X2,
  HiOutlineHome,
  HiOutlineIdentification,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 text-lg font-medium text-gray-600 transition-all ${isActive ? 'rounded-md bg-gray-50 text-gray-800' : 'hover:bg-gray-50 hover:text-gray-800'}`
            }
          >
            <HiOutlineHome className="group-hover:text-brand-600 h-6 w-6 text-gray-400 transition-all" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/overview"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 text-lg font-medium text-gray-600 transition-all ${isActive ? 'rounded-md bg-gray-50 text-gray-800' : 'hover:bg-gray-50 hover:text-gray-800'}`
            }
          >
            <HiMiniSquares2X2 className="group-hover:text-brand-600 h-6 w-6 text-gray-400 transition-all" />
            <span>OverView</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 text-lg font-medium text-gray-600 transition-all ${isActive ? 'rounded-md bg-gray-50 text-gray-800' : 'hover:bg-gray-50 hover:text-gray-800'}`
            }
          >
            <HiOutlinePencilSquare className="group-hover:text-brand-600 h-6 w-6 text-gray-400 transition-all" />
            <span>Report</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 text-lg font-medium text-gray-600 transition-all ${isActive ? 'rounded-md bg-gray-50 text-gray-800' : 'hover:bg-gray-50 hover:text-gray-800'}`
            }
          >
            <HiOutlineIdentification className="group-hover:text-brand-600 h-6 w-6 text-gray-400 transition-all" />
            <span>Profile</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 text-lg font-medium text-gray-600 transition-all ${isActive ? 'rounded-md bg-gray-50 text-gray-800' : 'hover:bg-gray-50 hover:text-gray-800'}`
            }
          >
            <HiOutlineCog6Tooth className="group-hover:text-brand-600 h-6 w-6 text-gray-400 transition-all" />
            <span>Settings</span>
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

export default MainNav;
