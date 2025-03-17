import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./churchForm.css";


const churchForm = () => {
  return (
   <div className="churchFormContent">
    <div className="formTitle">Add Place of Worship</div>
    <div className="formInputs">
      <div className="formInputTitle">Worship Name</div>
      <div className="formInput">
        <input type="text" placeholder="Add Worship Name" />
      </div>      
    </div>

    <div className="formInputs">
      <div className="formInputTitle">Location</div>
      <div className="formInput">
        <input type="text" placeholder="Add Location" />
      </div>      
    </div>

    <div className="formInputs">
      <div className="formInputTitle">Website</div>
      <div className="formInput">
        <input type="text" placeholder="Add Website" />
      </div>      
    </div>
    <div className="submitContainer">
      <div className="submitButton">Submit</div>
    </div>
    

   </div>
  )
}

export default churchForm