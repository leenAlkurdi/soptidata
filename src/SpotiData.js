import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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

  const calculateTraks = (data) => {
    let songs = getSongs(data);
    let traksName = songs.map((song) => {
      return song.master_metadata_track_name;
    });
    let uniqueSongs = [...new Set(traksName)];
    return uniqueSongs.length;
  };

  const totalPlays = calculatePlays(data);

  const TimeSpent = (data) => {
    let timespent = 0;
    for (let i = 0; i < data.length; i++) {
      timespent += data[i].ms_played;
    }
    let finaltimespent = Math.floor(timespent / 86400000);
    return finaltimespent;
  };

  const seasonInYear = (data) => {
    let winter = [];
    let spring = [];
    let summer = [];
    let automn = [];

    for (let i = 0; i < data.length; i++) {
      if (
        data[i].ts.slice(5, 7) === "12" ||
        data[i].ts.slice(5, 7) === "01" ||
        data[i].ts.slice(5, 7) === "02"
      ) {
        winter[i] = data[i];
      } else if (
        data[i].ts.slice(5, 7) === "03" ||
        data[i].ts.slice(5, 7) === "04" ||
        data[i].ts.slice(5, 7) === "05"
      ) {
        spring[i] = data[i];
      } else if (
        data[i].ts.slice(5, 7) === "06" ||
        data[i].ts.slice(5, 7) === "07" ||
        data[i].ts.slice(5, 7) === "08"
      ) {
        summer[i] = data[i];
      } else if (
        data[i].ts.slice(5, 7) === "09" ||
        data[i].ts.slice(5, 7) === "10" ||
        data[i].ts.slice(5, 7) === "11"
      ) {
        automn[i] = data[i];
      }
    }

    let winterListening = 0;
    let springListening = 0;
    let summerListening = 0;
    let automnListening = 0;

    winter.forEach((item) => {
      winterListening += item.ms_played;
    });
    spring.forEach((item) => {
      springListening += item.ms_played;
    });
    summer.forEach((item) => {
      summerListening += item.ms_played;
    });
    automn.forEach((item) => {
      automnListening += item.ms_played;
    });

    let seasonsListening = [
      winterListening,
      springListening,
      summerListening,
      automnListening,
    ];


    if (seasonsListening.indexOf(Math.max.apply(null, seasonsListening)) == 0) {
      return "Winter";
    } else if (
      seasonsListening.indexOf(Math.max.apply(null, seasonsListening)) == 1
    ) {
      return "Spring";
    } else if (
      seasonsListening.indexOf(Math.max.apply(null, seasonsListening)) == 2
    ) {
      return "Summer";
    } else if (
      seasonsListening.indexOf(Math.max.apply(null, seasonsListening)) == 3
    ) {
      return "Automn";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8 bg-[#E8F8ED] min-h-screen transition duration-300">
          <Routes>
            <Route
              path="/"
              element={
                <General
                  data={data}
                  calculateTraks={calculateTraks}
                  TimeSpent={TimeSpent}
                  totalPlays={totalPlays}
                  nonSkippedSongs={nonSkippedSongs}
                  calculatePlays={calculatePlays}
                  seasonInYear={seasonInYear}
                />
              }
            />
            <Route
              path="/artists"
              element={
                <Artist
                  data={data}
                  calculateTraks={calculateTraks}
                  TimeSpent={TimeSpent}
                  totalPlays={totalPlays}
                  calculatePlays={calculatePlays}
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
