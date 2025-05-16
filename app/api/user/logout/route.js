import prisma from "@/lib/db";
import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";
import { cookies } from "next/headers";

export async function GET(req) {

  const cookie = await cookies();
  try {
    
    const user = await verifyToken(req);
    
    const token = req.headers.get("authorization")?.split(" ")[1] || cookie?.get("token")?.value;

    cookie.set("token","",{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: 'strict',
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
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
