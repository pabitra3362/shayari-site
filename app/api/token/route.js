import prisma from "@/lib/db";
import { serverError, success } from "@/lib/response";




export async function GET(){
    const currentDate = new Date();

    const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7 ));


    try {
        const result = await prisma.blackListedToken.deleteMany({
            where: {
                createdAt: {
                    lt: sevenDaysAgo
                }
            }
        })
        

        return success({deleted: result.count})
    } catch (error) {
        return serverError({message: error.message})
    }

    
}