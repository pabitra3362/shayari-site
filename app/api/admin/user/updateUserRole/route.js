import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";
import { updateUserRoleService } from "@/lib/services/userService";



export async function PUT(req){
    try {
        const user = await verifyToken(req);

        if(user?.role !== "admin"){
            throw new Error("Don't have privilege")
        }

        const {id, role} = await req.json();

        updateUserRoleService({id, role});

        return success({message: "Role updated"}) 

    } catch (error) {
        return serverError({message: error.message})
    }
}