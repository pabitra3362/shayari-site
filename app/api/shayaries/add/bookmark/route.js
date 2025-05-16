import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";
import { bookmarkShayariService } from "@/lib/services/shayariService";



export async function POST(req){
    const { shayariId } = await req.json();

    try {
        const user = await verifyToken(req);

        const result = await bookmarkShayariService({ userId: user.id, shayariId })

        return success({message: result ? "shayari unbookmarked" : "shayari bookmarked" })

    } catch (error) {
        return serverError({error: error.message})
    }

}