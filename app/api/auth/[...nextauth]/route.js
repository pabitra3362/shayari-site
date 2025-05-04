import { userRegister } from '@/services/userService'
import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
  ],

  callbacks: {
    async signIn({user}) {
      await userRegister({
        username: user.name,
        email: user.email,
      })

      return true;
    }


  }
})


export { handler as GET , handler as POST };