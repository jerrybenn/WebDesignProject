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
        <input type="text" placeholder="Enter Worship Name" />
      </div>      
    </div>
    <div className="locationContainer">
      <div className="formInputs">
        <div className="formInputTitle">Address</div>
        <div className="formInput">
          <input type="text" placeholder="Enter Address" />
      </div>      
      </div>

      <div className="formInputs">
        <div className="formInputTitle">Zip Code</div>
        <div className="formInput">
          <input type="text" placeholder="Enter Zip Code" />
      </div>      
      </div>
    </div>

    <div className="locationContainer">
      <div className="formInputs">
        <div className="formInputTitle">City</div>
        <div className="formInput">
          <input type="text" placeholder="Enter City" />
      </div>      
      </div>

      <div className="formInputs">
        <div className="formInputTitle">State</div>
        <div className="formInput">
          <input type="text" placeholder="Enter State" />
      </div>      
      </div>

      <div className="formInputs">
        <div className="formInputTitle">Country</div>
        <div className="formInput">
          <input type="text" placeholder="Enter Country" />
      </div>      
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