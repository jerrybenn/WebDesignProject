import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Slideshow.css";

const images = [
   "/assets/ChurchImages/church_0.jpg",
   "/assets/ChurchImages/church_1.jpg",
   "/assets/MosqueImages/mosque_0.jpg",
   "/assets/MosqueImages/mosque_1.jpg",
];

const Slideshow = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isVisible, setIsVisible] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      const interval = setInterval(() => {
         setIsVisible(false);
         setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsVisible(true);
         }, 500);
      }, 7000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="slideshow-container">
         <div
            className={`slideshow-background ${isVisible ? "show" : ""}`}
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
         />
         <div className="slideshow-overlay" />
         <div className="slideshow-content">
            <div className="text-box">
               <h1 className="slideshow-title">Find your place of worship</h1>
               <p className="slideshow-subtitle">
                  Discover and connect with spiritual communities near you
               </p>
               <Button
                  variant="contained"
                  className="slideshow-button"
                  onClick={() => navigate("/search")}
               >
                  Explore Now
               </Button>
            </div>
         </div>
      </div>
   );
};

export default Slideshow;
