import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export async function getAllUsers (){
    const response = await axios.get(`${baseUrl}/api/admin/user/allUsers`,{
        withCredentials: true,
    });

    return response.data;
}



export async function deleteUser (id){
    const response = await axios.delete(`${baseUrl}/api/admin/user/deleteUser`,{
        data:{
            id
        },
        withCredentials: true
    })

    return response.data;
}