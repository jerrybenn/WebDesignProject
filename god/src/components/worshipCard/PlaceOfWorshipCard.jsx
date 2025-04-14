import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './PlaceOfWorshipCard.css';
import defaultChurchImage from '../assets/defaultChurchImage.jpg';
import modalChurchImage1 from '../assets/modalChurchImage1.jpg';
import modalChurchImage2 from '../assets/modalChurchImage2.jpg';
import modalChurchImage3 from '../assets/modalChurchImage3.jpg';
import modalChurchImage4 from '../assets/modalChurchImage4.jpg';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useBookmarks } from '../BookmarkContext';


export default function PlaceOfWorshipCard({ place }) {
   const [open, setOpen] = useState(false);
   const { toggleBookmark, isBookmarked } = useBookmarks();
   const bookmarked = isBookmarked(place.id);
   
   // Modal helper function
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   
   // Bookmark click
   const handleBookmarkClick = (e) => {
      e.stopPropagation();
      toggleBookmark(place);
   };

   const quiltedImages = [
      {
         img: modalChurchImage1,
         rows: 2,
         cols: 2,
      },
      {
         img: modalChurchImage2,
         rows: 1,
         cols: 2,
      },
      {
         img: modalChurchImage3,
         rows: 1,
         cols: 1,
      },
      {
         img: modalChurchImage4,
         title: 'Congregation',
         rows: 1,
         cols: 1,
      },
   ];
   
   
   return (
      <div className="card_Container">
         <div className="card" onClick={handleOpen} sx={{ cursor: 'pointer' }}>
            <div className="cardImageContainer">
               <div className="cardImage">
                  <img src={place.place_image || defaultChurchImage} alt="Church" />
               </div>
               <div className="savedIcon"></div>
               </div>
            <div className="cardContent">
               <div className="cardName">
                  {place.place_name}
               </div>
               <div className="cardLocation">
               {place.city}, {place.state}
               </div>
               <div className="cardLocation">
               {place.postal_code}
               </div>
            
               </div>
            <div className="cardActions">
               <Button 
                  size="small" 
                  component="a" 
                  href={place.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevents modal from opening when link is clicked
               >
                  Website
               </Button>
               
               <div className="bookmarkIcon" onClick={handleBookmarkClick}>
                  {bookmarked ? 
                     <BookmarkAddedIcon style={{ color: '#b4ab9c' }} /> : 
                     <BookmarkBorderIcon />
                  }
               </div>
            </div>
         </div>

         {/* Modal */}
         <Modal open={open} onClose={handleClose}>
            <Box 
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                  outline: 'none',
               }}
            >
               <div className="modalContent">
                  <div className="modalImageContainer">
                     <div className="modalLeftImage">
                        <img src={modalChurchImage1} alt="" />
                     </div>
                     <div className="modalRightImage">
                        <div className="modalRightImageTop">
                           <img src={modalChurchImage2} alt="" />
                        </div>
                        <div className="bottom">
                           <div className="modalRightBottomLeft">
                              <img src={modalChurchImage3} alt="" />
                           </div>
                           <div className="modalRightBottomRight">
                              <img src={modalChurchImage4} alt="" />
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="modalInformation">
                     <div className="modalName">
                        {place.place_name}
                     </div>
                     
                     <div className="modalDescription">
                        {place.place_description}
                     </div>
                     
                     <div className="modalLocation">
                        <div className="modalAddress">
                           {place.address}
                        </div>
                        <div className="modalCity">
                           {place.city}
                        </div>
                        <div className="modalState">
                           {place.state}
                        </div>
                        <div className="modalPostalCode">
                           {place.postal_code}
                        </div>
                        <div className="modalCountry">
                           {place.country}
                        </div>
                     </div>
                     
                     <div className="modalPhoneNumber">
                        {place.phone_number}
                     </div>
                     
                     <div className="modalSizeOfCongregation">
                        {place.SizeOfCongregation}
                     </div>
                  </div>
                  
                  <div className="modalWebsiteContainer">
                     <div className="modalWebsite">
                        <a 
                           href={place.website} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           
                        >
                           Join Today
                        </a>
                     </div>
                  </div>
               </div>
            </Box>
         </Modal>
      </div>
   );
}
