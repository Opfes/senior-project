import React, { useState, useEffect } from "react";
import '../App.css';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Button, Box, Grid, Card, CardContent } from '@mui/material';
import { Link } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
        console.log(content);
      },
      (error) => {
        const _content =
          (error.response && 
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);



  return (
    <body>
      <div className="bg layer1">
        <h1 style={{padding:"20px"}}>SharkBoard</h1>
        <Button variant='contained'><Link to="/profile">My Profile</Link></Button>
        <Grid container
        wrap='wrap'
        justifyContent="center"
        spacing={7}
        alignItems='center'
        style={{padding:'20px'}}>
        {content.map((bite)=> (
          <Grid item><Box sx={{maxWidth: 350}}>
            <Card sx={{backgroundColor: '#00B4D8'}}>
            <CardContent>
              <p style={{fontSize: 16}}>@{bite.user.username}</p>
              <p style={{fontSize: 22}}>{bite.post}</p>
              <p style={{fontSize: 14}}>{bite.createdAt}</p>
            </CardContent>
            </Card>
          </Box></Grid>
        ))}
          <Grid item><Box sx={{maxWidth: 350}}>
            <Card sx={{backgroundColor: '#00B4D8'}}>
            <CardContent>
              <p style={{fontSize: 16}}>@user</p>
              <p style={{fontSize: 22}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p style={{fontSize: 14}}>4/12/2021</p>
            </CardContent>
            </Card>
          </Box></Grid>
          <Grid item><Card sx={{backgroundColor: '#00B4D8'}}>
            <CardContent>
              <p style={{fontSize: 16}}>@user</p>
              <p style={{fontSize: 22}}>tweet data</p>
              <p style={{fontSize: 14}}>4/12/2021</p>
            </CardContent>
          </Card></Grid>
        </Grid>
      </div>
    </body>
  );
};
export default Home;
