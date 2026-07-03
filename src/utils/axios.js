import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: BASE_URL,
    withCredentials: true,
});

export default api;