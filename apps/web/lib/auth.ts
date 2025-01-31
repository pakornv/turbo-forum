import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
      },
      async authorize(credentials) {
        return {
          name: credentials.username,
        } as never;
      },
    }),
  ],
});
