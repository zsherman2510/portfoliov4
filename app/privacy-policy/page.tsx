import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: 2023-08-25

Thank you for visiting SocialGo ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, and protect your personal and non-personal information when you use our website located at https://www.SocialGo.com (the "Website") and our automated content creation and scheduling services (the "Services").

By accessing or using the Website and Services, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use the Website and Services.

1. Information We Collect

1.1 Personal Data

We collect the following personal information from you:

- **Name**: We collect your name to personalize your experience and communicate with you effectively.
- **Email**: We collect your email address to send you important information regarding your orders, updates, and communication.
- **Payment Information**: We collect payment details to process your orders securely. However, we do not store your payment information on our servers. Payments are processed by trusted third-party payment processors.

1.2 Non-Personal Data

We may use web cookies and similar technologies to collect non-personal information such as your IP address, browser type, device information, and browsing patterns. This information helps us to enhance your browsing experience, analyze trends, and improve our services.

2. Purpose of Data Collection

We collect and use your personal data for the sole purpose of order processing and providing our Services. This includes processing your orders, sending order confirmations, providing customer support, and keeping you updated about the status of your orders.

3. Data Sharing

We do not share your personal data with any third parties except as required for order processing (e.g., sharing your information with payment processors). We do not sell, trade, or rent your personal information to others.

4. Children's Privacy

SocialGo is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at the email address provided below.

5. Updates to the Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page, and we may notify you via email about significant changes.

6. Contact Information

If you have any questions, concerns, or requests related to this Privacy Policy, you can contact us at:

Email: support@SocialGo.com

For all other inquiries, please visit our Contact Us page on the Website.

By using SocialGo, you consent to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;