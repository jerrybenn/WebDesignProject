import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './PlaceOfWorshipCard.css'; // Import the CSS file


export default function PlaceOfWorshipCard({ place }) {
   return (
      <Box className="rel-card-container"> {/* Flex container */}
         <Card className="rel-card">
         <CardMedia 
            component="img"
            alt={place.place_name}
            height="140"
            image={place.image || 'assets/RelCardImages/default.jpg'} // Default image if no image is provided
         />
         <CardContent>
            <Typography gutterBottom variant="h5">
               {place.place_name}
            </Typography>
            
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               {place.place_description}<br />
               {place.address}<br />
               {place.city}, {place.state} {place.postal_code}<br />
               {place.phone_number}
            </Typography>
         </CardContent>
         
         <CardActions>
            <Button 
               size="small" 
               component="a" 
               href={place.website} 
               target="_blank" 
               rel="noopener noreferrer"
            >
               Website
            </Button>
         </CardActions>
         </Card>
      </Box>
   );
}
