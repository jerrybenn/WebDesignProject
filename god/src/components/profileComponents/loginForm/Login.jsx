import React, { useState, useContext } from 'react';
import './Login.css';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../AuthProvider';


const Login = ({ onClose, switchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Use the login function from context
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      onClose(); // Close the modal after successful login
    } catch (err) {
      setError(err.message || 'Login failed'); // Display error message
      console.error('Login error:', err); // Log the error
    }
  };

  return (
    <div className="loginModal">
      <div className="loginContent">
        <div className="loginTop">
          <div className="title">Log In</div>
          <div className="closeLoginButton">
            <CloseIcon onClick={onClose} />
          </div>
        </div>

        <div className="loginBody">
          {error && <div className="error-message">{error}</div>} {/* Display error */}
          <div className="loginInputs">
            <div className="inputContainer">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="loginButton" onClick={handleLogin}>
            Log In
          </button>
        </div>

        <div className="dontHaveanAccount">
          Don't have an account?
          <div className="signUpLink" onClick={switchToSignup}>
            Sign up here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;