import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { notFound, serverError, success } from "@/lib/response";
import { getAllUserService } from "@/lib/services/userService";


export async function GET(request){
    try {
        const user = await verifyToken(request);
        if(user?.role !== "admin") throw new Error("Don't have  privilege");
        
        const users = await getAllUserService();

        if(!users) return notFound({message: "No user found", success:true})

        return success({users, success:true})
    } catch (error) {
        return serverError({message: error.message, success: false})
    }
}