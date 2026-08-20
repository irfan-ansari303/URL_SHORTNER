import axios from "axios";

// Empty base URL uses same origin (production) or Vite proxy (dev).
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default api;
