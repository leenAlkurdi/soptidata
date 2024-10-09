import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-purple-200 text-gray-800 h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-8 text-center text-purple-600">
        Sidebar
      </h2>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            General
          </Link>
        </li>
        <li>
          <Link to="/artists" className="text-blue-600 hover:text-blue-800">
            Artists
          </Link>
        </li>
        <li>
          <Link to="/podcasts" className="text-blue-600 hover:text-blue-800">
            Podcasts
          </Link>
        </li>
        <li>
          <Link to="/lists" className="text-blue-600 hover:text-blue-800">
            Tops
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;