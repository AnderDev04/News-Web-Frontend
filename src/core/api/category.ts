import { API_URL } from "./auth";


export const GetCategories = async () =>{
    try {
        const res = await API_URL.get("api/category/",{
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