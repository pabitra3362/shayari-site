import { serverError, success } from "@/lib/response";
import { saveShayariService } from "@/lib/services/shayariService";


export async function POST(request){
    const {shayaris} = await request.json();

    
    try {
        
        if(!shayaris) throw new Error("No Shayari found");    

        const result = await saveShayariService(shayaris)

        if(result.length === 0) throw new Error("No Shayari added");

        return success({message: `${result.count} Shayari added successfully`});
    } catch (error) {
        return serverError({error: error.message});
    }
}