import axios from "axios";
import { baseUrl } from "./Api";
import Cookie from "cookie-universal";
import i18n from "i18next";

const cookie = Cookie();
const token = cookie.get("Bearer");

export const Axios = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: "Bearer " + token },
});

Axios.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language; 
  
  return config;
}, (error) => {
  return Promise.reject(error);
});