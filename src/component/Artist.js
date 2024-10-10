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
  const [currentPage, setCurrentPage] = useState(0);  
  const artistsPerPage = 12;  

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

  const totalArtists = filteredArtists.length;  
  const totalPages = Math.ceil(totalArtists / artistsPerPage);  
  const currentArtists = filteredArtists.slice(currentPage * artistsPerPage, (currentPage + 1) * artistsPerPage);  

  return (  
    <div className="container mx-auto my-8 px-4">  
       <h1 className="text-3xl font-bold text-center mb-6 text-[#0e5c2a]">Artist</h1>

      {/* Only show the search bar if no artist is selected */}
      {!selectedArtist && (
        <div className="mb-4">  
          <input  
            type="text"  
            placeholder="Search by artist name..."  
            className="border rounded-lg p-2 w-full md:w-1/2 lg:w-1/3 mx-auto"  
            value={search}  
            onChange={(e) => setSearch(e.target.value || "")}  
          />  
        </div>  
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">  
        {selectedArtist ? (  
          <ArtistDetails   
            artistData={selectedArtist.artistInfo}   
            songs={selectedArtist.songs}   
            allArtists={data}  
            onBack={() => setSelectedArtist(null)}   
          />  
        ) : (  
          currentArtists.length > 0 ? (
            currentArtists.map((name) => (  
              <div  
                key={name}  
                 className=" block p-6 m-6 border border-gray-300 bg-gray-600 rounded-lg shadow transition ease-in-outshadow transition ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-gray-600 m-4 p-4 w-72"
                onClick={() => handleArtistClick(name)}  
              >  
                <h2 className="text-xl font-bold text-gray-800 text-white m-3 hover:text-green-400 transition duration-200 cursor-pointer">Artist :{name}</h2>
              </div>  
            ))  
          ) : (  
            <p className="text-gray-700">No artists found.</p>  
          )  
        )}  
      </div>  

      {!selectedArtist && totalPages > 1 && (  
        <div className="flex justify-between mt-4">  
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} 
            disabled={currentPage === 0} 
            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} 
            disabled={currentPage >= totalPages - 1} 
            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>  
  );  
};  

export default Artist;