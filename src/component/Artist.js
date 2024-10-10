import React, { useState } from "react";
import ArtistDetails from "./ArtistDetails";

const Artist = ({
  data,
  calculatePlays,
  totalPlays,
  TimeSpent,
  calculateTraks,
  seasonInYear,
}) => {
  const [search, setSearch] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);

  const uniqueArtists = [
    ...new Set(data.map((item) => item.master_metadata_album_artist_name)),
  ];

  const filteredArtists = uniqueArtists.filter(
    (name) => name && name.toLowerCase().includes(search.toLowerCase())
  );

  const handleArtistClick = (name) => {
    const currentArtistData = data.filter(
      (item) => item.master_metadata_album_artist_name === name
    );

    const artistInfo = {
      name,
      plays: calculatePlays(currentArtistData),
      totalPlays,
      timeSpent: TimeSpent(currentArtistData),
      totalTracks: calculateTraks(currentArtistData),
      season: seasonInYear(currentArtistData),
    };

    setSelectedArtist({ artistInfo, songs: currentArtistData });
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Artists</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by artist name..."
          className="border rounded-lg p-2 w-full shadow-md transition ease-in-out focus:shadow-[1px_1px_10px_5px_rgb(128,128,128)]"
          value={search}
          onChange={(e) => setSearch(e.target.value || "")}
        />
      </div>

      <div className="flex flex-wrap justify-evenly">
        {selectedArtist ? (
          <ArtistDetails
            artistData={selectedArtist.artistInfo}
            songs={selectedArtist.songs}
            allArtists={data}
            onBack={() => setSelectedArtist(null)}
          />
        ) : filteredArtists.length > 0 ? (
          filteredArtists.map((name) => (
            <div
              key={name}
              className="bg-white rounded-lg shadow-md m-4 p-4 w-60 cursor-pointer hover:shadow-lg transition hover:shadow-[15px_15px_15px_rgba(0,0,0,0.2)] transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-200"
              onClick={() => handleArtistClick(name)}
            >
              <h2 className="text-xl font-semibold">{name}</h2>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No artists found.</p>
        )}
      </div>

      {/* <div className="flex justtify-evenly mt-8">
        <table className="w-full border-collapse border-solid">
          <thead>
            <tr className="border-b rounded-xl">
              <td>Artist name</td>
              <td>Artist name</td>
            </tr>
          </thead>
          <tbody>
            {selectedArtist ? (
              <ArtistDetails
                artistData={selectedArtist.artistInfo}
                songs={selectedArtist.songs}
                allArtists={data}
                onBack={() => setSelectedArtist(null)}
              />
            ) : filteredArtists.length > 0 ? (
              filteredArtists.map((name) => (
                <tr
                  key={name}
                  className=" border-b rounded-xl shadow-md m-4 p-4 w-60 cursor-pointer hover:shadow-lg transition transition ease-in-out "
                  onClick={() => handleArtistClick(name)}
                >
                  <td className="text-xl font-semibold">{name}</td>
                </tr>
              ))
            ) : (
              <td className="text-gray-700">No artists found.</td>
            )}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Artist;
