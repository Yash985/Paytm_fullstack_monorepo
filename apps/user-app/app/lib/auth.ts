import { Session } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

// const prisma = new PrismaClient();
export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          phone: {
            label: "Phone Number",
            type: "text",
            placeholder: "123456789",
          },
          password: { label: "Password", type: "password" },
        },
        // TODO: User credentials type from next-aut
        async authorize(credentials: any) {
          // Do zod validation, OTP validation here
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const existingUser = await prisma.user.findFirst({
            where: {
              number: credentials.phone,
            },
          });
          if (existingUser) {
            const passwordValidation = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
            if (passwordValidation) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.email,
              };
            }
            return null;
          }
  
          try {
            const user = await prisma.user.create({
              data: {
                number: credentials.phone,
                password: hashedPassword,
              },
            });
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
            };
          } catch (e) {
            console.log("Error while creating user", e);
          }
          return null;
        },
      }),
    ],
    secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async redirect({ url, baseUrl }:{url:string,baseUrl:string}) {
      // console.log("url value is", url)
      // console.log("baseURl is", baseUrl)
      return baseUrl
      },
      // TODO: can u fix the type here? Using any is bad
      async session({ token, session }:{token:JWT,session:Session}) {
            if (session.user) {
              session.user.id = token.sub || "";
          }
          return session;
      },
    },
  }