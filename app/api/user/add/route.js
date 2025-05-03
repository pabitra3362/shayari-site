import { serverError, success } from '@/lib/response';
import { generateToken, safeUser } from '@/lib/services/jwtService';
import { addUserService } from '@/lib/services/userService';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';


export async function POST(request){
    const {username, email, password, role} = await request.json();


    try {
    
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await addUserService({
            username,
            email,
            password: hashedPassword,
            role
        });

        const token = generateToken({userId: user.id, role: user.role})

        (await cookies()).set("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        })

        const finalUser = safeUser(user);

        return success({message: "User registration successful", user: finalUser, token, success:true});
    } catch (error) {
        return serverError({message: error.message, success:false});
        
    }
}