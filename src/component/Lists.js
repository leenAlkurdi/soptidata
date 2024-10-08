import React, { useEffect, useState } from "react";  

const Lists = () => {  
  const [isLastYear, setIsLastYear] = useState(false);  
  const [data, setData] = useState([]);  
  
   
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

 
  const filterByLastYear = (data) => {
    //  return data.filter((item) => item.ts.split("T")[0].split("-")[0] ==new Date().getFullYear())
    const currentYear = new Date().getFullYear();
    const lastYearTops = data.filter(
      (item) => item.ts.split("T")[0].split("-")[0] == currentYear
    );
    return lastYearTops;
  };

  
  const topPlay = (data) => {  
    const singerPlaytime = data.reduce((acc, item) => {  
      const artist = item.master_metadata_album_artist_name;  
      if (artist) {  
        acc[artist] = (acc[artist] || 0) + item.ms_played;  
      }  
      return acc;  
    }, {});  
    const topArtists = Object.entries(singerPlaytime)  
      .map(([name, playtime]) => ({ name, playtime }))  
      .sort((a, b) => b.playtime - a.playtime)  
      .slice(0, 100);   

    console.log(topArtists);  
    return topArtists; 
  };  

 
  const toggleFilter = () => {  
    setIsLastYear((prev) => !prev);  
  };  

  
  useEffect(() => {  
    getData();  
  }, []);  

  const displayedData = isLastYear ? filterByLastYear(data) : data;  
  const topArtists = topPlay(displayedData);  

  return (  
    <div>  
      <button onClick={toggleFilter}>  
        {isLastYear ? "Show All Data" : "Show Last Year's Data"}  
      </button>  
      <ul>  
        {topArtists.map((artist) => (  
          <li key={artist.name}>  
            {artist.name}: {artist.playtime} ms  
          </li>  
        ))}  
      </ul>  
    </div>  
  );  
};  

export default Lists;