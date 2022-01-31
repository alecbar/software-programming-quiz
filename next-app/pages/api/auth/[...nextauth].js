import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";

export default NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: process.env.COGNITO_ISSUER,
        })
    ],
    debug: process.env.VERCEL_ENV ? false: true,
    secret: process.env.NEXTAUTH_SECRET
})