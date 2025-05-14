import { serverError, success } from "@/lib/response";
import { getTopShayariService } from "@/lib/services/shayariService";



export async function POST(request){
    const { userId } = await request.json();
    
    try {
        const shayaries = await getTopShayariService({userId});

        if(shayaries.length === 0) throw new Error("No Shayari found");

        return success({shayaries})
    } catch (error) {
        return serverError({error: error.message})
    }
}