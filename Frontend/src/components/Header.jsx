import { useState, useEffect } from 'react';
import image from '../assets/image.png';
import Button from './Button';
import { logOut } from '../services/apiROSCAgroup';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // if cookie is present than setIsLoggedIn to true
    // print cookie
    console.log('cookie', document.cookie);
    const user = document.cookie
      .split(';')
      .find((cookie) => cookie.includes('accessToken'));
    console.log(user, document.cookie);
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex h-16 w-full items-center bg-white px-6 shadow-md md:h-20">
      <div className="flex items-center gap-10">
        <div
          className="flex cursor-pointer items-center gap-3 text-2xl font-semibold text-gray-800 md:text-3xl"
          onClick={() => (window.location.href = '/')}
        >
          <img
            src={image}
            className="h-10 w-10 md:h-12 md:w-12"
            alt="Header Image"
          />
          <span>Digital ROSCA</span>
        </div>

        <div className="hidden gap-8 md:flex">
          {['Dashboard', 'Group Creation', 'Savings Circles','View Loans','Create Loan'].map((item) => (
            <span
              key={item}
              className="cursor-pointer border-b-2 border-transparent pb-1 text-lg text-gray-700 transition duration-300 hover:border-violet-500 hover:text-violet-600"
              onClick={() => {
                window.location.href = `/${item.toLowerCase().replace(' ', '-')}`;
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {isLoggedIn ? (
          <Button
            onClick={() => {
              logOut();
              window.location.href = '/';
            }}
          >
            Log Out
          </Button>
        ) : (
          <>
            <a href="/sign-in">
              <Button>Login</Button>
            </a>
            <a href="/sign-up">
              <Button>Sign Up</Button>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
