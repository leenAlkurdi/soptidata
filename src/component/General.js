import React, { useEffect, useState } from "react";
import { FaMusic,FaRegClock,FaPlay,FaClock,FaHourglassHalf,FaCalendarAlt,FaListUl   } from 'react-icons/fa';
const General = ({ data,totalPlays,nonSkippedSongs,TimeSpent,calculateTraks,seasonInYear}) => {

  
  const dailyAvgTimeListening = (data) => {
    const songsList = nonSkippedSongs(data);
    let dailyListening = [];

    songsList.forEach((song) => {
      let date = new Date(song.ts);
      date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;

      const existingEntry = dailyListening.find((entry) => entry.date === date);
      if (existingEntry) {
        existingEntry.totalTime += song.ms_played;
      } else {
        dailyListening.push({ date: date, totalTime: song.ms_played });
      }
    });

    let totalListeningTime = 0;
    let dayCount = dailyListening.length;

    for (const entry of dailyListening) {
      totalListeningTime += entry.totalTime;
    }
  
    return dayCount > 0 ? (totalListeningTime / 60000 / dayCount).toFixed(2) : 0;
  };

  const hourMostListening = (data) => {
    let hourListening = [];
    data.forEach((item) => {
      let hour = new Date(item.ts);
      hour = hour.getHours();
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-screen p-10 m-10">
      {data.length > 0 ? (
        <div className="flex justify-center items-center block p-6 m-6 border border-gray-300 rounded-lg hover:shadow-[20px_20px_15px_rgba(0,0,0,0.3)] transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800">
          <h3 className='flex flex-col items-center m-5 text-2xl font-bold tracking-tight text-white'>
          <FaRegClock className='m-5 text-[#1DB954] text-4xl'/>
            Avg Time Listening
            <strong className='text-3xl font-bold text-gray-700 dark:text-gray-400 m-3'>
              {dailyAvgTimeListening(data)} min
            </strong>
            </h3>
        </div>
      ) : (
        <div>No data available</div>
      )}
        <div className="flex justify-center items-center block p-6 m-6 border border-gray-300 rounded-lg hover:shadow-[20px_20px_15px_rgba(0,0,0,0.3)] transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800">
        <h3 className='flex flex-col m-5 items-center text-2xl font-bold tracking-tight text-white'>
      <FaPlay className='m-5 text-[#1DB954] text-4xl'/>
    Total Plays 
    <strong className='text-3xl font-bold text-gray-700 dark:text-gray-400 m-3'>
      {totalPlays}
    </strong>
  </h3>
</div>

      {/* <p>Total Plays: {totalPlays}</p>  */}

      {/* <p>Most Listening Hour: {hourMostListening(data)}</p> */}
      <div className="flex justify-center items-center block p-6 m-6 border border-gray-300 rounded-lg hover:shadow-[20px_20px_15px_rgba(0,0,0,0.3)] transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800">
      <h3 className='flex flex-col items-center m-5 text-2xl font-bold tracking-tight text-white'>
        <FaClock className='m-5 text-[#1DB954] text-4xl'/>
          Hour most listening 
            <strong className='text-3xl font-bold text-gray-700 dark:text-gray-400 m-3'>
            {hourMostListening(data)}
            </strong>
            </h3>
        </div>
      {/* <p>Total Time Spent: {TimeSpent(data)} days</p> */}
      <div className='flex justify-center items-center block p-6 m-6  border border-gray-300 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800'>
      <h3 className='flex flex-col items-center m-5 text-2xl font-bold tracking-tight text-white'>
        <FaHourglassHalf className='m-5 text-[#1DB954] text-4xl'/>
            Total Time Spent
            <strong className='text-3xl font-bold text-gray-700 dark:text-gray-400 m-3'>
            {TimeSpent(data)} days
            </strong>
            </h3>
        </div>

      {/* <p>Most Listening Season: {seasonInYear(data)}</p> */}
      <div className='flex justify-center items-center block p-6 m-6  border border-gray-300 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800'>
      <h3 className='flex flex-col items-center m-5 text-2xl font-bold tracking-tight text-white'>
        <FaCalendarAlt className='m-5 text-[#1DB954] text-4xl'/>
          Most Listening Season
            <strong className='text-3xl font-bold text-gray-700 dark:text-gray-400 m-3'>
            {seasonInYear(data)}
            </strong>
            </h3>
        </div>
      {/* <p>Total Traks: {calculateTraks(data)}</p> */}
      <div className='flex justify-center items-center block p-6 m-6  border border-gray-300 rounded-lg shadow transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-800'>
      <h3 className='flex flex-col items-center m-5 text-2xl font-bold tracking-tight text-white'>
        <FaListUl className='m-5 text-[#1DB954] text-4xl'/>
          Total Traks
            <strong className='text-3xl font-bold text-gray-700 dark:text-gray-400 m-3'>
            {calculateTraks(data)}
            </strong>
            </h3>
        </div>
    </div>
  );
};

export default General;








// <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {data.length > 0 ? (
//         <>
//           <div className='block p-6 bg-green-500 border border-gray-300 rounded-lg shadow hover:bg-green-600 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600'>
//             <h3 className='flex flex-col items-center m-2 text-2xl font-bold tracking-tight text-white'>
//               <FaMusic className='m-2 text-white text-4xl' />
//               Avg Time Listening
//               <strong className='text-3xl font-bold'>
//                 {dailyAvgTimeListening(data)} min
//               </strong>
//             </h3>
//           </div>

//           <div className='block p-6 bg-blue-500 border border-gray-300 rounded-lg shadow hover:bg-blue-600 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600'>
//             <h3 className='flex flex-col items-center m-2 text-2xl font-bold tracking-tight text-white'>
//               <FaMusic className='m-2 text-white text-4xl' />
//               Total Plays 
//               <strong className='text-3xl font-bold'>
//                 {totalPlays}
//               </strong>
//             </h3>
//           </div>