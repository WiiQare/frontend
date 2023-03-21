import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";


export default NextAuth({
    providers: [
        //Google Provider
        GoogleProvider({
            clientId: "89089276805-85nh0ek1kac55o2t5lo0gn0jr77cppsb.apps.googleusercontent.com",
            clientSecret: "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"
        }),

        //LinkedIn Provider
        LinkedInProvider({
            clientId: "86r44ozblb9me7",
            clientSecret: "p6wdfKr7Xzvhd3CL"
          })
    ]
})