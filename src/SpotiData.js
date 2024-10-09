import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import General from "./component/General";
import Artist from "./component/Artist";
import Lists from "./component/Lists";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Podcast from "./component/Podcast";

const SpotiData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      fetch("/spotify_data.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8 bg-purple-50 min-h-screen transition duration-300">
          <Routes>
            <Route path="/" element={<General data={data} />} />
            <Route path="/artists" element={<Artist data={data} />} />
            <Route path="/podcasts" element={<Podcast data={data} />} />
            <Route path="/lists" element={<Lists data={data} />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SpotiData;