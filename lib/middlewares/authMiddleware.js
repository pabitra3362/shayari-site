import prisma from "../db";
import jwt from 'jsonwebtoken';
import { getUserById } from "../services/userService";
import { safeUser } from "../services/jwtService";


export async function verifyToken(req){
    const token = req.headers.get('authorization').split(" ")[1];

    if(!token) throw new Error("Unauthorized");

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!decode) throw new Error("Unauthorized");

    const user = await getUserById({id:decode.userId})

    if(!user) throw new Error("No user found")

    const finalUser = await safeUser(user);

    return finalUser;
}