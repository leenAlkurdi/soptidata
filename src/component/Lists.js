import React, { useEffect, useState } from "react";

const Lists = ({ data }) => {
  const [isLastYear, setIsLastYear] = useState(false);
  const [topResults, setTopResults] = useState([]);
  const [displayedData, setDisplayedData] = useState(data);
  const [visibleItems, setVisibleItems] = useState(10);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const updatedData = isLastYear ? filterByLastYear(data) : data;
    setDisplayedData(updatedData);

  }, [isLastYear, data]);

  useEffect(() => {
    if (displayedData.length > 0) {
      handleToplistClick("master_metadata_track_name");
    }
  }, [displayedData]);

  const filterByLastYear = (data) => {
    const currentYear = new Date().getFullYear();
    const lastYearTops = data.filter(
      (item) => new Date(item.ts).getFullYear() === currentYear
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
    setVisibleItems(10);
    console.log(displayedData);
    setActiveButton(key);
  };
  const handleReadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  return (
    <div >
      <h1 className="text-3xl font-bold text-center mb-6 text-[#0e5c2a]">Top</h1>

      <div >
        <button onClick={toggleFilter}  className="text-[#0e5c2a]  py-2 px-4 text-xl font-bold shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer">
          {isLastYear ? "Show All Data" : "Show Last Year's Data"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 m-10 items-center">
        <button
          className={`${activeButton === "master_metadata_track_name"
            ? "bg-[#0e5c2a] text-white"
            : "bg-gray-400 text-black"
            } py-2 px-4 text-xl rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer`}
          onClick={() => handleToplistClick("master_metadata_track_name")}
        >
          Tracks name
        </button>

        <button
          className={`${activeButton === "master_metadata_album_artist_name"
            ? "bg-[#0e5c2a] text-white"
            : "bg-gray-400 text-black"
            } py-2 px-4 text-xl rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer`}
          onClick={() => handleToplistClick("master_metadata_album_artist_name")}
        >
          Artists name
        </button>

        <button
          className={`${activeButton === "master_metadata_album_album_name"
            ? "bg-[#0e5c2a] text-white"
            : "bg-gray-400 text-black"
            } py-2 px-4 text-xl rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer`}
          onClick={() => handleToplistClick("master_metadata_album_album_name")}
        >
          Albums name
        </button>
      </div>
      <div>
        <ul>
          {topResults.slice(0, visibleItems).map((item, index) => (
            <li
              key={index}
              className="flex justify-center items-center block p-6 m-6 border border-gray-300  bg-gray-600 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-gray-600 dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              <h5 className="text-2xl font-bold text-gray-800 text-white m-3 hover:text-green-400 transition duration-200 cursor-pointer">
                {item.name}
              </h5>
            </li>
          ))}
        </ul>
        {visibleItems < topResults.length && (
          <button
            className="bg-[#0e5c2a] text-white py-2 px-4 text-xl rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer"
            onClick={handleReadMore}
          >
            Read More
          </button>
        )}
      </div>
    </div>
  );
};

export default Lists;