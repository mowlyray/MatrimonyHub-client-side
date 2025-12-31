import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.png';
import facebookimg from '../assets/facebook.png';
import githubimg from '../assets/github.png';
import linkdinimg from '../assets/linkedIn.png';

const Footer = () => {
  return (
    <footer className="bg-[#FCE4EC] text-[#880E4F] py-10 px-6 border-t border-[#F8BBD0]">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center mb-4">
            <img src={logo} alt="logo" className="w-16" />
            <Link to="/" className="text-2xl font-bold text-[#C2185B] ml-2">
              Matrimony<span className="text-[#AD1457]">Hub</span>
            </Link>
          </div>
          <p className="text-sm leading-relaxed text-[#C2185B]">
            MatrimonyHub is your trusted companion in the journey of love and togetherness.  
            Explore verified biodatas and find a partner who resonates with your dreams and values.
          </p>
        </div>

        {/* Useful Links */}
        <div className="md:ml-10">
          <h3 className="text-lg font-semibold mb-3 text-[#AD1457]">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#C2185B]">Home</Link></li>
            <li><Link to="/biodatas" className="hover:text-[#C2185B]">Biodatas</Link></li>
            <li><Link to="/about" className="hover:text-[#C2185B]">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#C2185B]">Contact Us</Link></li>
            <li><Link to="/dashboard" className="hover:text-[#C2185B]">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:ml-10">
          <h3 className="text-lg font-semibold mb-3 text-[#AD1457]">Contact Info</h3>
          <p className="text-sm">Email: support@matrimonyhub.com</p>
          <p className="text-sm">Phone: +880 1234-567890</p>
          <p className="text-sm">Address: Dhaka, Bangladesh</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookimg} alt="Facebook" className="w-6 h-6 hover:scale-110 transition duration-300" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <img src={githubimg} alt="GitHub" className="w-6 h-6 hover:scale-110 transition duration-300" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={linkdinimg} alt="LinkedIn" className="w-6 h-6 hover:scale-110 transition duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-[#C2185B] mt-10">
        © {new Date().getFullYear()} MatrimonyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
