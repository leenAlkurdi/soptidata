import React , {useState , useEffect} from 'react'
import data from './spotify_data.json'

function Artist() {
  const [Database , setDatabase] = usestate([])
  useEffect(() =>{
    setDatabase(data)
  },[]);
    return (
    <div>
      
    </div>
  )
}

export default Artist
