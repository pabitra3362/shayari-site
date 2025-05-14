import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/middlewares/authMiddleware";
import { serverError, success } from "@/lib/response";

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const token = req.headers.get("authorization")?.split(" ")[1] || cookieStore.get("token")?.value;
    
    const user = await verifyToken(req);
    
    // Blacklist the token
    await prisma.blackListedToken.create({
      data: {
        token,
      },
    });
    
    // Now return response with Set-Cookie header to expire it
    const res = NextResponse.json({
      success: true,
      message: "Logged out successfully ",
    });
    
    
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // This will delete the cookie on client
    });
    
    
    return res;
  } catch (error) {
    return serverError({
      message: error.message,
    });
  }
}
