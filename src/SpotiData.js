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

  const getSongs = (data) => {  
    return data.filter((song) => song.episode_name === null);  
  };  

  const getPodcasts = (data) => {  
    return data.filter((podcast) => podcast.episode_name !== null);  
  };  

  const nonSkippedSongs = (data) => {  
    return getSongs(data).filter((song) => song.skipped === null);  
  };  
  const calculatePlays = (data) => {  
    return getSongs(data).length;  
  }; 


  const calculateTraks=(data)=>{
    let songs=getSongs(data)
    let traksName=songs.map((song)=>{
      return song.master_metadata_track_name
    })
    let uniqueSongs=[...new Set(traksName)]
    return uniqueSongs.length
  } 


  const totalPlays = calculatePlays(data); 

 

  const TimeSpent = (data) => {
    let timespent = 0;
    for (let i = 0; i < data.length; i++) {
      timespent += data[i].ms_played;
    }
    let finaltimespent = Math.floor(timespent / 86400000);
    return finaltimespent;
  };

  return (  
    <div className="flex flex-col min-h-screen">  
      <Navbar />  
      <div className="flex flex-1">  
        <Sidebar />  
        <div className="flex-1 p-8 bg-purple-50 min-h-screen transition duration-300">  
          <Routes>  
            <Route   
              path="/"   
              element={<General data={data} calculateTraks={calculateTraks} TimeSpent={TimeSpent} totalPlays={totalPlays} nonSkippedSongs={nonSkippedSongs} calculatePlays={calculatePlays} />}   
            />  
            <Route   
              path="/artists"   
              element={<Artist data={data} TimeSpent={TimeSpent} totalPlays={totalPlays} calculatePlays={calculatePlays} />}   
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