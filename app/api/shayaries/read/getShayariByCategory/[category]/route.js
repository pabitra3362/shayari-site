import { serverError, success } from "@/lib/response";
import { getShayariByCategoryService } from "@/lib/services/shayariService";



export async function GET(request, {params}){
    const { category } = await params;

    try {
        const response = await getShayariByCategoryService({ category })

        return success({shayaries: response})
    } catch (error) {
        return serverError({error: error.message})
    }
}