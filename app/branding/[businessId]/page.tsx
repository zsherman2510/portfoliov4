import connectMongo from "@/libs/mongoose";
import Business from "@/models/Business";
import BusinessForm from "@/components/Forms/BusinessForm";

async function getData(businessId: string) {
  await connectMongo();

  const business = await Business.findById(businessId).exec();
  return business;
}

export default async function BusinessPage({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const business = await getData(businessId);

  const initialData = {
    businessName: business.businessName,
    businessDescription: business.businessDescription,
    contactEmail: business.contactEmail,
    website: business.website || "",
    tagline: business.tagline,
    industry: business.industry || "",
    logo: business.logo,
    brandColor: business.brandColor,
    secondaryColor: business.secondaryColor,
    accentColor: business.accentColor,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Brand</h1>
      <BusinessForm initialData={initialData} businessId={businessId} />
    </div>
  );
}
