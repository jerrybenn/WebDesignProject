import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './PlaceOfWorshipCard.css'; // Import the CSS file


export default function PlaceOfWorshipCard() {
   return (
      <Box className="rel-card-container"> {/* Flex container */}
         <Card className="rel-card">
            <CardMedia component="img"
               alt="St. Mary's Church" 
               height="140" 
               image="assets/RelCardImages/StMary.jpg" 
            />
            <CardContent>
               <Typography gutterBottom variant="h5">
                  St. Mary's Church
               </Typography>
               
               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  St. Mary’s Catholic Church<br />
                  Assumption of the Blessed Virgin Mary <br />
                  119 South Prince Street, Lancaster, PA 17603<br />
                  (717) 392-2578
               </Typography>
            </CardContent>
            
            <CardActions>
               <Button size="small" 
                  component="a" 
                  href="https://stmaryslancaster.org/" 
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