
import prisma from "../db";


export async function addUserService({username, email, password, role="user"}){
    if(!username || !email || !password){
        throw new Error("All fields are required");
    }

    const existUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(existUser) return existUser;

    return await prisma.user.create({
        data: {
            username,
            email,
            password,
            role
        }
    })

}



export async function getAllUserService(){
    return await prisma.user.findMany()
}



export async function getUserById({id}){
    if(!id){
        throw new Error("id is required")
    }

    return await prisma.user.findUnique({
        where:{
            id
        }
    })
}



export async function userLoginService({ email }){
    if(!email) throw new Error("Email is required")

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })


    if(!user) throw new Error("Invalid credentials");

    return user;
}

