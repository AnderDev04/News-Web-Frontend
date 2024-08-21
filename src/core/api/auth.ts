import axios from "axios"

export const API_URL = axios.create({
    baseURL: "http://localhost:8000"
}) 

axios.defaults.withCredentials = true

export const LoginAPI = async (data: any) => {
    try{
        const res = await API_URL.post('/auth/api/token/', data);
        return res.data;
    }
    catch(error){
        return error;
    }
}

