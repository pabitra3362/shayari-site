import { serverError, success } from "@/lib/response";
import { automaticDeleteShayariService } from "@/lib/services/shayariService";



export async function GET(){

    const currentDate = new Date();

    const monthAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));

  try {
    
    const result = await automaticDeleteShayariService(monthAgo);

    return success({message: `${result.count} Shayari deleted successfully`});
  } catch (error) {
    return serverError({error: error.message});
  }
}