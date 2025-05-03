import { serverError, success, unauthorized } from "@/lib/response";
import { comparePassword, generateToken, safeUser } from "@/lib/services/jwtService";
import { userLoginService } from "@/lib/services/userService";
import { cookies } from "next/headers";





export async function POST(request){
    const { email, password } = await request.json();

    try {
        const user = await userLoginService({ email });
        console.log("user: ",user);
        

        const isMatch = await comparePassword({
            enteredPassword:password,
            realPassword:user.password
        })

        if(!isMatch) return unauthorized({message: "Invalid credentials", success: false})
        
        const token = generateToken({userId: user.id, role: user.role})

        (await cookies()).set("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            path: "/",
            maxAge: 24 * 24 * 60 * 7,
        })

        const finalUser = safeUser(user);

        return success({message:"loggedin successfully", successf: true, user: finalUser, token})
    } catch (error) {
        console.log(error.message);
        
        return serverError({message: error.message, success: false})
    }
}