import React from 'react'
import './Home.css'
import RelCard from "../../components/RelCard/RelCard";
import Icon from '../../components/religionIcon/religionIcon.jsx';
import ChurchInfo from '../../components/churchInfo/churchInfo.jsx';
const Home = () => {
  return (
    <div className="homeContainer">
        <h1>Home</h1>
        <ChurchInfo/>
        <Icon/>{/**/}
        
        <RelCard/>

    </div>
  )
}

export default Home