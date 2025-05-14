import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";



export async function GET(req){
    try {
        const user = await verifyToken(req);
        
        return success({user, success: true});
    } catch (error) {
        return serverError({message: error.message, success: false});
    }
}