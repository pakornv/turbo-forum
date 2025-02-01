import type { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    accessToken: string;
  }

  interface Session {
    user: User & {
      name: string;
      image: string;
      email: string;
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
  }
}

const config: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        username: {},
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3001/auth/login", {
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
            name: string;
            email: string;
            picture: string;
          }
        >(data.id_token);

        return {
          name: decoded.name,
          email: decoded.email,
          image: decoded.picture,
          accessToken: data.access_token,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
};

export const { handlers, signIn: _signIn, signOut, auth } = NextAuth(config);
export { signIn } from "./sign-in";
