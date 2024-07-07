import connectMongo from "@/libs/mongoose";
import Profile from "@/models/Profile";
import ProfileForm from "@/components/Forms/ProfileForm";

async function getData(businessId: string) {
  await connectMongo();

  const profile = await Profile.findOne({ business: businessId }).exec();
  return profile;
}

export default async function ProfilePage({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const profile = await getData(businessId);

  const initialData = {
    xAccount: profile?.xAccount || "",
    instagramAccount: profile?.instagramAccount || "",
    linkedinAccount: profile?.linkedinAccount || "",
    facebookAccount: profile?.facebookAccount || "",
    tiktokAccount: profile?.tiktokAccount || "",
    pinterestAccount: profile?.pinterestAccount || "",
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Profile</h1>
      <ProfileForm initialData={initialData} businessId={businessId} />
    </div>
  );
}
