import React from "react";  
import { BrowserRouter as Router } from "react-router-dom"; 
import SpotiData from "./SpotiData";  
import "./index.css";  

const App = () => {  
  return (  
    <div className="App">  
      <Router>  
        <SpotiData />  
      </Router>  
    </div>  
  );  
};  

