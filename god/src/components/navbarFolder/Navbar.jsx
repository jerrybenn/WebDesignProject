import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SignUp from '../profileComponents/signUpForm/SignUp';
import Login from '../profileComponents/loginForm/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import { AuthContext } from '../AuthProvider';
import './Navbar.css';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    if (user) {
      logout();
      navigate('/');
    }
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setMenuOpen(false);
  };

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setMenuOpen(false);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const switchToLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbarContainer">
      <div className="upperNav">
        {/* Logo */}
        <div className="logo">
          <Link to="/home" className={currentPath === "/home" ? "active" : ""}>God.</Link>
        </div>

        {/* Navigation Links */}
        <div className="navLinks">
          <div className="linkContainer">
            <Link
              to="/search"
              className={currentPath === "/search" ? "active" : ""}
            >
              Search
            </Link>
          </div>
          <div className="linkContainer">
            <Link
              to="/contact"
              className={currentPath === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </div>
          {user && (
            <div className="linkContainer">
              <Link
                to="/addNewWorship"
                className={currentPath === "/addNewWorship" ? "active" : ""}
              >
                Add New Place of Worship
              </Link>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="rightStuff">
          <div className="profileContainer" onClick={toggleMenu}>
            <MenuIcon sx={{ color: "#6a6a6a", paddingRight: "6px" }} />
            <AccountCircleIcon sx={{ fontSize: 40, color: "#6a6a6a" }} />
          </div>

          {menuOpen && (
            <div className="dropdownMenu">
              {!user && (
                <>
                  <div className="menuItem" onClick={handleSignUpClick}>Sign Up</div>
                  <div className="menuItem" onClick={handleLoginClick}>Log in</div>
                </>
              )}
              {user && (
                <>
                  <Divider sx={{ width: "100%", borderColor: "#B2B4B7FF" }} />
                  <Link className="menuItem" to="/saved">Saved</Link>
                  <Link className="menuItem" to="/account">Account</Link>
                  <Link className="menuItem" to="/settings">Settings</Link>
                  <div className="logout" onClick={handleLogout}>Logout</div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <Divider sx={{ width: "100%", borderColor: "#B2B4B7FF" }} />

      {showSignUp && <SignUp onClose={closeSignUp} switchToLogin={switchToLogin} />}
      {showLogin && <Login onClose={closeLogin} switchToSignup={switchToSignup} />}
    </div>
  );
};

export default Navbar;
