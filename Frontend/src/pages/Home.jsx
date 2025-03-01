import {
  HiOutlineCheckCircle,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineArrowTrendingUp,
} from 'react-icons/hi2';
import bg_img from '../assets/bg_img.png';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div
        className="relative flex h-[640px] w-full flex-col items-center justify-center gap-6 bg-[#5577b148] text-center"
        style={{
          backgroundImage: `url(${bg_img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <span className="font-sans text-6xl text-white">
          Join the Future of Saving
        </span>
        <span className="font-sans text-2xl text-white">
          Collaborate to save smarter with Digital ROSCA
        </span>
        <button className="h-12 w-32 rounded-lg bg-violet-500 text-white shadow-md hover:bg-violet-600">
          Sign Up
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center p-16">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          <FeatureCard
            icon={
              <HiOutlineCheckCircle className="mx-auto text-4xl text-green-500" />
            }
            title="Transparency"
            description="Our processes are clear and open, allowing you to understand how our services work."
          />
          <FeatureCard
            icon={
              <HiOutlineCalendar className="mx-auto text-4xl text-blue-500" />
            }
            title="Automation"
            description="Experience seamless interactions through our automated systems designed for efficiency."
          />
          <FeatureCard
            icon={
              <HiOutlineUsers className="mx-auto text-4xl text-orange-500" />
            }
            title="Community Microloans"
            description="Connect with your community to access tailored microloan solutions."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 p-16 text-center md:grid-cols-3">
        <FeatureCard
          icon={
            <HiOutlineShieldCheck className="mx-auto text-4xl text-purple-500" />
          }
          title="Instant Fund Transfers"
          description="Secure and quick transactions ensuring immediate fund access."
        />
        <FeatureCard
          icon={
            <HiOutlineArrowTrendingUp className="mx-auto text-4xl text-red-500" />
          }
          title="Flexible Repayment Options"
          description="Advanced AI algorithms evaluate risk for better financial security."
        />
        <FeatureCard
          icon={
            <HiOutlineCurrencyDollar className="mx-auto text-4xl text-yellow-500" />
          }
          title="Collaboration with Local Communities"
          description="Enjoy minimal costs for transactions, making savings more efficient."
        />
      </div>
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-xs text-gray-600">{description}</p>
    </div>
  );
}

export default Home;
