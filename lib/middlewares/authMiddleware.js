import prisma from "../db";
import jwt from 'jsonwebtoken';
import { getUserById } from "../services/userService";
import { safeUser } from "../services/jwtService";
import { cookies } from "next/headers";


export async function verifyToken(req){
    const cookie = await cookies();
    const token = req.headers.get('authorization')?.split(" ")[1] || cookie.get('token')?.value;


    if(!token) throw new Error("Unauthorized");

    const isBlackListed = await prisma.blackListedToken.findUnique({
        where: {
            token
        }
    })

    
    if(isBlackListed) throw new Error("Unauthorized");

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!decode) throw new Error("Unauthorized");

    const user = await getUserById({id:decode.userId})

    if(!user) throw new Error("No user found")

    const finalUser = await safeUser(user);

    return finalUser;
}