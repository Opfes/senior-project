import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Button, Paper } from '@mui/material';
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
        <Button variant='contained'><Link to="/profile">My Profile</Link></Button>
        {content.map((bite)=> (
          <div>
            <p>{bite.id}{bite.post}{bite.createdAt}{bite.user.username}</p>
          </div>
        ))}
      </div>
    </body>
  );
};
export default Home;
