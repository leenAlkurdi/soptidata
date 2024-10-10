import React from "react";

const ArtistDetails = ({ artistData, songs, allArtists, onBack }) => {
  const artistPlays = artistData.plays;
  const percentage = ((artistPlays * 100) / artistData.totalPlays).toFixed(2);

  const getUniqueTopSongs = (songs) => {
    const uniqueSongsMap = {};

    songs.forEach((song) => {
      const trackName = song.master_metadata_track_name;
      if (!uniqueSongsMap[trackName]) {
        uniqueSongsMap[trackName] = song;
      } else {
        uniqueSongsMap[trackName].ms_played += song.ms_played;
      }
    });

    const uniqueSongsArray = Object.values(uniqueSongsMap);
    uniqueSongsArray.sort((a, b) => b.ms_played - a.ms_played);

    return uniqueSongsArray.slice(0, 20);
  };

  const uniqueTopSongs = getUniqueTopSongs(songs);

  const calculateArtistPosition = (artistName) => {
    const artistPlaytime = new Map();

    allArtists.forEach((item) => {
      const name = item.master_metadata_album_artist_name;
      if (name) {
        artistPlaytime.set(
          name,
          (artistPlaytime.get(name) || 0) + item.ms_played
        );
      }
    });

    const finalTop = Array.from(artistPlaytime, ([name, playtime]) => ({
      name,
      playtime,
    }))
      .sort((a, b) => b.playtime - a.playtime)
      .slice(0, 100);

    const rank = finalTop.findIndex((e) => e.name === artistName);
    return rank !== -1 ? rank + 1 : null;
  };

  const artistPosition = calculateArtistPosition(artistData.name);

  return (
    <div className="bg-white rounded-lg shadow-md m-4 p-4 w-full md:w-72 lg:w-96">
      <h2 className="text-xl font-semibold">Artist: {artistData.name}</h2>
      <p className="text-gray-700">Total Plays: {artistPlays}</p>
      <p className="text-gray-700">Percentage of Total Plays: {percentage}%</p>
      <p className="text-gray-700">
        Total Time Spent: {artistData.timeSpent} days
      </p>
      <p className="text-gray-700">Total Tracks: {artistData.totalTracks}</p>
      <p className="text-gray-700">
        Most Listening Season: {artistData.season}
      </p>
      <p className="text-gray-700">
        Position in Top 100 Artists:{" "}
        {artistPosition ? artistPosition : "Not in Top 100"}
      </p>

      <h3 className="text-lg font-semibold mt-4">
        Top 20 Unique Songs by Listening Time:
      </h3>
      <ul className="list-disc pl-5 text-gray-700">
        {uniqueTopSongs.length > 0 ? (
          uniqueTopSongs.map((song, index) => (
            <li key={index}>
              {song.master_metadata_track_name} -{" "}
              {Math.round(song.ms_played / 60000)} min
            </li>
          ))
        ) : (
          <li>No tracks found.</li>
        )}
      </ul>

      <button className="mt-2 text-blue-500" onClick={onBack}>
        Back to Artist List
      </button>
    </div>
  );
};

export default ArtistDetails;