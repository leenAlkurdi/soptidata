import React , {useState , useEffect} from 'react'
import jsondata from '../spotify_data.json'

function General() {
  const [data , setData] = useState([])
  useEffect(() =>{
    setData(jsondata)
  },[]);
  const TimeSpent =() =>{
    let timespent = 0
    for( let i = 0; i < data.length; i++ ){
      timespent += data[i].ms_played
    }
    let finaltimespent = timespent/86400000
    console.log(finaltimespent)
  }
  

    return (
    <div>
      <button onClick={TimeSpent}>Test</button>
    </div>
  )
}

export default General
