import { serverError, success } from "@/lib/response";
import { forgetPasswordEmailService } from "@/lib/services/emailService";
import { updateUserPasswordService, userLoginService } from "@/lib/services/userService"
import bcrypt from 'bcrypt';


export async function POST(req) {
    const {email} = await req.json()

    try {
        const user = await userLoginService({email});

        await forgetPasswordEmailService({email: user.email, name: user.username, id: user.id});

        return success({message: "Email sent successfully", success: true})
    } catch (error) {
        console.log(error.message);
        return serverError({message: error.message, success: false})
    }
}


export async function PUT(req){
    const {id, password} = await req.json();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await updateUserPasswordService({ id: parseInt(id), password: hashedPassword });

        return success({message: "Password updated successfully", success: true});
    } catch (error) {
        console.error(error.message);
        return serverError({message: error.message});
    }
}