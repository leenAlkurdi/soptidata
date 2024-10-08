import React from 'react'
import jsondata from "../spotify_data.json"

function Lists() {
        const toplist = (x) => {
            let item = jsondata.map(e => e[x])
            let nodup = item.filter((value , index) =>item.indexOf(value)===index && value !== null)
            let finalplaytime = []
               nodup.forEach(e => {
                finalplaytime.push({
                    name : e,
                    playtime: 0 
                })
               })
            finalplaytime.map(e => jsondata.map(item => e.name === item[x] ? e.playtime +=item.ms_played :null))
            finalplaytime.sort((a,b) => b.playtime - a.playtime)
            let finaltop = finalplaytime.slice(0 , 100)
            console.log(finaltop);
        }

   return (
    <div>
      <button onClick={() => toplist("master_metadata_track_name")}>Test Tracks</button>
      <button onClick={() => toplist("master_metadata_album_artist_name")}>Test Artisit</button>
      <button onClick={() => toplist("master_metadata_album_album_name")}>Test Album</button>
    </div>
  )

}

export default Lists;
