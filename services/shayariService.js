
import axios from 'axios';


export async function getShayariByCategoryService({category, userId=0}){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getShayariByCategory/${category}/${userId}`,{
        withCredentials: true
    })

    return response.data;
}



export async function likeShayari({shayariId}){

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/add/like`,{ shayariId },{
        withCredentials: true,
    });
    

    return response.data;
}



export async function getAllShayari({userId=0}){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getAllShayari`,{userId: userId},{
        withCredentials: true,
    })


    return response.data;
}


// get top shayaries
export async function getTopShayaries({userId=0}){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getTopShayaries`,{userId: userId},{
        withCredentials: true,
    });

    

    return response.data;
}

// bookmark shayari
export async function bookmarkShayari({shayariId}){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/add/bookmark`,{ shayariId },{
        withCredentials: true,
    });

    return response.data;
}


// get bookmarked shayaries
export async function getBookmarkedShayaries(){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getBookmarkedShayaries`,{
        withCredentials: true,
    });


    return response.data;

}
