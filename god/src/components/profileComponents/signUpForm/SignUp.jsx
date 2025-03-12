import React from 'react';
import './SignUp.css';
import CloseIcon from '@mui/icons-material/Close';

const SignUp = ({ onClose ,switchToLogin}) => {
  return (
    <div className="signupModal">
      <div className="signupContent">
        <div className="signUpTop">
        
        <div className="title">Create Your Account</div>
        <div className="closeSignUpButton"><CloseIcon onClick={onClose}/></div>

        </div>
        <div className="signUpBody">
            <div className="signUpInputs">
                <div className="nameContainer">
                    <div className="inputContainer">
                    <input type="text" placeholder='First Name'/>
                    </div>

                    <div className="inputContainer">
                    <input type="text" placeholder='Last Name'/>
                    </div>
                    

                </div>
                <div className="inputContainer">
                    <input type="text" placeholder='Email'/>
                    </div>

                    <div className="inputContainer">
                    
                    <input type="text" placeholder='Password'/>
                    </div>
            </div>
            

        </div>
    <div className="signUpButton">
        Create Account
    </div>
    <div className="alreadyGotAccount">
          Already have an account? 
          <div className="loginLink" onClick={switchToLogin}> Login Here</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
