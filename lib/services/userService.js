
import prisma from "../db";
import { userRegisterEmailService } from "./emailService";
import { comparePassword } from "./jwtService";


export async function addUserService({username, email, password, role="user"}){
    if(!username || !email ){
        throw new Error("All fields are required");
    }

    const existUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(existUser) {
        const isMatch = await comparePassword({enteredPassword: password, realPassword: existUser.password});
        if(!isMatch) throw new Error("User already exist");
        return existUser;
    };

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password,
            role
        }
    })


    await userRegisterEmailService({email: user.email, username: user.username })

    return user;


}



export async function getAllUserService(){
    return await prisma.user.findMany({
        orderBy:{
            id: "asc"
        }
    })
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


export async function updateUserPasswordService({id, password}) {
    if(!id || !password){
        throw new Error("All fields are required");
    }

    return await prisma.user.update({
        where: {
            id
        },
        data: {
            password
        }
    })
}


// delete user service
export async function deleteUserService({id}){
    if(!id){
        throw new Error("Id is required")
    }
    
    return await prisma.user.delete({
        where: {
            id
        }
    })
}


// update user role service
export async function updateUserRoleService({id,role}){

    if(!id || !role){
        throw new Error("All fields are required")
    }

    return await prisma.user.update({
        where:{
            id
        },
        data:{
            role
        }
    })
}

