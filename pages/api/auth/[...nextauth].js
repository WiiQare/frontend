import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  session: {
    maxAge: 85000,
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
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
    },
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
          body: JSON.stringify({ email: credentials.email, password: credentials.password })
        }
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/session`;
        const response = await fetch(url, Options);
        const json = await response.json();

        if (json.code) throw new Error(json.description);
        if (json.type != 'PAYER')
          throw new Error("Vous n'êtes pas authoriser de vous connecter");

        return json;
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: '/login',
  },
  secret: 'secretpeterwiiqareuniceftoken',
};

export default NextAuth(authOptions);
