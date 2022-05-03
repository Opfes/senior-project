import React, { useState, useRef } from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Grid } from '@mui/material';
//if a required field is left blank
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  //instantiate form features from react-validate
  const form = useRef();
  const checkBtn = useRef();
  //navigate from react-router
  let navigate = useNavigate();
  //useStates to hold different values passed in from the page
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  //onchange functions to keep track of what users are typing, as they are typing it
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  //functin that actually calls the login
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    //checks to ensure data on page passes all checks for validation
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      //attempt the login
      AuthService.login(username, password).then(
        () => {
          //if successful, redirect and reload
          navigate("/");
          window.location.reload();
        },
        //else, pass error message
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  //html including the form that handles the inputs for login
  return (
    <body className="bg layer1">
      <h1 style={{padding:"20px"}}><Link to="/">SharkBoard</Link></h1>
      <Grid container
        spacing={0}
        direction="column"
        justifyContent="center"
        style={{ minHeight: '70vh' }}
      >
        <Grid item><Paper className="paper" sx={{backgroundColor:'#00B4D8', maxWidth:'250px'}}>
          <Form onSubmit={handleLogin} ref={form}><Grid container direction="column" spacing={3}>
            <Grid item>
              <h2>Welcome back!</h2>
            </Grid>
            <Grid item>
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </Grid>
            <Grid item>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </Grid>
            <Grid item>
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </Grid>
            {message && (
              <Grid item>
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </Grid>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Grid></Form>
        </Paper></Grid>
      </Grid>
    </body>
  );
};
export default Login;
