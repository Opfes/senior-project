import React, { useState, useEffect, useRef } from "react";
import '../App.css';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Button, Box, Grid, Card, CardContent, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

const Home = () => {
  const [content, setContent] = useState([]);
  const [userBite, setUserBite] = useState('');
  const [numberCharBites, setNumberCharBites] = useState(0);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const form = useRef();
  const checkBtn = useRef();
  const onChangeBite = (e) => {
    const userBite = e.target.value;
    setUserBite(userBite);
    setNumberCharBites(userBite.length);
  };
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
  
  const handlePost = (e) => {
    if (numberCharBites > 0){
      if (numberCharBites < 256 && numberCharBites > 0) {
        console.log("post validated");
        UserService.postBite(userBite, currentUser.id).then(
          () => {
          },(error) => {
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
            <Grid item><Form onSubmit={handlePost} ref={form}><button >Post Bite</button><CheckButton style={{ display: "none" }} ref={checkBtn} /></Form></Grid>
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
