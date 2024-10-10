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
      (item) => new Date(item.ts).getFullYear() === currentYear
    );
    return lastYearTops;
  };

  const toggleFilter = () => {
    setIsLastYear(!isLastYear);
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
  setTopResults(results);
};
  return (
    <div>
      {/* <button onClick={toggleFilter}>  
        {isLastYear ? "Show All Data" : "Show Last Year's Data"}  
      </button>   */}
      <div className="flex flex-wrap justify-evenly mb-12">
        <div>
          <button className="font-bold w-[150px] h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)] hover:text-white text-xl"
            onClick={() => handleToplistClick("master_metadata_track_name")}
          >
            Top Tracks
          </button>
        </div>
        <div>
          <button className="font-bold w-[150px] h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)] hover:text-white text-xl"
            onClick={() =>
              handleToplistClick("master_metadata_album_artist_name")
            }
          >
            Top Artists
          </button>
        </div>
        <div>
          <button className="font-bold w-[150px] h-[60px] rounded-3xl transition ease-in-out hover:-translate-y-3 hover:scale-110 hover:bg-[#0e5c2a] hover:shadow-[0_10px_10px_3px_rgba(0,0,0,0.3)] hover:text-white text-xl"
            onClick={() =>
              handleToplistClick("master_metadata_album_album_name")
            }
          >
            Top Albums
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly ">
        <h3 className="text-[#0e5c2a] mb-4 ">Top Results:</h3>
        <ul className="flex flex-wrap justify-evenly">
          {topResults.map((item, index) => (
            <li key={index} className="bg-white rounded-lg shadow-md m-4 p-4 w-60 cursor-pointer hover:shadow-lg transition hover:shadow-[15px_15px_15px_rgba(0,0,0,0.2)] transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-200">
              {item.name}: {item.playtime} ms
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lists;
