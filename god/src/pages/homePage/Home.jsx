import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/AuthProvider'
import './Home.css';
import Slideshow from '../../components/HomePageComponents/Slideshow';
import { useBookmarks } from '../../components/BookmarkContext';
import PlaceOfWorshipCard from '../../components/worshipCard/PlaceOfWorshipCard';
import api from '../../api.js';
import Grid from '@mui/material/Grid';



const Home = () => {
  // Get user info from AuthProvider context
  const { user } = useContext(AuthContext);
  // Get bookmarked places from BookmarkContext
  const { bookmarkedPlaces } = useBookmarks();
  // To store all places of worship
  const [placesOfWorship, setPlacesOfWorship] = useState([]); 
  
  // START - Utility function to shuffle an array
  const getRandomItems = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  // STOP  - Utility function to shuffle an array
  
  // START - Places of Worship data fetching
  const getPlacesOfWorship = async () => {
    try {
      const res = await api.get('/places/');
      const randomPlaces = getRandomItems(res.data, 4); // Only keep 4 random places
      setPlacesOfWorship(randomPlaces);
    } catch (err) {
      alert(`Error fetching Places of Worship: ${err.message}`);
    }
  };
  // STOP  - Places of Worship data fetching
  
  useEffect(() => { // ON COMPONENT MOUNT
    const fetchData = async () => { // Function to call all fetch data functions
      await getPlacesOfWorship();
    };
    
    fetchData(); // Call the function to fetch all required data from the backend
  }, []);
  
  
  return (
    <div className="homeContainer">
      {/* Hero Section */}
      <div className="heroSection">
        <Slideshow />
      </div>

      {/* Featured Places of Worship */}
      <div className="featuredSection">
        <h1>Featured Places of Worship</h1>
        <Grid container spacing={2} padding={4} justifyContent="center">
          {placesOfWorship.map((place) => (
            <Grid key={place.id} xs={12} sm={6} md={4} lg={3}>
              <PlaceOfWorshipCard place={place} />
            </Grid>
          ))}
        </Grid>
      </div>
      
      {/* Saved Places of Worship */}
      <div className="savedSection">
        <h1>Saved Places of Worship</h1>
        {user ? (
          bookmarkedPlaces.length > 0 ? (
            <div className="cardContainer">
              <Grid container spacing={3} justifyContent="center">
                {bookmarkedPlaces.map((place) => (
                  <Grid item key={place.id} xs={12} sm={6} md={4} lg={3}>
                    <PlaceOfWorshipCard place={place} />
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <div className="savedPagePlaceholder">No saved places yet</div>
          )
        ) : (
          <div className="savedPagePlaceholder">You are not logged in, therefore you cannot see any saved places.</div>
        )}  
      </div>
    </div>
  );
};

export default Home;
