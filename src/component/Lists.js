import React from 'react'
import jsondata from "../spotify_data.json"

function Lists() {
    const topPlay = () => {
        let singers = jsondata.map(e => e["master_metadata_album_artist_name"])
        let nodupsingers = singers.filter((value , index) =>singers.indexOf(value)===index && value !== null)
        let singerplaytime =[]
            nodupsingers.forEach(e => {
              singerplaytime.push({
                name: e,
                playtime : 0 
              })
            })
        singerplaytime.map(e => 
          jsondata.map(item => e.name === item.master_metadata_album_artist_name ? e.playtime += item.ms_played: null))    
        singerplaytime.sort((a,b) => b.playtime - a.playtime)
        let TopArtists = singerplaytime.slice(0 , 100)
        console.log(TopArtists);
        }
          
   return (
    <div>
      
    </div>
  )

}

export default Lists;
