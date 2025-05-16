import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";
import { saveShayariService } from "@/lib/services/shayariService";


export async function POST(request){
    const {shayaries} = await request.json();
    
    try {

        const user = await verifyToken(request);
        
        if(!shayaries) throw new Error("No Shayari found");    

        const result = await saveShayariService(shayaries)

        if(result.length === 0) throw new Error("No Shayari added");

        return success({message: `${result.count} Shayari added successfully`});
    } catch (error) {
        return serverError({error: error.message});
    }
}