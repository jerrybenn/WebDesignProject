import React from 'react'
import { useState } from 'react';
import './Search.css'
import RelCard from "../../components/RelCard/RelCard";
import ChurchInfo from '../../components/churchInfo/churchInfo.jsx';
const Search = () => {
 const [showChurchInfo, setShowChurchInfo] = useState(false);


 return (
   <div className="searchContainer">
       <h1>Search</h1>
       <RelCard onClick={() => setShowChurchInfo(true)} />
       {showChurchInfo && (
       <div className="details">
         <ChurchInfo />
         <button className="closeButton" onClick={() => setShowChurchInfo(false)}>X</button>
       </div>
     )}
   </div>
 )
}


export default Search