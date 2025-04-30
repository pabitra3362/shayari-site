import { serverError, success } from "@/lib/response";
import { getShayariByIdService } from "@/lib/services/shayariService";



export async function GET(request, {params}){
    const { slug } = await params;

    try {
        const result = await getShayariByIdService({id: parseInt(slug)});


        return success({data: result})
    } catch (error) {
        return serverError({error: error.message})
    }
}