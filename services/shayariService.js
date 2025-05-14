
import api from '@/lib/axios';
import axios from 'axios';


export async function getShayariByCategoryService({category}){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getShayariByCategory/${category}`,{
        withCredentials: true
    })

    return response.data;
}



export async function likeShayari({shayariId}){

    // const token = cookies().get("token")?.value();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/add/like`,{ shayariId },{
        withCredentials: true,
    });
    

    return response.data;
}



export async function getAllShayari({userId=0}){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getAllShayari`,{userId},{
        withCredentials: true,
    })


    return response.data;
}


// get top shayaries
export async function getTopShayaries({userId=0}){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getTopShayaries`,{userId},{
        withCredentials: true,
    });

    

    return response.data;
}
