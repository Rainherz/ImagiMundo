import { AuthConfig } from "@/core/server/auth"
import NextAuth from "next-auth"

export const handler = NextAuth(AuthConfig)

export { 
    handler as GET,
    handler as POST,
}
