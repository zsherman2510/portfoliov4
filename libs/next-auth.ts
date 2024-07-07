import NextAuth, { Session, User } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import connectMongo from "@/libs/mongo";
import mongoose from "mongoose";
import logo from "@/public/logoAndName.png";
import config from "@/config";

interface UserExtended extends User {
  id: string;
  businesses: string[];
  selectedBusinessId: string | null;
}

interface SessionExtended extends Session {
  user: UserExtended;
}

interface NextAuthOptionsExtended extends NextAuthOptions {
  adapter: any;
}

export const authOptions: NextAuthOptionsExtended = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name ? profile.given_name : profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: new Date(),
          businesses: [],
          selectedBusinessId: null,
        };
      },
    }),
    ...(connectMongo
      ? [
          EmailProvider({
            server: process.env.EMAIL_SERVER!,
            from: config.mailgun.fromNoReply,
          }),
        ]
      : []),
  ],
  adapter: connectMongo && MongoDBAdapter(connectMongo),
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        const userExtended: UserExtended = {
          ...session.user,
          id: token.sub as string,
          businesses: (token.businessIds as string[]) || [],
          selectedBusinessId:
            (token.selectedBusinessId as string | null) || null,
        };
        // Log for debugging
        // console.log("session userExtended", userExtended);

        return { ...session, user: userExtended } as SessionExtended;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        const client = await connectMongo;
        const db = client.db();

        const dbUser = await db
          .collection("users")
          .findOne({ _id: new mongoose.Types.ObjectId(user.id) });

        // Log for debugging
        // console.log("jwt dbUser", dbUser);

        token.businessIds =
          dbUser?.businesses?.map((business: any) => business.toString()) || [];
        token.selectedBusinessId =
          dbUser?.selectedBusinessId?.toString() || null;
      }
      // Log for debugging
      // console.log("jwt token", token);

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    brandColor: config.colors.main,
    colorScheme: "light",
    logo: logo.src,
  },
};

export default NextAuth(authOptions);
