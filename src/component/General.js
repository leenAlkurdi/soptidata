import React from "react";
import { FaRegClock, FaPlay, FaClock, FaHourglassHalf, FaCalendarAlt, FaListUl } from 'react-icons/fa';

const General = ({ data, totalPlays, nonSkippedSongs, timeSpent, calculateTracks, seasonInYear }) => {
  
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
    <div >
      {data.length > 0 ? (
        <>
          <div >
            <h3 >
              <FaRegClock  />
              Avg Time Listening
              <strong >
                {dailyAvgTimeListening()} min
              </strong>
            </h3>
          </div>

          <div >
            <h3 >
              <FaPlay />
              Total Plays
              <strong >
                {totalPlays}
              </strong>
            </h3>
          </div>

          <div >
            <h3 >
              <FaClock  />
              Hour Most Listening
              <strong >
                {hourMostListening()}
              </strong>
            </h3>
          </div>

          <div >
            <h3 >
              <FaHourglassHalf  />
              Total Time Spent
              <strong >
                {timeSpent(data)} days
              </strong>
            </h3>
          </div>

          <div>
            <h3 >
              <FaCalendarAlt  />
              Most Listening Season
              <strong >
                {seasonInYear(data)}
              </strong>
            </h3>
          </div>

          <div>
            <h3 >
              <FaListUl  />
              Total Tracks
              <strong >
                {calculateTracks(data)}
              </strong>
            </h3>
          </div>
        </>
      ) : (
        <div >No data available</div>
      )}
    </div>
  );
};

export default General;