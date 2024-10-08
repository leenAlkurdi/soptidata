import React from 'react'
import General from './General'

const Artist = ({name}) => {

const currentArtist=(data)=>{
return data.filter((item)=>item.master_metadata_album_artist_name==name)
}

  return (
    <div>Artist</div>
  )
}

export default Artist