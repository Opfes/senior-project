import React from "react";
import AuthService from "../services/auth.service";
import "../App.css";
import { Link } from 'react-router-dom';
import { Grid, Button, Paper } from '@mui/material';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <body className="bg layer1">
      <h1 style={{padding:"20px"}}><Link to="/">SharkBoard</Link></h1>
      <Grid container
          spacing={0}
          direction="column"
          justifyContent="center"
          style={{ minHeight: '75vh' }}
        >
            <Grid item><Paper className='paper'>
              <Grid container
              direction={'column'}
              alignItems='center'
              spacing={3}>
                <Grid item><h1>Welcome!</h1></Grid>
                <Grid item><h3><strong>{currentUser.username}</strong> Profile</h3></Grid>
                <Grid item><p><strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                  {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}</p></Grid>
                <Grid item><p><strong>Id:</strong> {currentUser.id}</p></Grid>
                <Grid item><p><strong>Email:</strong> {currentUser.email}</p></Grid>
                <Grid item><strong>Authorities:</strong></Grid>
                <Grid item>{currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}</Grid>
                <Grid item><Button variant='contained'><a href="/login" className="nav-link" onClick={logOut}>LogOut</a></Button></Grid>
              </Grid>
            </Paper></Grid>
        </Grid>
    </body>
  );
};
export default Profile;
