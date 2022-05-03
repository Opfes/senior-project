import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import { Paper, Grid } from '@mui/material';
import { Link } from "react-router-dom";
//ensure required fields are filled
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
//ensure email is structured as an email should be
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
//ensure valid username length
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
//ensure valid password length
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  //form components
  const form = useRef();
  const checkBtn = useRef();
  //useStates to hold variables as the page is interacted with
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  //functions to handle updating variables as the user changes them
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  //call the register function
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    //ensure all input fields meet criteria
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      //call register
      AuthService.register(username, email, password).then(
        (response) => {
          //on success
          setMessage(response.data.message);
          setSuccessful(true);
        },
        //on fail
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  //html implementing the form
  return (
    <body className="bg layer1">
      <h1 style={{padding:"20px"}}><Link to="/">SharkBoard</Link></h1>
      <Grid container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems='center'
        style={{ minHeight: '70vh' }}
      >
        <Grid item><Paper className="paper" sx={{backgroundColor:'#00B4D8', maxWidth:'250px'}}>
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div><Grid container direction="column" spacing={3}>
                <Grid item>
                  <h2>Welcome to Sharkboard!</h2>
                  <p>We're so excited to have you join our platform.<br/>Enter your information below to get started.</p>
                </Grid>
                <Grid item>
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
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
                    validations={[required, vpassword]}
                  />
                </Grid>
                <Grid item>
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </Grid>
                </Grid></div>
            )}
            {message && (
              <div className="form-group">
                <div
                  className={ successful ? "alert alert-success" : "alert alert-danger" }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </Paper></Grid>
      </Grid>
    </body>
  );
};
export default Register;
