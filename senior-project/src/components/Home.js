import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Button, Paper } from '@mui/material';
import { Link } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
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
        <h1>{content}<br/></h1>
        <Button variant='contained'><Link to="/profile">My Profile</Link></Button>
      </div>
    </body>
  );
};
export default Home;
