// libs/auth.ts
import { getServerSession } from "next-auth";
import Users from "@/models/Users";
import connectMongo from "@/libs/mongoose";
import { authOptions } from "./next-auth";

export const getUserFromSession = async () => {
  await connectMongo();
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const user = await Users.findOne({ email: session.user.email });
  console.log("user", user);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
