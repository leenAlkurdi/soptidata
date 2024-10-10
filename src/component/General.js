import React from "react";
import { FaRegClock, FaPlay, FaClock, FaHourglassHalf, FaCalendarAlt, FaListUl } from 'react-icons/fa';

const General = ({ data, totalPlays, nonSkippedSongs, TimeSpent, calculateTraks, seasonInYear }) => {
  
  const dailyAvgTimeListening = () => {
    const songsList = nonSkippedSongs(data);
    const dailyListening = [];

    songsList.forEach((song) => {
      let date = new Date(song.ts);
      date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const existingEntry = dailyListening.find((entry) => entry.date === date);
      if (existingEntry) {
        existingEntry.totalTime += song.ms_played;
      } else {
        dailyListening.push({ date: date, totalTime: song.ms_played });
      }
    });

    const totalListeningTime = dailyListening.reduce((acc, entry) => acc + entry.totalTime, 0);
    return dailyListening.length > 0 ? (totalListeningTime / 60000 / dailyListening.length).toFixed(2) : 0;
  };

  const hourMostListening = () => {
    const hourListening = [];
    data.forEach((item) => {
      let hour = new Date(item.ts).getHours();
      const existingHour = hourListening.find((h) => h.hour === hour);
      if (existingHour) {
        existingHour.totalTime += item.ms_played;
      } else {
        hourListening.push({ hour, totalTime: item.ms_played });
      }
    });
    hourListening.sort((a, b) => b.totalTime - a.totalTime);
    return hourListening.length > 0 ? hourListening[0].hour : null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#0e5c2a]">General</h1>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-10 m-10 pb-24 min-h-screen">
        {data.length > 0 ? (
          <div className='flex justify-center items-center block p-6 m-6 border border-gray-300  bg-gray-600 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 '>
            <h3 className="flex flex-col items-center m-5 text-xl md:text-xl lg:text-2xl font-bold tracking-tight text-white">
              <FaRegClock className="m-5 text-[#1DB954] text-3xl md:text-4xl lg:text-5xl" />
              Avg Time Listening
              <strong className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400 dark:text-gray-400 m-3">
                {dailyAvgTimeListening(data)} min
              </strong>
            </h3>
          </div>
        ) : (
          <div>No data available</div>
        )}
        <div className='flex justify-center items-center block p-6 m-6 border border-gray-300  bg-gray-600 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer'>
          <h3 className="flex flex-col items-center m-5 text-xl md:text-xl lg:text-2xl font-bold tracking-tight text-white">
            <FaPlay className="m-5 text-[#1DB954] text-3xl md:text-4xl lg:text-5xl" />
            Total Plays
            <strong className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400 dark:text-gray-400 m-3">
              {totalPlays}
            </strong>
          </h3>
        </div>

        {/* <p>Total Plays: {totalPlays}</p>  */}

        {/* <p>Most Listening Hour: {hourMostListening(data)}</p> */}
        <div className='flex justify-center items-center block p-6 m-6 border border-gray-300  bg-gray-600 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer'>
          <h3 className="flex flex-col items-center m-5 text-xl md:text-xl lg:text-2xl font-bold tracking-tight text-white">
            <FaClock className="m-5 text-[#1DB954] text-3xl md:text-4xl lg:text-5xl" />
            Hour most listening
            <strong className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400 dark:text-gray-400 m-3">
              {hourMostListening(data)}
            </strong>
          </h3>
        </div>
        {/* <p>Total Time Spent: {TimeSpent(data)} days</p> */}
        <div className='flex justify-center items-center block p-6 m-6 border border-gray-300  bg-gray-600 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer'>
          <h3 className="flex flex-col items-center m-5 text-xl md:text-xl lg:text-2xl font-bold tracking-tight text-white">
            <FaHourglassHalf className="m-5 text-[#1DB954] text-3xl md:text-4xl lg:text-5xl" />
            Total Time Spent
            <strong className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400 dark:text-gray-400 m-3">
              {TimeSpent(data)} days
            </strong>
          </h3>
        </div>

        {/* <p>Most Listening Season: {seasonInYear(data)}</p> */}
        <div className='flex justify-center items-center block p-6 m-6 border border-gray-300  bg-gray-600 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer'>
          <h3 className="flex flex-col items-center m-5 text-xl md:text-xl lg:text-2xl font-bold tracking-tight text-white">
            <FaCalendarAlt className="m-5 text-[#1DB954] text-3xl md:text-4xl lg:text-5xl" />
            Most Listening Season
            <strong className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400 dark:text-gray-400 m-3">
              {seasonInYear(data)}
            </strong>
          </h3>
        </div>
        {/* <p>Total Traks: {calculateTraks(data)}</p> */}
        <div className='flex justify-center items-center block p-6 m-6 border border-gray-300  bg-gray-600 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer'>
          <h3 className="flex flex-col items-center m-5 text-xl md:text-xl lg:text-2xl font-bold tracking-tight text-white">
            <FaListUl className="m-5 text-[#1DB954] text-3xl md:text-4xl lg:text-5xl" />
            Total Traks
            <strong className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400 dark:text-gray-400 m-3">
              {calculateTraks(data)}
            </strong>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default General;








