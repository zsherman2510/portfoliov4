import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import User from "@/models/Users";
import Business from "@/models/Business";

export async function POST(req: NextRequest) {
  const { userId, fbNotificationUrl } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  await connectMongo();

  try {
    // Delete user's businesses
    await Business.deleteMany({ owner: userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    // Notify Facebook if fbNotificationUrl is provided
    if (fbNotificationUrl) {
      await fetch(fbNotificationUrl, { method: "POST" });
    }

    return NextResponse.json(
      { message: "User data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user data" },
      { status: 500 }
    );
  }
}
