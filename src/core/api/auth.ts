import axios from "axios"

export const API_URL = axios.create({
    baseURL: "http://localhost:8000"
}) 

axios.defaults.withCredentials = true

