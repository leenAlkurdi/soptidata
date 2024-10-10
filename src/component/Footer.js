import React from 'react';  
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';  

const Footer = () => {  
  return (
    <footer className="bg-green-700 text-white py-5">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} B4F. All rights reserved.</p>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
            <a href="#" className="hover:underline py-1 transition duration-200">About Us</a>
            <a href="#" className="hover:underline py-1 transition duration-200">Contact Us</a>
            <a href="#" className="hover:underline py-1 transition duration-200">Privacy Policy</a>
            <a href="#" className="hover:underline py-1 transition duration-200">Terms of Service</a>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition duration-200">
            <FaFacebook className="text-xl hover:text-blue-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition duration-200">
            <FaTwitter className="text-xl hover:text-blue-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition duration-200">
            <FaInstagram className="text-xl hover:text-pink-500" />
          </a>
        </div>
      </div>
    </footer>
  );
};  

export default Footer;