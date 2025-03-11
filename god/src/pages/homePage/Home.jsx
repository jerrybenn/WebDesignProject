import React from 'react'
import './Home.css'
import RelCard from "../../components/RelCard/RelCard";
import Icon from '../../components/religionIcon/religionIcon';

const Home = () => {
  return (
    <div className="homeContainer">
        <h1>Home</h1>
        <RelCard/>
        <Icon/>
    </div>
  )
}

export default Home