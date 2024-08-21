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

export const GetNewsById = async (id:number) =>{
    try {
        const res = await API_URL.get(`api/news/${id}/`,{
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

export const NewPostAPI = async (data:any) =>{
    try {
        const res = await API_URL.post("api/news/",data,{
            headers:{
                "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
            }
        })
        return res.data
    }
    catch (error) {
        return error
    }
}
