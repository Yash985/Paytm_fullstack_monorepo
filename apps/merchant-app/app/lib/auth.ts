import GoogleProvider from "next-auth/providers/google";
import prisma from "@repo/db/client";
import {  Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }:{user:User}) {
      const existingUser = await prisma.merchant.findFirst({
        where: {
          email: user.email || "",
        },
        select: {
          id: true,
        },
      });
      user.id = String(existingUser?.id);
      if (!existingUser) {
        const newUser = await prisma.merchant.create({
          data: {
            auth_type: "Google", //account.provider === 'google' ? "Google" : ""
            email: user.email || "",
            name: user.name,
          },
        });
        user.id = String(newUser?.id);
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
