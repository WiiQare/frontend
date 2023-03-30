import NextAuth, {NextAuthOptions} from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '../../../lib/helper';

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {

                const result =  await login(credentials);

                if(result.code) throw new Error(result.message)
     
                return {name: "Peter NDENGO", email: credentials.email, id: result.access_token }
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