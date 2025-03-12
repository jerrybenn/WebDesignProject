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

export default function churchInfo() {
  return (
    <Box className="container" sx={{maxWidth: "1200px", margin: "0 auto" }}>
      
      <Card className="rel-info">
        <div className = "cardTop">
          <img src='/RelCardImages/StMary.jpg' height={200} className='buildingIMG'/>
          <Icon/>
          <Button id= "joinButton">Join</Button>
        </div>
        <CardContent>
            <Typography gutterBottom variant="h5" className='title'>St. Mary's Church</Typography>
            {/* WIll have to add a stars component, maybe an array */}

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Assumption of the Blessed Virgin Mary <br />
              119 South Prince Street, Lancaster, PA 17603     (717) 392-2578
            </Typography>

            <Typography variant="body2" >
              Lorem ipsum odor amet, consectetuer adipiscing elit. Varius praesent rhoncus fusce mauris est parturient. Integer penatibus iaculis consequat vehicula massa nam. Per in sociosqu tortor; vulputate tellus nisl placerat. Sollicitudin dignissim congue et blandit penatibus?
            </Typography>

          </CardContent>
        {/*
        <img src='/RelCardImages/StMary.jpg' height={140} className='buildingIMG'/>
        <CardMedia component="img"
         alt="St. Mary's Church" 
         height="140" 
         width = "50"
         image="/RelCardImages/StMary.jpg" />
        <CardContent>
          <Typography gutterBottom variant="h5">St. Mary's Church</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            St. Mary’s Catholic Church<br/>
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
        </CardActions>*/}
      </Card>

    </Box>
  );
}