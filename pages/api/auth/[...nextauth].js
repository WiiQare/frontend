import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({token, user}) {

            if (user) {
                token.id = user.access_token;
                token.data = user;
            }

            return token;
        },
        
        async session({ session, token, user }) {

            session.user.id = token.id;
            session.user.data = token.data;
            session.accessToken = token.id;
            return session;
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

                if(json.code) throw new Error(json.message)
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
    secret: 'secretpeterwiiqareuniceftoken'
}

export default NextAuth(authOptions)