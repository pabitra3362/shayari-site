import { generateToken } from "@/lib/services/jwtService";
import { userRegister } from "@/services/userService";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";


const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  
  callbacks: {
    async signIn({ user }) {
      try {
        const cookie = await cookies();
        
        const localUser = await userRegister({
          username: user.name,
          email: user.email,
        });
        

        const token = generateToken({userId: localUser.user.id, role: localUser.user.role});
        cookie.set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 7 * 24 * 60 * 60,
        })
        return true;
      } catch (error) {
        console.error("Error registering user: ", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
