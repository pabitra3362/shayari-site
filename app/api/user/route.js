import pool from "@/lib/db";
import { success, serverError, badRequest } from "@/lib/response";

export async function GET(){
    try {
      const allUsers = await pool.query("select * from users");
      return success(allUsers.rows);
    } catch (error) {
      return serverError({error:error.message})
    }
}


export async function POST(req){
    const {id, name, isAlive} = await req.json();

    try {
        const result = await pool.query(`insert into users values($1,$2,$3)`,[id, name, isAlive])
        console.log(result);
        if(result.rowCount > 0){
            return success({"message":"good i got it"});
        };

        return badRequest({error:"something went wrong"})
        
    } catch (error) {
        return serverError({error:error.message})
    }
}