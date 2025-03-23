import React from 'react';
import SearchIcon from '@mui/icons-material/Search'; // Make sure to import the icon if you are using it
import './SearchBar.css'; // Import the CSS file


const SearchBar = ({ religion, denomination, location, onSearchChange }) => {
   // Handle input changes
   const handleReligionChange = (e) => {
      onSearchChange({ ...e.target, name: 'religion' });
   };
   
   const handleDenominationChange = (e) => {
      onSearchChange({ ...e.target, name: 'denomination' });
   };
   
   const handleLocationChange = (e) => {
      onSearchChange({ ...e.target, name: 'location' });
   };
   
   return (
      <div className="searchBar">
         <div className="religionSelection">
            Religion
            <input 
               type="text" 
               placeholder="Enter Religion" 
               value={religion} 
               onChange={handleReligionChange} 
            />
         </div>
         <div className="DenominationSelection">
            Denomination
            <input 
               type="text" 
               placeholder="Enter Denomination" 
               value={denomination} 
               onChange={handleDenominationChange} 
            />
         </div>
         <div className="location">
            Location
            <input 
               type="text" 
               placeholder="Where are you going?" 
               value={location} 
               onChange={handleLocationChange} 
            />
         </div>
      </div>
   );
};

export default SearchBar;
