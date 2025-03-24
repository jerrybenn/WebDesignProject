import React, {useState } from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css'
import SignUp from '../profileComponents/signUpForm/SignUp';
import Login from '../profileComponents/loginForm/Login';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from '../searchPageComponents/SearchBar'






const Navbar = () => {

    const [activeLink, setActiveLink] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClick = (link) => {
        setActiveLink(link);
    };

    const handleSignUpClick = () => {
        setShowSignUp(true);
        setMenuOpen(false); // Close menu when opening modal
    };

    const closeSignUp = () => {
        setShowSignUp(false);
    };

    const handleLoginClick = () =>{
        setShowLogin(true);
        setMenuOpen(false);
    }

    const closeLogin = () =>{
        setShowLogin(false)
    }

    const switchToLogin = () => {
        setShowSignUp(false); // Close signup modal
        setShowLogin(true); // Open login modal
    };

    const switchToSignup = () =>{
        setShowLogin(false);
        setShowSignUp(true);
    }
    return (
        <div className='navbarContainer'>
            <div className="upperNav">
                <div className="logo">
                    <Link to="/home">God.</Link>
                </div>
                <div className="navLinks">
                    <div className="linkContainer">
                <Link to="/search" 
                        className={activeLink === "/search" ? "active" : ""}
                        onClick={() => handleClick("/search")}>
                        Search
                    </Link>
                    </div>
                    <div className="linkContainer">
                    <Link to="/contact" 
                        className={activeLink === "/contact" ? "active" : ""}
                        onClick={() => handleClick("/contact")}>
                        Contact
                     </Link>
                    </div>
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
                            <div className="menuItem" onClick={handleSignUpClick}>Sign Up</div>
                            <div className="menuItem" onClick= {handleLoginClick}>Log in </div>
                            <Divider sx={{width: "100%" , borderColor: "#B2B4B7FF"}}/>
                            <Link className="menuItem" to="/saved">Saved</Link>
                            <Link className="menuItem" to ="/account">Account</Link>
                            <Link className="menuItem" to ="/settings">Settings</Link>
                            <div className="logout">Logout</div>
                        </div>
                    )}
                </div>
                

            </div>

            <Divider sx={{width: "100%" , borderColor: "#B2B4B7FF"}}/>
            
            {showSignUp && <SignUp onClose={closeSignUp} switchToLogin={switchToLogin} />}
            {showLogin && <Login onClose={closeLogin} switchToSignup={switchToSignup} />}
        </div>
    )
}  

export default Navbar