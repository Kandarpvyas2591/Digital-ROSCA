import logo from '../assets/image.png';

function Logo() {
  return (
    <div className="text-center">
      <img src={logo} alt="Logo" className="h-36 w-auto" />
    </div>
  );
}

export default Logo;
