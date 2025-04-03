import React, { useState, useEffect, useContext } from 'react';
import './Settings.css';
import api from '../../api';
import { AuthContext } from '../../components/AuthProvider'
import { useNavigate } from 'react-router-dom';



const Settings = () => {
  // Instantiate navigation
  const navigate = useNavigate();
  // Get user info from AuthProvider context
  const { user } = useContext(AuthContext)
  
  // Grabs the current user's information
  const handleGrabUserInformation = async () => { 
    if (user) {
      try {
        const res = await api.get(`/users/${user.user_id}/`);
        setFormData({
          firstName: res.data.first_name || '',
          lastName: res.data.last_name || '',
          email: res.data.email || '',
        });
        console.log("Response from server: ", res.data); // Log server response
      } catch (error) {
        if (error.response) {
            alert(`Error: ${error.response.data.error || 'Something went wrong with the server.'}`);
        } else if (error.request) {
            alert("No response from server. Please check your connection.");
        } else {
            alert("Something went wrong. Our code is likely to blame.");
        }
      }
    } else {
      alert("Settings page | handleGrabUserInformation | You are not authorized. Log in.")
    }
  };  
  
  // Data to put into the form, also holds the data sent to the backend
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
        alert(`Settings page | handleSubmit | Error: ${error.response.data.error || 'Something went wrong with the server.'}`);
      } else if (error.request) {
        alert("Settings page | handleSubmit | No response from server. Please check your connection.");
      } else {
        alert("Settings page | handleSubmit | Something went wrong. Our code is likely to blame.");
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
    } else {
      // Navigate to home page if no user is found
      navigate("/");
    }
  }, [user, navigate]); // Runs when user data changes

  // Set form data when user is available
  useEffect(() => {
    const fetchData = async () => { // Defining the async wrapper function to grab the user's data
        await handleGrabUserInformation();
    };
    
    if (!user) { // If the user was not logged in / authed
        // Navigate to home page if no user is found
        navigate("/");
    } else { // If the user is authorized and logged in
        fetchData(); // Fetch the currently authorized user's data from the backend
    }
  }, [user, navigate]); // Runs when user data changes

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
