import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";


export default NextAuth({
    providers: [
        //Google Provider
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        }),

        //LinkedIn Provider
        LinkedInProvider({
            clientId: "86r44ozblb9me7",
            clientSecret: "p6wdfKr7Xzvhd3CL"
          })
    ]
})