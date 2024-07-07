import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";
import User from "@/models/Users";
import Writing from "@/models/Writing";
import Profile from "@/models/Profile";
import { uploadToFirebase } from "@/libs/firebase"; // Ensure this path matches your setup

export async function POST(req: NextRequest) {
  const form = await req.formData();

  // Extract the form fields
  const businessName = form.get("businessName") as string;
  const industry = form.get("industry") as string;
  const businessDescription = form.get("businessDescription") as string;
  const contactEmail = form.get("contactEmail") as string;
  const contactPhone = form.get("contactPhone") as string | null;
  const website = form.get("website") as string | null;
  const tagline = form.get("tagline") as string;
  const socialHandle = form.get("socialHandle") as string | null;
  const writingStyle = form.get("writingStyle") as string;
  const contentTopics = form.getAll("contentTopics") as string[];
  const brandColor = form.get("brandColor") as string | null;
  const secondaryColor = form.get("secondaryColor") as string | null;
  const accentColor = form.get("accentColor") as string | null;
  const referral = form.get("referral") as string | null;

  const file: File = form.get("logo") as unknown as File;
  const userId = form.get("userId") as string;

  const marketPosition = form.get("marketPosition") as string | null;
  const notableInformation = form.get("notableInformation") as string | null;
  const overview = form.get("overview") as string | null;
  const services = form.getAll("services") as string[];
  const targetAudience = form.get("targetAudience") as string | null;
  const uniqueSellingProposition = form.getAll(
    "uniqueSellingProposition"
  ) as string[];

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const logoUrl = await uploadToFirebase({
      originalname: file.name,
      buffer,
    });

    await connectMongo();

    // Create the new business entry first
    const newBusiness = new Business({
      businessName,
      industry,
      owner: userId,
      businessDescription,
      contactEmail,
      contactPhone,
      website,
      tagline,
      referral,
      logo: logoUrl,
      brandColor,
      secondaryColor,
      accentColor,
    });

    const savedBusiness = await newBusiness.save();

    // Create Writing, Branding, and Profile entries referencing the business
    const newWriting = new Writing({
      business: savedBusiness._id,
      writingStyle,
      contentTopics,
      marketPosition,
      notableInformation,
      overview,
      services,
      targetAudience,
      uniqueSellingProposition,
    });

    const newProfile = new Profile({
      business: savedBusiness._id,
      socialHandle,
    });

    await newWriting.save();
    await newProfile.save();

    // Update the user with the new business ID
    await User.findByIdAndUpdate(userId, {
      $push: { businesses: savedBusiness.id },
      $set: { selectedBusinessId: savedBusiness.id },
    });

    return NextResponse.json(savedBusiness);
  } catch (error) {
    console.error("Error uploading to Firebase:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const form = await req.formData();

    // Extract the form fields
    const businessName = form.get("businessName") as string;
    const industry = form.get("industry") as string;
    const businessDescription = form.get("businessDescription") as string;
    const contactEmail = form.get("contactEmail") as string;
    const contactPhone = form.get("contactPhone") as string | null;
    const website = form.get("website") as string | null;
    const tagline = form.get("tagline") as string;
    const brandColor = form.get("brandColor") as string | null;
    const secondaryColor = form.get("secondaryColor") as string | null;
    const accentColor = form.get("accentColor") as string | null;
    const referral = form.get("referral") as string | null;
    // const userId = form.get("userId") as string;
    const businessId = form.get("businessId") as string;

    // Extract the logo file if it exists
    const file: File | null = form.get("logo") as unknown as File | null;

    let logoUrl = form.get("logoUrl") as string;

    // If there's a new logo, upload it to Firebase
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadedLogo = await uploadToFirebase({
        originalname: file.name,
        buffer,
      });

      logoUrl = uploadedLogo as string;
    }

    await connectMongo();

    // Update the existing business entry
    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      {
        businessName,
        industry,
        businessDescription,
        contactEmail,
        contactPhone,
        website,
        tagline,
        referral,
        logo: logoUrl,
        brandColor,
        secondaryColor,
        accentColor,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedBusiness) {
      throw new Error("Business not found");
    }

    return NextResponse.json(updatedBusiness);
  } catch (error) {
    console.error("Error updating business:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
