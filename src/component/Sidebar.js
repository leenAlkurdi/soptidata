import { FaSpotify } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="shadow-[-5px_0_10px_10px_inset_rgba(0,0,0,0.2)] bg-[#4ac776] text-gray-800 h-screen shadow-2xl w-1/4 rounded-tr-2xl ">
      <h2 className="font-bold mt-8 mb-20 ml-10 text-[#0e5c2a]">
        <FaSpotify className="text-5xl transition ease-in-out hover:-translate-y-1 hover:scale-150" />
        <p className="mt-12 text-white text-3xl ">Details for user</p>
        {/* <p className="border-t-2 w-44"></p> */}
      </h2>
      <ul className="space-y-8 text-center">
        <li>
          <button className="font-bold w-[150px] h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)]">
            <Link to="/" className="text-2xl text-white hover:text-white">
              General
            </Link>
          </button>
        </li>
        <li>
          <button className="font-bold w-[150px] h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)]">
            <Link
              to="/artists"
              className="text-2xl text-white hover:text-white"
            >
              Artists
            </Link>
          </button>
        </li>
        <li>
          <button className="font-bold w-[150px] h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)]">
            <Link
              to="/podcasts"
              className="text-2xl text-white hover:text-white"
            >
              Podcasts
            </Link>
          </button>
        </li>
        <li>
          <button className="font-bold w-[150px] h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)]">
            <Link to="/lists" className="text-2xl text-white hover:text-white">
              Tops
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
