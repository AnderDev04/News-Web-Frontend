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

export const GetNewsDeleted = async () =>{
    try {
        const res = await API_URL.get("api/news/full/",{
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


export const DeleteNews = async (id:number) =>{
    try {
        const res = await API_URL.delete(`api/news/${id}/`,{
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
            }
        })
        return res.data
    }
    catch (error) {
        return error
    }
}

export const DeleteNewsFull = async (id:number) =>{
    try {
        const res = await API_URL.delete(`api/news/delete/${id}/`,{
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
            }
        })
        return res.data
    }
    catch (error) {
        return error
    }
}

export const UpdatePostAPI = async (id:number,data:any) =>{
    try {
        const res = await API_URL.put(`api/news/${id}/`,data,{
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