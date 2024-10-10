import { FaSpotify } from "react-icons/fa";  
import React from "react";  
import { Link } from "react-router-dom";  

const Sidebar = () => {  
  return (
    <div className="shadow-lg bg-gradient-to-b from-green-500 to-green-700 text-gray-800 h-screen p-6 rounded-tr-2xl w-full sm:w-1/4 md:w-1/5 lg:w-1/6">
      <h2 className="font-semibold mt-8 mb-10 text-white text-3xl text-center">
        <FaSpotify className="text-6xl mb-2 transition ease-in-out hover:-translate-y-1 hover:scale-110" />
        Details for User
      </h2>
      <ul className="space-y-6">
        {['General', 'Artists', 'Podcasts', 'Lists'].map((item, index) => (
          <li key={index} className="flex justify-center">
            <Link to={`/${item.toLowerCase()}`} className="w-full">
              <button
                className="font-semibold w-full h-[60px] rounded-full bg-[#0e5c2a] transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg shadow-md focus:outline-none"
              >
                <span className="text-xl text-white">{item}</span>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};  

export default Sidebar;