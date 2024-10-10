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
    <div className="mx-auto my-8 p-4  rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#0e5c2a]">Podcasts</h1>
      <div className="flex flex-col space-y-4 ">
        {Object.keys(groupedPodcasts).length > 0 ? (
          Object.entries(groupedPodcasts).map(([showName, episodes], index) => (
            <div key={index} className="bg-gray-600 rounded-lg p-4 hover:-translate-y-1 hover:scale-100 dark:hover:bg-gray-800">
              <h5
                className="text-xl font-bold text-gray-800 text-white m-3 hover:text-green-400 transition duration-200 cursor-pointer"
                onClick={() => toggleShow(showName)}
              >
                {showName}
              </h5>
              {expandedShow === showName && (
                <div className="m-2 border-t border-gray-600 pt-2 bg-gray-700 rounded-md">
                  {episodes.map((episode, epIndex) => (
                    <div key={epIndex} className="py-2 m-2 text-gray-300">
                      <p className="font-medium">Episode: {episode.episode_name}</p>
                      <p>Reason Start: {episode.reason_start}</p>
                      <p>Reason End: {episode.reason_end}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No podcasts available.</p>
        )}
      </div>
    </div>
  );
};

export default Podcast;
