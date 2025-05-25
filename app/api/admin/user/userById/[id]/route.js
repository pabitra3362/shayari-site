import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { notFound, serverError, success } from "@/lib/response";
import { getUserById } from "@/lib/services/userService";


export async function GET(request, {params}){
    
    try {
        const validUser = await verifyToken(request);
        
        if(validUser?.role !== "admin"){
            throw new Error("Don't have priviledge")
        }
        
        const {id} = await params;
        
        const user = await getUserById({id: parseInt(id)});

        if(!user) return notFound({message: "User not found", success:true})

        return success({user, success:true})

    } catch (error) {
        return serverError({message: error.message, success:false})
    }
}