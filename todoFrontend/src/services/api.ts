import axios from "axios";
import { getAccessToken } from "./tokenStore";

const api = axios.create({
    baseURL : "http://localhost:3000/api"
})

api.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
})

 
export default api;