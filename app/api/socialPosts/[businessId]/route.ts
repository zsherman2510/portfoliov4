import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import connectMongo from "@/libs/mongoose";
import Posts from "@/models/Posts";
import { authOptions } from "@/libs/next-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { businessId: string } }
) {
  await connectMongo();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const businessId = params.businessId;
  console.log("businessId", businessId);
  if (!businessId) {
    return NextResponse.json(
      { error: "Business ID is required" },
      { status: 400 }
    );
  }

  try {
    const posts = await Posts.find({ businessId }).exec();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
