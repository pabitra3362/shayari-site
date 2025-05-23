import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";
import { deleteUserService } from "@/lib/services/userService";



export async function DELETE(req){
    try {
        const user = await verifyToken(req);

        if(user?.role !== "admin"){
            throw new Error("Don't have privilege")
        }

        const {id} = await req.json();
        
        await deleteUserService({id});
        return success({message: "Account deleted"})
    } catch (error) {
        return serverError({message: error.message})
    }
}