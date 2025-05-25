import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";
import { updateUserDetailsService } from "@/lib/services/userService";



export async function PUT(req){
    try {
        const user = await verifyToken(req);

        if(user?.role !== "admin"){
            throw new Error("Don't have privilege")
        }

        const {id, data} = await req.json();

        await updateUserDetailsService({id, data});

        return success({message: "User details updated"}) 

    } catch (error) {
        return serverError({message: error.message})
    }
}