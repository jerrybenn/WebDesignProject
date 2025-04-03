import React, { useState, useEffect, useContext } from 'react';
import './Settings.css';
import api from '../../api';
import { AuthContext } from '../../components/AuthProvider'



const Settings = () => {
  // Get user info from AuthProvider context
  const { user } = useContext(AuthContext)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    number: '',
    email: '',
  });
  
  // Update the formData on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handleChange | FormData: ", formData); // Will show previous state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the submission from sending a POST request
    console.log("Submitting formData: ", formData); // Log form data being sent
    try {
      const res = await api.patch(`/users/${user.user_id}/`, formData);
      console.log("Response from server: ", res.data); // Log server response
      if (res.status === 200) {
        alert("Your information has been successfully updated.");
      } else {
        alert("Something went wrong. Your input was likely faulty.");
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.error || 'Something went wrong with the server.'}`);
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("Something went wrong. Our code is likely to blame.");
      }
    }
  };  
  
  // Set form data when user is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
      });
    }
  }, [user]); // Runs when user data changes
  
  // Set form data when user is available and on mount
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
      });
    }
  }, []); // Runs when component mounts
  
  return (
    <div className="settings-page">
      <div className="settings-form-container">
        <h2>Settings</h2>
        <form onSubmit={handleSubmit} className="settings-form">
          <label>
            First Name:
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              placeholder="Enter your first name" 
            />
          </label>
          
          <label>
            Last Name:
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              placeholder="Enter your last name" 
            />
          </label>
          
          <label>
            Email:
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
            />
          </label>
          
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
