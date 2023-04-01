import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt(token, user) {

            if (token.user) {
                token.token = token.user;
            }

            return token;
        },
        
        async session(session, token) {

            if (session?.token?.token?.token) {
                return {user: session?.token?.token?.token, expires: session.session.expires}
            } else {
                return null   
            }
        }
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {

                const Options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: credentials.email, password: credentials.password})
                }
        
                const response = await fetch("http://34.205.37.182/api/v1/session", Options);
                const json = await response.json();
                
                return json
            }
        }),

        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    
    pages: {
        signIn: "/login"
    },
    secret: 'secretpeter'
}

export default NextAuth(authOptions)