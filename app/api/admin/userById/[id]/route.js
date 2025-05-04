import { notFound, serverError, success } from "@/lib/response";
import { getUserById } from "@/lib/services/userService";


export async function GET(request, {params}){
    const {id} = await params;
    
    try {
        const user = await getUserById({id: parseInt(id)});

        if(!user) return notFound({message: "User not found", success:true})

        return success({user, success:true})

    } catch (error) {
        return serverError({message: error.message, success:false})
    }
}