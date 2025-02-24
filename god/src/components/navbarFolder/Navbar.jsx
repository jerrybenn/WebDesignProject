import React from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link to="/home">LOGO TEXT</Link>
            <Link to="/search">Search</Link>
        </div>
    )
}  

export default Navbar