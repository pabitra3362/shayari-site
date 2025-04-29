// controllers for handling backend functions


import prisma from "../db";
import { badRequest, serverError, success } from "../response";
import { getALLShayariService, saveShayariService } from "../services/shayariService";


// controller for save shayari in database
export async function saveShayari(content=[]){

    try {
        const result = await saveShayariService(content);
        

        if(result.count == 0) return badRequest({error: "Shayari not saved"});

        return success({message: "Shayari saved successfully"});

    } catch (error) {
        return serverError({error:error.message});
    }

    
}



// controller to fetch all shayari from database
export async function getAllShayari(){

    try {
        
        const result = await getALLShayariService();

        return success({data: result});
    } catch (error) {
        return serverError({error:error.message});
    }
}