"use server"
import axios from 'axios';


export async function getShayariByCategoryService({category}){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getShayariByCategory/${category}`,{
        withCredentials: true
    })

    return response.data;
}



export async function likeShayari({shayariId}){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/add/like`,{ shayariId },
    {
        withCredentials: true
    })

    return response.data;
}



export async function getAllShayari({userId=0}){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getAllShayari`,{userId})


    return response.data;
}