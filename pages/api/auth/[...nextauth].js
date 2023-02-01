import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
    providers: [
        //Google Provider
        GoogleProvider({
            clientId: "89089276805-ci2lk8c6e5c4k92f9ldmpj42fqvfg72m.apps.googleusercontent.com",
            clientSecret: "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"
        })
    ]
})