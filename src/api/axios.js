import axios from "axios";

const api = axios.create({
  baseURL: "https://mi-api.railway.app", // Reemplaza con tu URL de Railway
  headers: { "Content-Type": "application/json" }
});

export default api;
