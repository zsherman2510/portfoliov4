import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/libs/mongoose";
import Writing from "@/models/Writing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessId, writingStyle, contentTopics } = body;

    await connectMongo();

    const newWriting = new Writing({
      business: businessId,
      writingStyle,
      contentTopics,
    });

    const savedWriting = await newWriting.save();

    return NextResponse.json(savedWriting, { status: 201 });
  } catch (error) {
    console.error("Failed to create writing entry:", error);
    return NextResponse.json(
      { error: "Failed to create writing entry" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessId, writingStyle, contentTopics } = body;

    await connectMongo();

    const updatedWriting = await Writing.findOneAndUpdate(
      { businessId: businessId },
      { writingStyle, contentTopics },
      { new: true }
    );

    if (!updatedWriting) {
      return NextResponse.json(
        { error: "Writing entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedWriting);
  } catch (error) {
    console.error("Failed to update writing entry:", error);
    return NextResponse.json(
      { error: "Failed to update writing entry" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic"; // This is to force dynamic route in case of caching issues
