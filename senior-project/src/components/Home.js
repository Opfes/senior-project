import React, { useState, useEffect, useRef } from "react";
import '../App.css';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Button, Box, Grid, Card, CardContent, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

//homepage for the client

const Home = () => {
  //array to hold content from db
  const [content, setContent] = useState([]);
  //hold the string for the post the user is typing
  const [userBite, setUserBite] = useState('');
  //length of the post the user is typing
  const [numberCharBites, setNumberCharBites] = useState(0);
  //placeholder for error messages
  const [message, setMessage] = useState("");
  //use auth service to pass down current user data
  const currentUser = AuthService.getCurrentUser();
  //form and check button import stuff
  const form = useRef();
  const checkBtn = useRef();
  //function to continually update value in the post text field
  const onChangeBite = (e) => {
    const userBite = e.target.value;
    setUserBite(userBite);
    setNumberCharBites(userBite.length);
  };
  //on page load, attempt to pull posts from db
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
        console.log(content);
      },
      (error) => {
        //catch for an error
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
  
  //handle a post to the db
  const handlePost = (e) => {
    //ensure post isn't too short
    if (numberCharBites > 0){
      //ensure it isn't too long
      if (numberCharBites < 256 && numberCharBites > 0) {
        //call the post bite function to push the data to the backend as a request
        UserService.postBite(userBite, currentUser.id).then(
          () => {
          },(error) => {
            //return errors
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          window.alert(resMessage);
          }
        )
      }else{
        window.alert("Bite cannot exceed 256 characters.");
      }
    } else {
      window.alert("Bite cannot be blank.");
    }
  }

  //function to handle deletion from database
  const handleDelete = (value) => {
    UserService.deleteBite(value).then(
      //reload on success
      () => {window.location.reload()},(error) => {
        //catch error from db or backend
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          window.alert(resMessage);
      }
    )
  }

  //html for the page, including the mapping of bites, and conditional delete button rendering
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
        <Grid item><Box sx={{maxWidth: 350}}>
          <Card sx={{backgroundColor: '#00B4D8'}}>
          <CardContent><Grid container direction="column" spacing={4}>
            <Grid item><h5><strong>Something on your mind?</strong></h5></Grid>
            <Grid item><TextField id="outlined-textarea" label="Bite" placeholder='Bite' multiline value={userBite} onChange={onChangeBite}/>{(numberCharBites > 255) ? <p style={{color:'red'}}>{numberCharBites}/255</p> : <p>{numberCharBites}/255</p>}</Grid> 
            <Grid item><Form onSubmit={handlePost} ref={form}><Button variant='contained' type="submit">Post Bite</Button><CheckButton style={{ display: "none" }} ref={checkBtn} /></Form></Grid>
            </Grid></CardContent>
          </Card>
        </Box></Grid>
        {content.map((bite)=> (
          <Grid item><Box sx={{maxWidth: 350}}>
            <Card sx={{backgroundColor: '#00B4D8'}}>
            <CardContent>
              <p style={{fontSize: 16}}>@{bite.user.username}</p>
              <p style={{fontSize: 22}}>{bite.post}</p>
              <p style={{fontSize: 14}}>{bite.createdAt}</p>
              {bite.user.username === currentUser.username && <Button variant='contained' color="error" onClick={() => handleDelete(bite.id)}>Delete</Button>}
            </CardContent>
            </Card>
          </Box></Grid>
        ))}
        </Grid>
      </div>
    </body>
  );
};
export default Home;
