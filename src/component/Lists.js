import React, { useEffect, useState } from "react";

const Lists = ({ data }) => {
  const [isLastYear, setIsLastYear] = useState(false);
  const [topResults, setTopResults] = useState([]);

  const filterByLastYear = (data) => {
    //  return data.filter((item) => item.ts.split("T")[0].split("-")[0] ==new Date().getFullYear())
    const currentYear = new Date().getFullYear();
    const lastYearTops = data.filter(
      (item) => item.ts.split("T")[0].split("-")[0] == currentYear
    );
    return lastYearTops;
  };

  const toggleFilter = () => {
    setIsLastYear((prev) => !prev);
  };

  const toplist = (x, data) => {
    let item = data.map((e) => e[x]);
    let nodup = item.filter(
      (value, index) => item.indexOf(value) === index && value !== null
    );
    let finalplaytime = [];
    nodup.forEach((e) => {
      finalplaytime.push({
        name: e,
        playtime: 0,
      });
    });
    finalplaytime.map((e) =>
      data.map((item) =>
        e.name === item[x] ? (e.playtime += item.ms_played) : null
      )
    );
    finalplaytime.sort((a, b) => b.playtime - a.playtime);
    let finaltop = finalplaytime.slice(0, 100);
    return finaltop;
  };

  // const toplist = (key, data) => {
  //   const playtimeArray = [];

  //   data.forEach((item) => {
  //     const value = item[key];

  //     if (value) {
  //       const existing = playtimeArray.find((entry) => entry.name === value);
  //       if (existing) {
  //         existing.playtime += item.ms_played;
  //       } else {
  //         playtimeArray.push({ name: value, playtime: item.ms_played });
  //       }
  //     }
  //   });

  //   const finalTop = playtimeArray
  //     .sort((a, b) => b.playtime - a.playtime)
  //     .slice(0, 100);

  //   return finalTop;
  // };

  const displayedData = isLastYear ? filterByLastYear(data) : data;

  const handleToplistClick = (key) => {
    const results = toplist(key, displayedData);
    setTopResults(results);
  };

  return (
    <div>
      <button onClick={toggleFilter}>
        {isLastYear ? "Show All Data" : "Show Last Year's Data"}
      </button>
      <div>
        <button
          onClick={() => handleToplistClick("master_metadata_track_name")}>
          Test Tracks
        </button>
        <button
          onClick={() =>
            handleToplistClick("master_metadata_album_artist_name")
          }>
          Test Artists
        </button>
        <button
          onClick={() =>
            handleToplistClick("master_metadata_album_album_name")
          }>
          Test Albums
        </button>
      </div>
      <div>
        <h3>Top Results:</h3>
        <ul>
          {topResults.map((item, index) => (
            <li key={index}>
              {item.name}: {item.playtime} ms
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lists;
