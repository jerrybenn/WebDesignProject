import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/AuthProvider'
import { useNavigate } from 'react-router-dom';


const Saved = () => {
  // Instantiate navigation
  const navigate = useNavigate();
  // Get user info from AuthProvider context
  const { user } = useContext(AuthContext)
  
  // Set form data when user is available
  useEffect(() => {
    if (!user) {
        // Navigate to home page if no user is found
        navigate("/");
    }
  }, [user, navigate]); // Runs when user data changes
  
  
  return (
    <div>Saved Places Placeholder</div>
  )
}

export default Saved