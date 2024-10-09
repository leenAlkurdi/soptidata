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
  const [expandedShow, setExpandedShow] = useState(null);  
  const toggleShow = (showName) => {  
    setExpandedShow(expandedShow === showName ? null : showName);  
  };  

  return (  
    <div className="container mx-auto my-8">  
      <h1 className="text-2xl font-bold text-center mb-6">Podcasts</h1>  
      <div className="flex flex-col space-y-4">  
        {Object.keys(groupedPodcasts).length > 0 ? (  
          Object.entries(groupedPodcasts).map(([showName, episodes], index) => (  
            <div key={index}>  
              <h2   
                className="text-xl font-semibold cursor-pointer"   
                onClick={() => toggleShow(showName)}  
              >  
                {showName}  
              </h2>  
              {expandedShow === showName && (  
                <div className="mt-2 border-t border-gray-200 pt-2 bg-gray-50">  
                  {episodes.map((episode, epIndex) => (  
                    <div key={epIndex} className="py-2">  
                      <p className="text-gray-700">Episode: {episode.episode_name}</p>  
                      <p className="text-gray-700">Reason Start: {episode.reason_start}</p>  
                      <p className="text-gray-700">Reason End: {episode.reason_end}</p>  
                    </div>  
                  ))}  
                </div>  
              )}  
            </div>  
          ))  
        ) : (  
          <p className="text-gray-700">No podcasts available.</p>  
        )}  
      </div>  
    </div>  
  );  
};  

export default Podcast;