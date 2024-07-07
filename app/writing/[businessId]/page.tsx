// pages/writing/[businessId]/page.tsx

import connectMongo from "@/libs/mongoose";
import Writing from "@/models/Writing";
import WritingForm from "@/components/Forms/WritingForm";

async function getData(businessId: string) {
  await connectMongo();

  const writing = await Writing.findOne({ business: businessId }).exec();
  return writing;
}

export default async function WritingPage({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const writing = await getData(businessId);

  const initialData = {
    writingStyle: writing?.writingStyle || "",
    contentTopics: writing?.contentTopics || [],
    marketPosition: writing?.marketPosition || "",
    notableInformation: writing?.notableInformation || "",
    overview: writing?.overview || "",
    services: writing?.services || [],
    targetAudience: writing?.targetAudience || "",
    uniqueSellingPoints: writing?.uniqueSellingProposition || "",
  };

  return (
    <div>
      <WritingForm initialData={initialData} businessId={businessId} />
    </div>
  );
}
