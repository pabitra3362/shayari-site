// service layer to handle backend service and also responsible to communicate with database

import prisma from "../db";
import { ProperCase } from "../utils";



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



// service to get shayari by id
export async function getShayariByIdService({id}){
    return await prisma.shayari.findUnique({
        where: {
            id
        }
    })
}


// service to get top shayries
export async function getTopShayariService(){
    return await prisma.shayari.findMany({
        orderBy: {
            likes: 'desc'
        },
        take: 30
    })
}


// service to delete 7 days older shayari
export async function automaticDeleteShayariService(date){
   return await prisma.shayari.deleteMany({
        where:{
            createdAt:{
                lt:date
            }
        }
    })
}



// service to delete shayari by id
export async function deleteShayariService(id){
    return await prisma.shayari.delete({
        where: {
            id
        }
    })
}



// service to update shayari
export async function updateShayariService({id, title, content, category, likes }){
    return await prisma.shayari.update({
        where: {
            id
        },
        data: {
            title,
            content,
            category,
            likes
        }
    })
}


// service to get shayari by category
export async function getShayariByCategoryService({category}){
    return await prisma.shayari.findMany({
        where: {
            category: ProperCase(category)
        },
        orderBy: {
            id: "desc"
        }
    })
}