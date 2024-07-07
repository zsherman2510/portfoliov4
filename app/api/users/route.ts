import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Users from "@/models/Users";

export async function GET() {
  await connectMongo();

  try {
    const users = await Users.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return NextResponse.json(
      { message: "Error retrieving users" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
