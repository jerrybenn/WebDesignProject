import React, { useContext } from 'react'
import './Account.css'
import { AuthContext } from '../../components/AuthProvider'


const Account = () => {
   // Get user info from AuthProvider context
   const { user } = useContext(AuthContext)

   return (
      <div className='body'>
         <div className='container'>
            <h2>Account Information</h2>
            <h4>{user?.username}</h4> {/* Display the username */}
            <div className='flexRow'>
               <p>{user?.first_name}</p> {/* Display first name */}
               <p>{user?.last_name}</p>  {/* Display last name */}
            </div>
            <p>{user?.email}</p> {/* Display email */}
            <p>{user?.date_created}</p> {/* Display account creation date */}
         </div>
      </div>
   )
}

export default Account
