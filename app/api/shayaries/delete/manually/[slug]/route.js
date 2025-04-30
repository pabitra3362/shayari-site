import { serverError, success } from "@/lib/response";
import { deleteShayariService } from "@/lib/services/shayariService";



export async function DELETE(request, {params}) {
    try {
        const { slug } = await params;
        
        const result = await deleteShayariService(parseInt(slug));

        if (!result) throw new Error("No Shayari found to be deleted");
    
        return success({ message: "Shayari deleted successfully" });
    } catch (error) {
        return serverError({ error: error.message });
    }
}
