import { API_URL } from "./auth";


export const GetNews = async () =>{
    try {
        const res = await API_URL.get("api/news/",{
            headers:{
                "Content-Type":"application/json"
            }
        })
        return res.data
    }
    catch (error) {
        return error
    }
}