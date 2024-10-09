import client from "@/lib/db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"




export const authOptions = {
  // Configure one or more authentication providers
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
],
secret: process.env.NEXTAUTH_SECRET,
adapter: MongoDBAdapter(client),
pages:{
signIn:'/Login'
},
session:{
  strategy:'jwt'
},
callbacks:{
  session: async ({token,session})=>{
    if(session?.user && token?.sub){
      session.user.id = token.sub;
    }
  return session;
  }

}

}

export default NextAuth(authOptions)