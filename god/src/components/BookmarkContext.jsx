import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const BookmarkContext = createContext();

// Create a provider component
export const BookmarkProvider = ({ children }) => {
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState([]);

  // Load bookmarked places from localStorage on initial render
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedPlaces');
    if (savedBookmarks) {
      setBookmarkedPlaces(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarked places to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarkedPlaces', JSON.stringify(bookmarkedPlaces));
  }, [bookmarkedPlaces]);

  // Toggle bookmark status for a place
  const toggleBookmark = (place) => {
    setBookmarkedPlaces(prevBookmarks => {
      const isBookmarked = prevBookmarks.some(bookmark => bookmark.id === place.id);
      
      if (isBookmarked) {
        // Remove from bookmarks
        return prevBookmarks.filter(bookmark => bookmark.id !== place.id);
      } else {
        // Add to bookmarks
        return [...prevBookmarks, place];
      }
    });
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