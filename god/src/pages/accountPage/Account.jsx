import React from 'react'
import './Account.css'


const Account = () => {
   return (
      <div className='body'>
         <div className='container'>
            <h2>Account Information</h2>
            <h4>Username</h4>
            <div className='flexRow'>
               <p>First Name</p>
               <p>Last Name</p>
            </div>
            <p>Email</p>
            <p>date_created</p>
         </div>
      </div>
   )
}

export default Account