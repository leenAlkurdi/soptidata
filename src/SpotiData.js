import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import General from "./component/General";
import Artist from "./component/Artist";
import Lists from "./component/Lists";
import Footer from "./component/Footer";
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

  const getSongs = (data) => {
    return data.filter((song) => song.episode_name === null);
  };

  const getPodcasts = (data) => {
    return data.filter((podcast) => podcast.episode_name !== null);
  };

  const nonSkippedSongs = (data) => {
    return getSongs(data).filter(
      (song) => song.skipped === null || song.skipped === false
    );
  };

  const calculatePlays = (data) => {
    return data.length;
  };

  const calculateTracks = (data) => {
    let songs = getSongs(data);
    let trackNames = songs.map((song) => song.master_metadata_track_name);
    let uniqueSongs = [...new Set(trackNames)];
    return uniqueSongs.length;
  };

  const totalPlays = calculatePlays(data);

  const timeSpent = (data) => {
    let totalSpent = data.reduce((acc, song) => acc + song.ms_played, 0);
    return Math.floor(totalSpent / 86400000); // Convert milliseconds to days
  };

  const seasonInYear = (data) => {
    const seasons = { winter: 0, spring: 0, summer: 0, autumn: 0 };

    data.forEach((item) => {
      const month = item.ts.slice(5, 7);
      if (["12", "01", "02"].includes(month)) {
        seasons.winter += item.ms_played;
      } else if (["03", "04", "05"].includes(month)) {
        seasons.spring += item.ms_played;
      } else if (["06", "07", "08"].includes(month)) {
        seasons.summer += item.ms_played;
      } else if (["09", "10", "11"].includes(month)) {
        seasons.autumn += item.ms_played;
      }
    });

    return Object.keys(seasons).reduce((a, b) => (seasons[a] > seasons[b] ? a : b));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8 bg-purple-50 min-h-screen transition duration-300">
          <Routes>
          <Route path="/" element={<Navigate to="/general" />} /> 
            <Route
              path="/general"
              element={
                <General
                  data={data}
                  calculateTracks={calculateTracks}
                  timeSpent={timeSpent}
                  totalPlays={totalPlays}
                  nonSkippedSongs={nonSkippedSongs}
                  seasonInYear={seasonInYear}
                />
              }
            />
            <Route
              path="/artists"
              element={
                <Artist
                  data={data}
                  calculateTracks={calculateTracks}
                  timeSpent={timeSpent}
                  totalPlays={totalPlays}
                  seasonInYear={seasonInYear}
                />
              }
            />
            <Route
              path="/podcasts"
              element={<Podcast data={data} getPodcasts={getPodcasts} />}
            />
            <Route
              path="/lists"
              element={<Lists data={data} nonSkippedSongs={nonSkippedSongs} />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SpotiData;