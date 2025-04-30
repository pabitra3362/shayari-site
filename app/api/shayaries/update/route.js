import { serverError, success } from "@/lib/response";
import { updateShayariService } from "@/lib/services/shayariService";



export async function PUT(request){

    const {id, title, content, category, likes} = await request.json();
    
    try {
        const result = await updateShayariService({id, title, content, category, likes});
        

        return success({message: `${result.count} Shayari Updated successfully`});

    } catch (error) {
        return serverError({error: error.message})
    }
}