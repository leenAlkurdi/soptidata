import React, { useState } from "react";

const Artist = ({
  data,
  calculatePlays,
  totalPlays,
  TimeSpent,
  calculateTraks,
  seasonInYear,
}) => {
  const [search, setSearch] = useState("");

  const uniqueArtists = [ ...new Set(data.map((item) => item.master_metadata_album_artist_name)),];

  const filteredArtists = uniqueArtists.filter(
    (name) => name && name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Artists
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by artist name..."
          className="border rounded-lg p-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value || "")}
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredArtists.map((name) => {
          const currentArtistData = data.filter(
            (item) => item.master_metadata_album_artist_name === name
          );
          const artistPlays = calculatePlays(currentArtistData);
          const percentage = ((artistPlays * 100) / totalPlays).toFixed(2);
        
          return (
            <div
              key={name}
              className="bg-white rounded-lg shadow-md m-4 p-4 w-72"
            >
              <h2 className="text-xl font-semibold">Artist: {name}</h2>
              <p className="text-gray-700">Total Plays: {artistPlays}</p>
              <p className="text-gray-700">
                Percentage of Total Plays: {percentage}%
              </p>
              <p className="text-gray-700">
                Total Time Spent: {TimeSpent(currentArtistData)} days
              </p>
              <p className="text-gray-700">
                Total Tracks: {calculateTraks(currentArtistData)}
              </p>
              <p className="text-gray-700">
                Most Listening Season: {seasonInYear(currentArtistData)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Artist;
