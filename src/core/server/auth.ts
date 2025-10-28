import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import Google from "next-auth/providers/google";
import prisma from "@/packages/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
            clientId: "",
            clientSecret: ""
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            const userDB = await prisma.user.findUnique({
                where: {
                    id: user.id,
                },
            });

            if (!userDB) {
                throw new Error();
            }

            session.user = userDB;
            return session;
        },
    },
});
