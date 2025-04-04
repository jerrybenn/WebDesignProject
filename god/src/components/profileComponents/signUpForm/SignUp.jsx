import React from 'react';
import './SignUp.css';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import api from '../../../api';


const SignUp = ({ onClose ,switchToLogin}) => {

  const [signUpData, setSignUpData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    role_id : 2
  });

  const handleChange = function(e){
    setSignUpData({...signUpData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async function(e) {
    console.log("SignUp Data: ", signUpData);
    e.preventDefault()
    try {
      const response = await api.post("/users/create/", signUpData)
      alert("Account created")
      //alert(response.data)
    } catch (error) {
      console.error("Could not create account:", error)
      alert("Could not sign up")      
    }
    onClose()
  }

  return (
    <div className="signupModal">
      <div className="signupContent">
        <div className="signUpTop">
        
          <div className="title">Create Your Account</div>
          <div className="closeSignUpButton"><CloseIcon onClick={onClose}/></div>
 
        </div>

        <form onSubmit={handleSubmit}>
        <div className="signUpBody">
            <div className="signUpInputs">
                <div className="nameContainer">
                    <div className="inputContainer">
                    <input type="text" name='first_name' placeholder='First Name' value={signUpData.first_name} onChange={handleChange} required/>
                    </div>

                    <div className="inputContainer">
                    <input type="text" name='last_name' placeholder='Last Name' value={signUpData.last_name} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="inputContainer">
                  <input type="text" name='username' placeholder='User Name' value={signUpData.username} onChange={handleChange} required/>
                </div>
                <div className="inputContainer">
                  <input type="email" name='email' placeholder='Email' value={signUpData.email} onChange={handleChange} required/>
                </div>

                <div className="inputContainer">
                  <input type="password"  name='password' placeholder='Password' value={signUpData.password} onChange={handleChange} required/>
                </div>
            </div>
            

        </div>
      <button className="signUpButton" type='submit'>
          Create Account
      </button>
    </form>
    <div className="alreadyGotAccount">
          Already have an account? 
          <div className="loginLink" onClick={switchToLogin}> Login Here</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
