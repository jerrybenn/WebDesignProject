import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';





const Navbar = () => {

    const [activeLink, setActiveLink] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className='navbarContainer'>
            <div className="upperNav">
                <div className="logo">
                    <Link to="/home">God.</Link>
                </div>
                <div className="navLinks">
                <Link to="/search" 
                        className={activeLink === "/search" ? "active" : ""}
                        onClick={() => handleClick("/search")}>
                        Search
                    </Link>
                    <Link to="/contact" 
                        className={activeLink === "/contact" ? "active" : ""}
                        onClick={() => handleClick("/contact")}>
                        Contact
                    </Link>
                </div>
                <div className="rightStuff">
                    <div className="addNewChurch">
                        <Link to="/addNewWorship" >Add new worship</Link>
                    </div>
                    <div className="profileContainer" onClick={toggleMenu}>
                        <MenuIcon sx={{ color: "#6a6a6a", paddingRight: "6px"}}/>
                        <AccountCircleIcon sx={{ fontSize: 40 , color: "#6a6a6a"}}/>
                    </div>
                    {menuOpen && (
                        <div className="dropdownMenu">
                            <Link to="/signup">Sign up</Link>
                            <Link to="/login">Log in</Link>
                            <Divider sx={{width: "100%" , borderColor: "#B2B4B7FF"}}/>
                            <Link to="/Saved">Saved</Link>
                            <Link to="/settings">Settings</Link>
                            <Link to="/logout">Logout</Link>
                            <Link to="/help">Help Center</Link>
                        </div>
                    )}
                </div>
                

            </div>
            <div className="bottomNav">
                search bar
            </div>
            <Divider sx={{width: "100%" , borderColor: "#B2B4B7FF"}}/>
            
            
        </div>
    )
}  

export default Navbar