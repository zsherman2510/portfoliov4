import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import connectMongo from "@/libs/mongoose";
import User from "@/models/Users";

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/api/auth/signin";
    return NextResponse.redirect(url);
  }

  await connectMongo();
  const user = await User.findOne({ email: token.email }).populate(
    "businesses"
  );

  if (!user || user.businesses.length === 0) {
    url.pathname = "/welcome";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/socialPosts") {
    const firstBusinessId = user.businesses[0]._id.toString();
    url.pathname = `/socialPosts/${firstBusinessId}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/socialPosts/:path*"],
};
