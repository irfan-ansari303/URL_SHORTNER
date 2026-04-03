import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Directed to Backend Port in Dev

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default api;
