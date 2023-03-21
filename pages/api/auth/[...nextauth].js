import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from 'next-auth/providers/facebook';


export default NextAuth({
    providers: [
        //Google Provider
        GoogleProvider({
            clientId: "89089276805-85nh0ek1kac55o2t5lo0gn0jr77cppsb.apps.googleusercontent.com",
            clientSecret: "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"
        }),

        //Facebook Provider
        FacebookProvider({
            clientId: "process.env.FACEBOOK_ID",
            clientSecret: "process.env.FACEBOOK_SECRET"
          }),
    ]
})