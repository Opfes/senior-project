import axios from "axios";
//URL for the backend
const API_URL = "http://167.99.155.106:8080/api/auth/";
//register function with HTTP request
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};
//login function with HTTP request
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
//logout function removes user data from local storage
const logout = () => {
  localStorage.removeItem("user");
};
//pull user data from local storage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
