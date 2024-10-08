import React, { useState } from 'react'

const Lists = () => {
    const[isLastYear,setIsLastYear]=useState(false)

    const filterByLastYear=(data)=>{
      //  return data.filter((item) => item.ts.split("T")[0].split("-")[0] ==new Date().getFullYear())
        const currentYear = new Date().getFullYear(); 
        const lastYearTops = data.filter((item) => item.ts.split("T")[0].split("-")[0] == currentYear);  
        return lastYearTops;
    }

    const toggleFilter = () => {  
        setIsLastYear(prev => !prev);  
    };

  return (
    <div>Lists</div>
  )
}

export default Lists