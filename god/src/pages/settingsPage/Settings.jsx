import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings updated successfully!');
    console.log('Updated Settings:', formData);
  };

  return (
    <div className="settings-page">
      <div className="settings-form-container">
        <h2>Settings</h2>
        <form onSubmit={handleSubmit} className="settings-form">
          <label>
            Name:
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter your name" 
            />
          </label>

          <label>
            Phone Number:
            <input 
              type="tel" 
              name="number" 
              value={formData.number} 
              onChange={handleChange} 
              placeholder="Enter your number" 
            />
          </label>

          <label>
            Email:
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
            />
          </label>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
