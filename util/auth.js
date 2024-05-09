import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import prisma from "./connection"
import { getServerSession } from "next-auth"
export const  authOptions={
        adapter:PrismaAdapter(prisma),
    
        providers: [
         
          GoogleProvider({
              clientId: process.env.Google_ID,
              clientSecret: process.env.Google_SECRET,
            }),
        ],
      
}
export const getAuthSession = () => getServerSession(authOptions)