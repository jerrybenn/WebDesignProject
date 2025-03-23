import React, { useEffect, useState } from 'react'
import './Search.css'
import RelCard from "../../components/RelCard/RelCard";
import ChurchInfo from '../../components/churchInfo/churchInfo.jsx';
import api from '../../api.js';
import PlaceOfWorshipCard from '../../components/searchPageComponents/PlaceOfWorshipCard.jsx';
import SearchBar from '../../components/searchPageComponents/SearchBar.jsx';


const Search = () => {
  const [showChurchInfo, setShowChurchInfo] = useState(false); // Modal used to show the details for the given church
  const [placesOfWorship, setPlacesOfWorship] = useState([]); // To store all places of worship
  const [religions, setReligions] = useState([]); // To store all religions
  const [denominations, setDenominations] = useState([]); // To store all denominations
  const [filters, setFilters] = useState({
    religion: '',
    denomination: '',
    location: ''
  });
  
  // Function to handle the search filter changes from SearchBar
  const handleSearchChange = (e) => {
    const { value, name } = e;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };
  
  // START - Places of Worship data fetching
  const getPlacesOfWorship = async () => {
    try {
      const res = await api.get('/places/');
      setPlacesOfWorship(res.data);
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
  
  useEffect(() => { // FOR TESTING ONLY!!!
    console.log("Places of Worship: ", placesOfWorship);
  }, [placesOfWorship]);
  
  // Filter the places of worship based on the search filters
  const filteredPlaces = placesOfWorship.filter((place) => {
    const religionMatch = filters.religion === '' || (place.denomination.religion.religion_name && typeof place.denomination.religion.religion_name === 'string' && place.denomination.religion.religion_name.toLowerCase().includes(filters.religion.toLowerCase()));
    const denominationMatch = filters.denomination === '' || (place.denomination.denomination_name && typeof place.denomination.denomination_name === 'string' && place.denomination.denomination_name.toLowerCase().includes(filters.denomination.toLowerCase()));
    
    // Check all location-related attributes of the place of worship objects for matches
    const locationMatch = filters.location === '' || (
      (place.address && typeof place.address === 'string' && place.address.toLowerCase().includes(filters.location.toLowerCase())) ||
      (place.city && typeof place.city === 'string' && place.city.toLowerCase().includes(filters.location.toLowerCase())) ||
      (place.state && typeof place.state === 'string' && place.state.toLowerCase().includes(filters.location.toLowerCase())) ||
      (place.postal_code && typeof place.postal_code === 'string' && place.postal_code.toLowerCase().includes(filters.location.toLowerCase())) ||
      (place.country && typeof place.country === 'string' && place.country.toLowerCase().includes(filters.location.toLowerCase()))
    );
    
    return religionMatch && denominationMatch && locationMatch;
  });
  
  
  return (
    <div className="searchContainer">
      <h1>Search</h1>
      <SearchBar 
        religion={filters.religion} 
        denomination={filters.denomination} 
        location={filters.location} 
        onSearchChange={handleSearchChange} 
      />
      
      {/* Render the filtered list of places of worship */}
      <div className="cardContainer">
        {filteredPlaces.map((place) => (
          <PlaceOfWorshipCard key={place.id} place={place} />
        ))}
      </div>
      
      <RelCard onClick={() => setShowChurchInfo(true)} />
      
      {showChurchInfo && (
        <div className="details">
          <ChurchInfo />
          <button className="closeButton" onClick={() => setShowChurchInfo(false)}>X</button>
        </div>
      )}
    </div>
  );
}

export default Search;
