import { serverError, success, unauthorized } from "@/lib/response";
import { comparePassword, generateToken, safeUser } from "@/lib/services/jwtService";
import { userLoginService } from "@/lib/services/userService";





export async function POST(request){
    const { email, password } = await request.json();

    try {
        const user = await userLoginService({ email });

        const isMatch = await comparePassword({
            enteredPassword:password,
            realPassword:user.password
        })

        if(!isMatch) return unauthorized({message: "Invalid credentials", success: false})
        
        const token = generateToken({userId: user.id, role: user.role})

        const finalUser = safeUser(user);

        return success({message:"loggedin successfully", successf: true, user: finalUser, token})
    } catch (error) {
        return serverError({message: error.message, success: false})
    }
}