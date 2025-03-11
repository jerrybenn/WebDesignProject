import React from 'react'
import './Home.css'
import Slideshow from '../../components/HomePageComponents/Slideshow'

const Home = () => {
  return (
    <div className="homeContainer">
        
        {/* Hero Section */}
        <div className="heroSection">
          <Slideshow />
        </div>

        {/* Featured Places of Worship */}
        <div className="featuredSection">
          <p>Placeholder</p>
        </div>
        {/* Saved Places of Worship (only shows up if the user is logged in) */}
    </div>
  )
}

export default Home