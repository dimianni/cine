import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"


export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token
                if (profile && profile.id) {
                    token.id = profile.id;
                }
            }
            return token
        },
        async session({ session, token }) {
            // console.log(token);
            // session.accessToken = token.accessToken
            if (session?.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    }
}

export default NextAuth(authOptions)