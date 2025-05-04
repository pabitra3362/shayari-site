import { notFound, serverError, success } from "@/lib/response";
import { getAllUserService } from "@/lib/services/userService";


export async function GET(){
    try {
        const users = await getAllUserService();

        if(!users) return notFound({message: "No user found", success:true})

        return success({users, success:true})
    } catch (error) {
        return serverError({message: error.message, success: false})
    }
}