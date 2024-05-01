import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch("http://localhost:4000/api/v1/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status !== 200) {
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),

    // custom provider
    CredentialsProvider({
      id: "social-login",
      name: "Social Login",
      credentials: {}, // Add an empty object for the credentials property

      authorize: async (credentials: any, req) => {
        if (!credentials.token || !credentials.user) return null;
        const resp: any = {
          token: credentials.token,
          expires_at: JSON.parse(credentials.expires_at),
          user: JSON.parse(credentials.user),
        }

        return resp;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (token && new Date(token.expires_at * 1000) < new Date()) {
        return {
          ...token,
          error: "RefreshAccessTokenError" as const,
        };
      }

      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      session.token = token.token;
      session.expires = new Date(token.expires_at * 1000).toISOString();

      return session;
    },
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
