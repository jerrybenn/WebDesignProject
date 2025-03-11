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
   const navigate = useNavigate();

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 7000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="slideshow-container">
         <div
         className="slideshow-background" // New background div
         style={{ backgroundImage: `url(${images[currentIndex]})` }}
         ></div>
         <Button
            variant="contained"
            className="slideshow-button"
            onClick={() => navigate("/search")}
            sx={{
               paddingX: 6,
               paddingY: 3,
               fontSize: 20,
               backgroundColor: "#BBA590",  // Set the background color to #BBA590
               '&:hover': {
                  backgroundColor: "#9F8A6D",  // You can adjust the hover color if you want
               }
            }}
         >
            Find your Place of Worship!
         </Button>

      </div>
   );
};

export default Slideshow;