import { notFound, serverError, success } from "@/lib/response";
import { getALLShayariService } from "@/lib/services/shayariService";




export async function GET(){
    try {
        const shayaries = await getALLShayariService();

        if(shayaries.length === 0) throw new Error("No Shayari found");

        return success({shayaries});
    } catch (error) {
        return serverError({error: error.message});
    }
}