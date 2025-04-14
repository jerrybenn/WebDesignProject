import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api'; // Assuming you have an api configured with axios or similar
import { AuthContext } from './AuthProvider'


// Create the context
const BookmarkContext = createContext();

// Create a provider component
export const BookmarkProvider = ({ children }) => {
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState([]);
  // Get user info from AuthProvider context
  const { user } = useContext(AuthContext);

  // Load bookmarked places from API on initial render
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (user) {
          const response = await api.get('saved-places/');
          setBookmarkedPlaces(response.data.map(item => ({
            ...item.place,
            saved_place_id: item.saved_place_id // Include the saved place ID for deletion
          })));
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, [user]);

  // Toggle bookmark status for a place
  const toggleBookmark = async (place) => {
    try {
      const isBookmarked = bookmarkedPlaces.some(bookmark => bookmark.id === place.id);
      
      if (isBookmarked && user) {
        // Find the saved place to get its ID for deletion
        const savedPlace = bookmarkedPlaces.find(b => b.id === place.id);
        await api.delete(`saved-places/${savedPlace.saved_place_id}/`);
        setBookmarkedPlaces(prev => prev.filter(b => b.id !== place.id));
      } else {
        // Add to bookmarks via API
        const response = await api.post('saved-places/', {
          place_id: place.id,
          user: user.user_id // Assuming user is available
        });
        
        setBookmarkedPlaces(prev => [
          ...prev, 
          {
            ...place,
            saved_place_id: response.data.saved_place_id
          }
        ]);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      // You might want to add error handling here
    }
  };

  // Check if a place is bookmarked
  const isBookmarked = (placeId) => {
    return bookmarkedPlaces.some(place => place.id === placeId);
  };

  return (
    <BookmarkContext.Provider value={{ 
      bookmarkedPlaces, 
      toggleBookmark, 
      isBookmarked 
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook to use the bookmark context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export default BookmarkContext;