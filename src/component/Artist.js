import React, { useState } from "react";  
import ArtistDetails from './ArtistDetails'; 

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
  const artistsPerPage = 12;  
  
  const uniqueArtists = [  
    ...new Set(data.map((item) => item.master_metadata_album_artist_name)),  
  ];  
 
  const filteredArtists = uniqueArtists.filter(  
    (name) => name && name.toLowerCase().includes(search.toLowerCase())  
  );  

  const currentArtists = filteredArtists.slice(0, artistsPerPage); 

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
          className="border rounded-lg p-2 w-full"  
          value={search}  
          onChange={(e) => setSearch(e.target.value || "")}  
        />  
      </div>  

      <div className="flex flex-wrap justify-center">  
        {selectedArtist ? (  
          <ArtistDetails   
            artistData={selectedArtist.artistInfo}   
            songs={selectedArtist.songs}   
            allArtists={data} // Pass the full data here
            onBack={() => setSelectedArtist(null)}   
          />  
        ) : (  
          currentArtists.length > 0 ? (
            currentArtists.map((name) => (  
              <div  
                key={name}  
                className="bg-white rounded-lg shadow-md m-4 p-4 w-72 cursor-pointer hover:shadow-lg transition"  
                onClick={() => handleArtistClick(name)}  
              >  
                <h2 className="text-xl font-semibold">Artist: {name}</h2>  
              </div>  
            ))  
          ) : (  
            <p className="text-gray-700">No artists found.</p>  
          )  
        )}  
      </div>  
    </div>  
  );  
};  

export default Artist;