import React, { useContext, useEffect, useState } from 'react'
import './Account.css'
import { AuthContext } from '../../components/AuthProvider'
import api from '../../api';


const Account = () => {
   // Get user info from AuthProvider context
   const { user } = useContext(AuthContext)
   const [fetchUser, setFetchUser] = useState(null);
   
   
   const handleGrabUserInformation = async () => {
      try {
         const res = await api.get(`/users/${user.user_id}/`);
         setFetchUser(res.data);
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
   };  
   
   // Function that changes the ISO date format to just the date in the american format
   function formatDate(isoString) {
      const date = new Date(isoString);
      
      // Check if the date is valid
      if (isNaN(date)) {
         return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US');
   }
   
   useEffect(() => {
      const fetchData = async () => {
         await handleGrabUserInformation();
      };
      
      fetchData();
   }, []);
   
   
   return (
      <>
         {(fetchUser && user) ? 
            (
               <div className='body'>
                  <div className='container'>
                     <h2>Account Information</h2>
                     <h4>Username: {fetchUser?.username}</h4> {/* Display the username */}
                     <div className='flexRow'>
                        <p>First Name: {fetchUser?.first_name}</p> {/* Display first name */}
                        <p>Last Name: {fetchUser?.last_name}</p>  {/* Display last name */}
                     </div>
                     <p>Email: {fetchUser?.email}</p> {/* Display email */}
                     <p>Date Created: {formatDate(fetchUser?.date_created)}</p> {/* Display account creation date */}
                  </div>
               </div>
            ) 
         :
            (
               <div className='body'>
                  <div className='container'>
                     <h2>No User Fetched</h2>
                  </div>
               </div>
            )
         }
      </>
      
      
   )
}

export default Account
