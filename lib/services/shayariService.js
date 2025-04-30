// service layer to handle backend service and also responsible to communicate with database

import prisma from "../db";



// service to save shayaries into database
export async function saveShayariService(content){

    if(content.length == 0) throw new Error("Content is empty")
        
    const result = await prisma.shayari.createMany({
        data: content.map(({title, content, category}) => ({
            title,
            content,
            category
        }))
    })
    
    
    return result;
}


// service to fetch all the shayari from the database
export async function getALLShayariService(){

    const result = await prisma.shayari.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    
    
    return result;
    
    
}

export async function automaticDeleteShayariService(date){
   return await prisma.shayari.deleteMany({
        where:{
            createdAt:{
                lt:date
            }
        }
    })
}