import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;


// service for user login
export async function userLogin({email, password}){
    const response = await axios.post(`${baseUrl}/api/user/login`,{email, password})

    return response.data;
}


// service for user logout
export async function userLogout(){
    
    const response = await axios.get(`${baseUrl}/api/user/logout`,{
       withCredentials: true
    })
    

    return response.data;
}



// service for user profile
export async function userProfile(){
    const response = await axios.get(`${baseUrl}/api/user/profile`,{
        withCredentials: true,
    })

    

    return response.data;
}



// service for user registration
export async function userRegister({username,email,password=""}){
    const response = await axios.post(`${baseUrl}/api/user/add`,{username, email, password})

    return response.data;
}


export async function forgetPassword({email}){
    return null;
}



export async function setNewPassword({id, role, password}){
    return null;
}