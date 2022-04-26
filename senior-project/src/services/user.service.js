import axios from "axios";
import authHeader from "./auth-header";
//this will likely need to updated w/ server IP
const API_URL = "http://167.99.155.106:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const postBite = (post, uid) => {
  return axios.post(API_URL + "postbite", {post, uid}, { headers: authHeader() });
}

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
