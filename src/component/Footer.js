import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5 w-full left-0 bottom-0 ">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Spotify. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mb-4 flex-wrap">
          <a href="" className="hover:underline">About Us</a>
          <a href="" className="hover:underline">Contact Us</a>
          <a href="" className="hover:underline">Privacy Policy</a>
          <a href="" className="hover:underline">Terms of Service</a>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-xl hover:text-blue-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-xl hover:text-blue-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-xl hover:text-pink-500" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;