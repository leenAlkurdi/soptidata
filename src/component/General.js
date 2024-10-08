import React, { useEffect, useState } from "react";

const General = () => {
  const [data, setData] = useState([]);

  let test = [
    {
      _id: { $oid: "65b0306e4146088749465e39" },
      ts: "2020-06-01T15:02:59Z",
      ms_played: 224718,
      master_metadata_track_name: "Antidote",
      master_metadata_album_artist_name: "Travis Scott",
      master_metadata_album_album_name: "Rodeo",
      episode_name: null,
      episode_show_name: null,
      reason_start: "clickrow",
      reason_end: "fwdbtn",
      shuffle: true,
      skipped: null,
    },
    {
      _id: { $oid: "65b0306e4146088749465e3a" },
      ts: "2020-06-01T15:05:41Z",
      ms_played: 163053,
      master_metadata_track_name: "Rozzi",
      master_metadata_album_artist_name: "Paky",
      master_metadata_album_album_name: "Rozzi",
      episode_name: null,
      episode_show_name: null,
      reason_start: "fwdbtn",
      reason_end: "trackdone",
      shuffle: true,
      skipped: null,
    },
  ];

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

  const getSongs = (data) => {
    return data.filter((song) => song.episode_name == null);
  };

  const getPodcasts = (data) => {
    return data.filter((podcast) => podcast.episode_name !== null);
  };

  const nonSkippedSongs = (data) => {
    return getSongs(data).filter((song) => song.skipped === null);
  };

  const dailyAvgTimeListening = (data) => {
    const songsList = nonSkippedSongs(data);
    const dailyListening = {};

    songsList.forEach((song) => {
      const date = song.ts.split("T")[0];
      if (!dailyListening[date]) {
        dailyListening[date] = 0;
      }
      dailyListening[date] += song.ms_played;
    });

    let totalListeningTime = 0;
    let dayCount = 0;

    for (const date in dailyListening) {
      totalListeningTime += dailyListening[date];
      dayCount += 1;
    }

    return dayCount > 0 ? (totalListeningTime / 60000) / dayCount : 0;
  };

  
  const hourMostListening = (data) => {  
    const hourListening = [];  
    data.forEach((item) => {  
      let hour = new Date(item.ts)
      hour=hour.getHours()
      const existingHour = hourListening.find(h => h.hour === hour);  
      if (existingHour) {  
        existingHour.totalTime += item.ms_played;  
      } else {  
        hourListening.push({ hour, totalTime: item.ms_played }); 
      }  
    });    
    hourListening.sort((a, b) => b.totalTime - a.totalTime);   
    return hourListening.length > 0 ? hourListening[0].hour : null;  
  }; 

  const TimeSpent =(data) =>{
    let timespent = 0
    for( let i = 0; i < data.length; i++ ){
      timespent += data[i].ms_played
    }
    let finaltimespent = Math.floor(timespent/86400000)
    return finaltimespent
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <div>{dailyAvgTimeListening(data)} min</div>
      ) : (
        <div>No data available</div>
      )}
      {hourMostListening(data)}
      <p>{TimeSpent(data)}</p>
    </div>
  );
};

export default General;
