import React, { useEffect, useState } from "react";

const Lists = ({ data }) => {
  const [isLastYear, setIsLastYear] = useState(false);
  const [topResults, setTopResults] = useState([]);
  const [displayedData, setDisplayedData] = useState(data);
  
  useEffect(() => {
    const updatedData = isLastYear ? filterByLastYear(data) : data;
    setDisplayedData(updatedData);
  }, [isLastYear, data]);
  
  const filterByLastYear = (data) => {
    const currentYear = new Date().getFullYear();
    const lastYearTops = data.filter(
      (item) => new Date(item.ts).getFullYear() == currentYear
    );
    return lastYearTops;
  };

  const toggleFilter = () => {
    setIsLastYear(!isLastYear);
    console.log(isLastYear);
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
const handleToplistClick = (key) => {
  const results = toplist(key, displayedData);
  console.log("Toplist Results:", results);
  setTopResults(results);
  console.log(displayedData);
};
  return (
    <div>
       <button onClick={toggleFilter}>  
        {isLastYear ? "Show All Data" : "Show Last Year's Data"}  
      </button>  
      <div>
        <div>
          <button
            onClick={() => handleToplistClick("master_metadata_track_name")}
          >
            Test Tracks
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleToplistClick("master_metadata_album_artist_name")
            }
          >
            Test Artists
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleToplistClick("master_metadata_album_album_name")
            }
          >
            Test Albums
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-red-500">Top Results:</h3>
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
