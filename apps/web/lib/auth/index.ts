import type { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const config: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        username: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!res.ok) return null;

        const data = await res.json();
        const decoded = jwtDecode<
          JwtPayload & {
            sub: string;
            name: string;
            picture: string;
          }
        >(data.idToken);

        return {
          id: decoded.sub,
          name: decoded.name,
          image: decoded.picture,
          accessToken: data.accessToken,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
};

export const { handlers, signIn: _signIn, signOut, auth } = NextAuth(config);
export { signIn } from "./actions";
