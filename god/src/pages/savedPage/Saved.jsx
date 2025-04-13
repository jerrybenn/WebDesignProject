import React, { useContext, useEffect, useState } from 'react'
import './Saved.css'
import { AuthContext } from '../../components/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../../components/BookmarkContext';
import PlaceOfWorshipCard from '../../components/worshipCard/PlaceOfWorshipCard';
import Grid from '@mui/material/Grid';

const Saved = () => {
  // Instantiate navigation
  const navigate = useNavigate();
  // Get user info from AuthProvider context
  const { user } = useContext(AuthContext);
  // Get bookmarked places from BookmarkContext
  const { bookmarkedPlaces } = useBookmarks();
  
  // Set form data when user is available
  useEffect(() => {
    if (!user) {
        // Navigate to home page if no user is found
        navigate("/");
    }
  }, [user, navigate]); // Runs when user data changes
  
  return (
    <div className="savedPageContainer">
      <div className="savedPageTitle">Saved Worship Locations</div>
      <div className="savedPageContent">
        {bookmarkedPlaces.length > 0 ? (
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
        )}
      </div>
    </div>
  )
}

export default Saved