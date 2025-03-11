import React from 'react'
import './Home.css'
import Slideshow from '../../components/HomePageComponents/Slideshow'
import PlaceOfWorshipCard from '../../components/HomePageComponents/PlaceOfWorshipCard'


const Home = () => {
  return (
    <div className="homeContainer">
        {/* Hero Section */}
        <div className="heroSection">
          <Slideshow />
        </div>
        
        {/* Featured Places of Worship */}
        <div className="featuredSection">
          <h1>Featured Places of Worship</h1>
          <div id="flexRow">
            <PlaceOfWorshipCard />
            <PlaceOfWorshipCard />
          </div>
        </div>
        
        {/* Saved Places of Worship (only shows up if the user is logged in) */}
        <div className="featuredSection">
          <h1>Saved Places of Worship</h1>
          <div id="flexRow">
            <PlaceOfWorshipCard />
            <PlaceOfWorshipCard />
          </div>
        </div>
    </div>
  )
}

export default Home