import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";
import { getBookmarkedShayariesService } from "@/lib/services/shayariService";



export async function GET(req){
    try {
        const user = await verifyToken(req);

        const shayaries = await getBookmarkedShayariesService({ userId: user.id });
        
        return success({shayaries});

    } catch (error) {
        return serverError({error: error.message});
    }
}