import image from '../assets/image.png';
import Button from './Button';

function Header() {
  return (
    <div className="flex items-center w-full h-16 px-6 bg-white shadow-md md:h-20">
      <div className="flex items-center gap-10">
        <div
          className="flex items-center gap-3 text-2xl font-semibold text-gray-800 cursor-pointer md:text-3xl"
          onClick={() => (window.location.href = '/')}
        >
          <img
            src={image}
            className="w-10 h-10 md:h-12 md:w-12"
            alt="Header Image"
          />
          <span>Digital ROSCA</span>
        </div>

        <div className="hidden gap-8 md:flex">
          {['Dashboard', 'Group Creation', 'Savings Circles'].map((item) => (
            <span
              key={item}
              className="pb-1 text-lg text-gray-700 transition duration-300 border-b-2 border-transparent cursor-pointer hover:border-violet-500 hover:text-violet-600"
              onClick={() => {
                window.location.href = `/${item.toLowerCase().replace(' ', '-')}`;
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <a href='/sign-in'><Button>Login</Button></a>
        <a href='/sign-up'><Button>Sign Up</Button></a>
      </div>
    </div>
  );
}

export default Header;
