import axios from "axios";

const API_BASE_URL = ""; // Assuming it's on the same domain or proxied

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default api;
