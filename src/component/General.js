import React from "react";
import jsonData from "../spotify_data.json";

function General() {
  let playsCounter = 0;
  const Plays = () => {
    for (let i = 0; i < jsonData.length; i++) {
      if (
        jsonData[i].episode_name == null &&
        jsonData[i].episode_show_name == null
      ) {
        playsCounter++;
      }
    }
    return playsCounter;
  };

  // const hourMostListening = (data) => {  
  //   const hourListening = [];  
  //   data.forEach((item) => {  
  //     const hour = item.ts.split("T")[1].split(":")[0]; 
  //     const existingHour = hourListening.find(h => h.hour === hour);  
  //     if (existingHour) {  
  //       existingHour.totalTime += item.ms_played;  
  //     } else {  
  //       hourListening.push({ hour, totalTime: item.ms_played }); 
  //     }  
  //   });    
  //   hourListening.sort((a, b) => b.totalTime - a.totalTime);   
  //   return hourListening.length > 0 ? hourListening[0].hour : null;  
  // }; 

  const seasonInYear = () => {
    // const seasonLisening = [];
    // jsonData.forEach((item) => {
    //   const season = item.ts.slice(5, 10);
    //   const existingHour = seasonLisening.find(s => s.season === season);  
    //   if (existingHour) {
    //     existingHour.totalTime += item.ms_played;
    //   }
    //   else {
    //     seasonLisening.push({season, totalTime: item.ms_played});
    //   }
    // });
    // seasonLisening.sort((a, b) => b.totalTime - a.totalTime);
    // return seasonLisening.length > 0 ? seasonLisening[0].season : null;

    let winter = [];
    let spring = [];
    let summer = [];
    let automn = [];
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].ts.slice(5, 7) === '12' || jsonData[i].ts.slice(5, 7) === '01' || jsonData[i].ts.slice(5, 7) === '02') {
        winter[i] = jsonData[i];
      }
      else if (jsonData[i].ts.slice(5, 7) === '03' || jsonData[i].ts.slice(5, 7) === '04' || jsonData[i].ts.slice(5, 7) === '05') {
        spring[i] = jsonData[i]; 
      }
      else if (jsonData[i].ts.slice(5, 7) === '06' || jsonData[i].ts.slice(5, 7) === '07' || jsonData[i].ts.slice(5, 7) === '08') {
        summer[i] = jsonData[i];
      }
      else if (jsonData[i].ts.slice(5, 7) === '09' || jsonData[i].ts.slice(5, 7) === '10' || jsonData[i].ts.slice(5, 7) === '11') {
        automn[i] = jsonData[i];
      }
    }

    let winterListening = 0;
    let springListening = 0;
    let summerListening = 0;
    let automnListening = 0;
    
    winter.forEach((item) => {winterListening += item.ms_played});
    spring.forEach((item) => {springListening += item.ms_played});
    summer.forEach((item) => {summerListening += item.ms_played});
    automn.forEach((item) => {automnListening += item.ms_played});
    
    let seasonsListening = [winterListening, springListening, summerListening, automnListening];
    {console.log(winterListening)}
    {console.log(springListening)}
    {console.log(summerListening)}
    {console.log(automnListening)}

    if (seasonsListening.indexOf(Math.max.apply(null, seasonsListening)) == 0) {
      return 'Winter';
    }
    else if (seasonsListening.indexOf(Math.max.apply(null, seasonsListening)) == 1) {
      return 'Spring';
    }
    else if (seasonsListening.indexOf(Math.max.apply(null, seasonsListening)) == 2) {
      return 'Summer';
    }
    else if (seasonsListening.indexOf(Math.max.apply(null, seasonsListening)) == 3) {
      return 'Automn';
    }

  };

  return (
    <div>
      {/* {<h1>number of plays is: {Plays}</h1>} */}
      {seasonInYear()}
      
      {/* {console.log(jsonData[0].ts.slice(5, 10))} */}
    </div>
  );
}

export default General;
