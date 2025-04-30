import { generateShayari } from "@/lib/ai/generateShayari";
import { serverError, success } from "@/lib/response";
import { saveShayariService } from "@/lib/services/shayariService";


export async function POST(){

    try {
        const shayaries = await generateShayari();
    
    if (shayaries.length === 0) throw new Error("No Shayari Generated");

    const result = await saveShayariService(shayaries);

    return success({message: `${result.count} Shayari addedd automatically`});

    } catch (error) {
        return serverError({error: error.message});
    }

}