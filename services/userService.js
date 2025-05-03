import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export async function userLogin({email, password}){
    const response = await axios.post(`${baseUrl}/api/user/login`,{email, password})

    return response.data;
}


export async function userLogout(){
    
    const response = await axios.get(`${baseUrl}/api/user/logout`,{
       withCredentials: true
    })
    

    return response.data;
}


export async function userProfile(){
    const response = await axios.get(`${baseUrl}/api/user/profile`,{
        withCredentials: true,
    })

    

    return response.data;
}