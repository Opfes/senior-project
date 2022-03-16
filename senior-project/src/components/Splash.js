import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Paper } from '@mui/material';

function App() {
  return (
    <html>
      <body className='bg layer1'>
        <Grid container
          spacing={0}
          direction="column"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
            <Grid item zeroMinWidth><Paper className='paper'>
              <Grid container
              direction={'column'}
              alignItems='center'
              spacing={3}>
                <Grid item><h1>SharkBoard</h1></Grid>
                <Grid item><Button variant='contained'>Log In</Button></Grid>
                <Grid item><Button variant='contained'>Sign Up</Button></Grid>
              </Grid>
            </Paper></Grid>
        </Grid>
      </body>
    </html>
  );
}

export default App;
