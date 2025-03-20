import * as React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './churchInfo.css';
import Icon from '../religionIcon/religionIcon';
import Rating from './star';

export default function churchInfo() {
  return (
    <Box className="churchContainer" sx={{maxWidth: "1200px", margin: "0 auto" }}>
      
      <Card className="rel-info">
        <div className = "cardTop">
          <img src='assets/RelCardImages/StMary.jpg' height={200} className='buildingIMG'/>
          <div className='self'>
          <Icon/>
          <Button id= "joinButton">Join</Button>
          </div>
          
        </div>
        <CardContent>
            <Typography gutterBottom variant="h4" className='title'>St. Mary's Church <Rating rating = {4}/></Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "20px"}}>
              Assumption of the Blessed Virgin Mary
              <Button size="large" 
              component="a" href="https://stmaryslancaster.org/" 
              target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                Website
              </Button>
              <br />
              119 South Prince Street, Lancaster, PA 17603     (717) 392-2578
            </Typography>

            <Typography variant="body2" sx={{fontSize: "15px"}}>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Varius praesent rhoncus fusce mauris est parturient. Integer penatibus iaculis consequat vehicula massa nam. Per in sociosqu tortor; vulputate tellus nisl placerat. Sollicitudin dignissim congue et blandit penatibus?
            </Typography>

          </CardContent>
      </Card>

    </Box>
  );
}