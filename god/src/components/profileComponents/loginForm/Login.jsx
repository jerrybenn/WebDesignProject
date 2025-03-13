import React from 'react';
import './Login.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';

const Login = ({ onClose, switchToSignup }) => {
  return (
    <div className="loginModal">
      <div className="loginContent">
        <div className="loginTop">
         
          <div className="title">Log In</div>
          <div className="closeLoginButton"><CloseIcon onClick={onClose}/></div>
        </div>

        <div className="loginBody">
          <div className="loginInputs">
            <div className="inputContainer">
              <input type="text" placeholder="Email" />
            </div>
            <div className="inputContainer">
              <input type="password" placeholder="Password" />
            </div>
          </div>

          <button className="loginButton">Log In</button>
        </div>

        <div className="dontHaveanAccount">
          Don't have an account?  
          <div className="signUpLink" onClick={switchToSignup}> Sign up here</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
