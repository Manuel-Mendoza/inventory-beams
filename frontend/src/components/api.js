import axios from "axios";

const API_BASE = "http://192.168.254.60:8000/api/"; // Cambia esto si es necesario

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
