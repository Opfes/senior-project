import axios from "axios";
import authHeader from "./auth-header";
//URL of backend
const API_URL = "http://167.99.155.106:8080/api/test/";

//get unprotected content
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

//get protected information
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

//get information only for mod
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

//get information only for admins
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

//post bite, along with the post data and poster's user id
const postBite = (post, uid) => {
  return axios.post(API_URL + "postbite", {post, uid}, { headers: authHeader() });
}

//delete bite, along with targeted bite's id
const deleteBite = (id) => {
  return axios.post(API_URL + "deleteBite", {id}, { headers: authHeader() });
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  postBite,
  deleteBite
};
