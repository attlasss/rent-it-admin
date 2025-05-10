import axios from "axios";

let axiosConn = axios.create({
  baseURL: "https://rentit-backend-beige.vercel.app",
});

export default axiosConn;
