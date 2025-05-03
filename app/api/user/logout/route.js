import prisma from "@/lib/db";
import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";
import { cookies } from "next/headers";

export async function GET(req) {
  try {

    const user = await verifyToken(req);
    
    const token = req.headers.get("authorization")?.split(" ")[1] || (await cookies()).get("token")?.value;

    (await cookies()).set("token","",{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'strict',
      path: "/",
      maxAge: 24 * 24 * 60 * 7,
  })

    await prisma.blackListedToken.create({
      data: {
        token,
      },
    });

    return success({ message: "logged out successfully", success: true });
  } catch (error) {
    return serverError({
      message: error.message,
    });
  }
}
