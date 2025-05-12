import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";
import { likeShayariService } from "@/lib/services/shayariService";



export async function POST(request){

    const {shayariId} = await request.json();
    
    try {

        const user = await verifyToken(request);

        const result = await likeShayariService({ userId: user?.id, shayariId });

        return success({message: result ? "shayari unliked": "shayari liked"})

    } catch (error) {
        return serverError({error: error.message})
    }
}