import React, { useEffect, useState } from "react";

const General = ({ data }) => {
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

    return dayCount > 0 ? totalListeningTime / 60000 / dayCount : 0;
  };

  const hourMostListening = (data) => {
    const hourListening = [];
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

  const TimeSpent = (data) => {
    let timespent = 0;
    for (let i = 0; i < data.length; i++) {
      timespent += data[i].ms_played;
    }
    let finaltimespent = Math.floor(timespent / 86400000);
    return finaltimespent;
  };

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
