import axios from 'axios';


export async function getShayariByCategoryService({category}){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getShayariByCategory/${category}`,{
        withCredentials: true
    })

    return response.data;
}