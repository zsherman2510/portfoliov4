import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";
import User from "@/models/Users";
import { authOptions } from "@/libs/next-auth";

// This route is used to retrieve the ideas for the authenticated user.
export async function GET() {
  await connectMongo();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const businesses = await Business.find({ owner: session.user.id }).exec();
    const user = await User.findById(session.user.id).select("+email").exec();
    // console.log(user, "user");
    return NextResponse.json({ businesses, loggedInUser: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
