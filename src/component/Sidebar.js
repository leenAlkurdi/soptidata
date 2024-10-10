import { FaSpotify } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="shadow-[-5px_0_10px_10px_inset_rgba(0,0,0,0.2)] bg-[#4ac776] text-gray-800 min-h-screen p-6 shadow-2xl w-full sm:w-1/4 md:w-1/7 lg:w-1/6 rounded-tr-2xl">
      <h2 className="font-bold mt-8 mb-20 ml-10 text-[#0e5c2a]">
        <FaSpotify className="text-3xl sm:text-4xl md:text-5xl transition ease-in-out hover:-translate-y-1 hover:scale-150" />
        <p className="mt-12 text-lg sm:text-lg text-white hover:text-white text-white mb-2">
          Details for user
        </p>
      </h2>
      <ul className="space-y-8 text-left text-center">
        <li>
          <button className="font-bold w-[100px] sm:w-[120px] md:w-[150px] h-[40px] sm:h-[50px] md:h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)]">
            <Link to="/" className="text-sm sm:text-lg text-white hover:text-white">
              General
            </Link>
          </button>
        </li>
        <li>
          <button className="font-bold w-[100px] sm:w-[120px] md:w-[150px] h-[40px] sm:h-[50px] md:h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)]">
            <Link to="/artists" className="text-sm sm:text-lg text-white hover:text-white">
              Artists
            </Link>
          </button>
        </li>
        <li>
          <button className="font-bold w-[100px] sm:w-[120px] md:w-[150px] h-[40px] sm:h-[50px] md:h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)]">
            <Link to="/podcasts" className="text-sm sm:text-lg text-white hover:text-white">
              Podcasts
            </Link>
          </button>
        </li>
        <li>
          <button className="font-bold w-[100px] sm:w-[120px] md:w-[150px] h-[40px] sm:h-[50px] md:h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)]">
            <Link to="/lists" className="text-sm sm:text-lg text-white hover:text-white">
              Tops
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
