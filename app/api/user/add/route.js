import { serverError, success } from '@/lib/response';
import { userRegisterEmailService } from '@/lib/services/emailService';
import { generateToken, safeUser } from '@/lib/services/jwtService';
import { addUserService } from '@/lib/services/userService';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';


export async function POST(request){
    const {username, email, password, role} = await request.json();
    const cookie = await cookies();


    try {

        const user = await addUserService({
            username,
            email,
            password: password,
            role
        });

        
        const token = generateToken({userId: user.id, role: user.role})

        cookie.set("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        })

        const finalUser = safeUser(user);

        return success({message: "User registration successful", user: finalUser, token, success:true});
    } catch (error) {
        return serverError({message: error.message, success:false});
        
    }
}