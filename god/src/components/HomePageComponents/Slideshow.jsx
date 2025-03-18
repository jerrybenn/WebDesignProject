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
         setIsVisible(false); // Fade out
         setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsVisible(true); // Fade in
         }, 500); // Wait for fade-out transition (matches CSS transition time)
      }, 7000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="slideshow-container">
         <div
            className={`slideshow-background ${isVisible ? "show" : ""}`}
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
         ></div>
         <div className="slideshowButtonContainer">
         <Button
            variant="contained"
            className="slideshow-button"
            onClick={() => navigate("/search")}
            sx={{
               fontWeight: "bold",
               paddingX: 6,
               paddingY: 3,
               fontSize: 20,
               backgroundColor: "#BBA590D3",
               "&:hover": {
                  backgroundColor: "#9F8A6D",
               },
            }}
         >
            Find your Place of Worship!
         </Button>
         </div>
      </div>
   );
};

export default Slideshow;
