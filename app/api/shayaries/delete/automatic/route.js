import { serverError, success } from "@/lib/response";
import { automaticDeleteShayariService } from "@/lib/services/shayariService";



export async function DELETE(){

    const currentDate = new Date();

    const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

  try {
    
    const result = await automaticDeleteShayariService(sevenDaysAgo);

    return success({message: `${result.count} Shayari deleted successfully`});
  } catch (error) {
    return serverError({error: error.message});
  }
}