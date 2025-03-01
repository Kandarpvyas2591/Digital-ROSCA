import image from '../assets/image.png';

import {
  HiMiniEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineQuestionMarkCircle,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineBriefcase,
  HiOutlineInformationCircle,
} from 'react-icons/hi2';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';

function Footer() {
  return (
    <footer className="px-8 py-6 text-gray-400 bg-gray-900">
      <div className="flex flex-col items-center justify-between mx-auto max-w-7xl md:flex-row">
        {/* Left Section - Logo & Language Dropdown */}
        <div className="flex items-center gap-4">
          <div className="flex items-center text-lg font-bold text-white">
            <img src={image} alt="Logo" className="w-8 h-8" />
            <span className="ml-2">
              Digital <br /> ROSCA
            </span>
          </div>
        </div>

        {/* Center Section - Navigation Links with Icons */}
        <ul className="hidden space-x-6 text-sm md:flex">
          <li className="flex items-center gap-1">
            <HiOutlineGlobeAlt />
            <a href="#" className="hover:text-white">
              Pricing
            </a>
          </li>
          <li className="flex items-center gap-1">
            <HiOutlineInformationCircle />
            <a href="#" className="hover:text-white">
              About us
            </a>
          </li>
          <li className="flex items-center gap-1">
            <HiOutlineCog6Tooth />
            <a href="#" className="hover:text-white">
              Features
            </a>
          </li>
          <li className="flex items-center gap-1">
            <HiOutlineQuestionMarkCircle />
            <a href="#" className="hover:text-white">
              Help Center
            </a>
          </li>
          <li className="flex items-center gap-1">
            <HiMiniEnvelope />
            <a href="#" className="hover:text-white">
              Contact us
            </a>
          </li>
          <li className="flex items-center gap-1">
            <HiOutlineChatBubbleBottomCenterText />
            <a href="#" className="hover:text-white">
              FAQs
            </a>
          </li>
          <li className="flex items-center gap-1">
            <HiOutlineBriefcase />
            <a href="#" className="hover:text-white">
              Careers
            </a>
          </li>
        </ul>
      </div>

      {/* Bottom Section - Divider, Copyright & Social Icons */}
      <div className="my-4 border-t border-gray-700"></div>
      <div className="flex flex-col items-center justify-between mx-auto text-sm max-w-7xl md:flex-row">
        <p>
          © 2025 Brand, Inc. •{' '}
          <a href="#" className="hover:text-white">
            Privacy
          </a>{' '}
          •{' '}
          <a href="#" className="hover:text-white">
            Terms
          </a>{' '}
          •{' '}
          <a href="#" className="hover:text-white">
            Sitemap
          </a>
        </p>

        {/* Social Icons */}
        <div className="flex mt-3 space-x-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">
            <HiOutlineUserGroup />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <HiOutlineGlobeAlt />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <HiMiniEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
