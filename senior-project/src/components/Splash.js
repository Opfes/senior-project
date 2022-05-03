import '../App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Paper } from '@mui/material';
import { Link } from "react-router-dom";

//https://app.haikei.app/
//https://fireship.io/lessons/wavy-backgrounds/
//https://colorhunt.co/palette/03045e00b4d890e0efcaf0f8

//This page is just the default landing and allows users to navigate to sign up or login

function Splash() {
  return (
    <html>
      <body className='bg layer1'>
        <h1 style={{padding:"20px"}}>SharkBoard</h1>
        <Grid container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems='center'
          style={{ minHeight: '75vh'}}
        >
            <Grid item><Paper className='paper' sx={{backgroundColor:'#00B4D8',}}>
              <Grid container
              direction={'column'}
              alignItems='center'
              spacing={3}
              >
                <Grid item><h1>Welcome!</h1></Grid>
                <Grid item><Button variant='contained'><Link to="/login">Log In</Link></Button></Grid>
                <Grid item><Button variant='contained'><Link to="/register">Sign Up</Link></Button></Grid>
              </Grid>
            </Paper></Grid>
        </Grid>
      </body>
    </html>
  );
}

export default Splash;
