import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/libs/mongoose";
import Profile from "@/models/Profile";

export async function POST(req: NextRequest) {
  try {
    const form = await req.json();

    const businessId = form.businessId;
    const xAccount = form.xAccount;
    const instagramAccount = form.instagramAccount;
    const linkedinAccount = form.linkedinAccount;
    const facebookAccount = form.facebookAccount;

    await connectMongo();

    const newProfile = new Profile({
      business: businessId,
      xAccount,
      instagramAccount,
      linkedinAccount,
      facebookAccount,
    });

    const savedProfile = await newProfile.save();

    return NextResponse.json(savedProfile, { status: 201 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const form = await req.json();

    const { businessId } = form;
    const xAccount = form.xAccount;
    const instagramAccount = form.instagramAccount;
    const linkedinAccount = form.linkedinAccount;
    const facebookAccount = form.facebookAccount;

    await connectMongo();

    const updatedProfile = await Profile.findOneAndUpdate(
      { business: businessId },
      { xAccount, instagramAccount, linkedinAccount, facebookAccount },
      { new: true }
    );

    if (!updatedProfile) {
      return NextResponse.json(
        { error: "Profile entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile entry" },
      { status: 500 }
    );
  }
}
