import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './RelCard.css'; // Import the CSS file

export default function RelCards() {
  return (
    <Box className="rel-card-container"> {/* Flex container */}
      {/* First Card */}
      <Card className="rel-card">
        <CardMedia component="img"
         alt="St. Mary's Church" 
         height="140" 
         image="/RelCardImages/StMary.jpg" />

        <CardContent>
          <Typography gutterBottom variant="h5">St. Mary's Church</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            St. Mary’s Catholic Church<br />
            Assumption of the Blessed Virgin Mary <br />
            119 South Prince Street, Lancaster, PA 17603<br />
            (717) 392-2578
          </Typography>

        </CardContent>

        <CardActions>
          <Button size="small" 
          component="a" href="https://stmaryslancaster.org/" 
          target="_blank" rel="noopener noreferrer">
            Website
          </Button>
        </CardActions>
      </Card>

      {/* Second Card */}
      <Card className="rel-card">

        <CardMedia component="img" 
        alt="Grace Church Dover" 
        height="140" 
        image="/RelCardImages/gracechurchdover.jpg"  />
        <CardContent>

          <Typography gutterBottom variant="h5">Grace Church Dover</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Grace Church Dover<br />
            350 McKee Rd, Dover, DE 19904<br />
            (302) 734-8150
          </Typography>

        </CardContent>

        <CardActions>
          <Button size="small" 
          component="a" href="https://www.gracedover.com/" 
          target="_blank" rel="noopener noreferrer">
            Website
          </Button>

        </CardActions>
      </Card>
    </Box>
  );
}
