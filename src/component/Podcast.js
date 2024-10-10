import React, { useState } from 'react';  

const Podcast = ({ data, getPodcasts }) => {  
  const podcasts = getPodcasts(data);  

  const groupedPodcasts = podcasts.reduce((acc, podcast) => {  
    const showName = podcast.episode_show_name;  
    if (!acc[showName]) {  
      acc[showName] = [];  
    }  
    acc[showName].push(podcast);  
    return acc;  
  }, {});  

  const [selectedShow, setSelectedShow] = useState(null);  
  const [currentPage, setCurrentPage] = useState(0);  
  const podcastsPerPage = 12;  
  const totalShows = Object.keys(groupedPodcasts).length;  
  const totalPages = Math.ceil(totalShows / podcastsPerPage);  

  const toggleShow = (showName) => {  
    setSelectedShow(selectedShow === showName ? null : showName);  
  };  

  const nextPage = () => {  
    if (currentPage < totalPages - 1) {  
      setCurrentPage(currentPage + 1);  
    }  
  };  

  const prevPage = () => {  
    if (currentPage > 0) {  
      setCurrentPage(currentPage - 1);  
    }  
  };  

  const currentShows = Object.entries(groupedPodcasts).slice(currentPage * podcastsPerPage, (currentPage + 1) * podcastsPerPage);  

  return (  
    <div className="container mx-auto my-8">  
      <h1 className="text-2xl font-bold text-center mb-6">Podcasts</h1>  
      {selectedShow ? (  
        <div className="flex flex-col space-y-4">  
          <button 
            onClick={() => setSelectedShow(null)} 
            className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Back to All Shows
          </button>  
          {groupedPodcasts[selectedShow].map((episode, epIndex) => (  
            <div key={epIndex} className="shadow-lg p-4 rounded-lg hover:bg-gray-100 transition duration-200">  
              <h2 className="text-xl font-semibold">{selectedShow}</h2>  
              <p className="text-gray-700">Episode: {episode.episode_name}</p>  
              <p className="text-gray-700">Reason Start: {episode.reason_start}</p>  
              <p className="text-gray-700">Reason End: {episode.reason_end}</p>  
            </div>  
          ))}  
        </div>  
      ) : (  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">  
          {currentShows.length > 0 ? (  
            currentShows.map(([showName], index) => (  
              <div key={index} className="shadow-lg p-4 rounded-lg hover:bg-gray-100 transition duration-200">  
                <h2   
                  className="text-xl font-semibold cursor-pointer hover:text-green-500"   
                  onClick={() => toggleShow(showName)}  
                >  
                  {showName}  
                </h2>  
              </div>  
            ))  
          ) : (  
            <p className="text-gray-700">No podcasts available.</p>  
          )}  
        </div>  
      )}  
      {!selectedShow && (  
        <div className="flex justify-between mt-4">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0} 
            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={nextPage} 
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

export default Podcast;