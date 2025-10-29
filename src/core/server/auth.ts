import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import Google from "next-auth/providers/google";
import prisma from "@/packages/prisma";
import CredentialsProviderConfig from "./credentials";

export const AuthConfig : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProviderConfig,
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
};
