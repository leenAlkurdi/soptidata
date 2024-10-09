import React from 'react'
const Artist = ({data,calculatePlays,totalPlays,TimeSpent}) => {
const name="Rihanna"
  const currentArtistData = data.filter(  
    (item) => item.master_metadata_album_artist_name === name  
  );  
  const artistPlays =calculatePlays(currentArtistData)
  const percentage = ((artistPlays / totalPlays) * 100)
  return (  
    <div>  
      <h2>Artist: {name}</h2>  
      <p>Total Plays: {artistPlays}</p> 
      <p>Percentage of Total Plays: {percentage}%</p>  
      <p>Total Time Spent: {TimeSpent(currentArtistData)} days</p>   
    </div>  
  );
}

export default Artist