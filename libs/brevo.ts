import config from "@/config";
const SibApiV3Sdk = require("@getbrevo/brevo");
let apiInstance = new SibApiV3Sdk.AccountApi();
apiInstance.setApiKey(
  SibApiV3Sdk.AccountApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || "YOUR API KEY"
);
// Configure API key authorization: api-key
apiInstance.getAccount().then(
  function (data: any) {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  },
  function (error: any) {
    console.error(error);
  }
);

if (!process.env.BREVO_API_KEY && process.env.NODE_ENV === "development") {
  console.group("⚠️ BREVO_API_KEY missing from .env");
  console.error("It's not mandatory but it's required to send emails.");
  console.error("If you don't need it, remove the code from /libs/mailgun.js");
  console.groupEnd();
}

/**
 * Sends an email using the provided parameters.
 *
 * @async
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @param {string} html - The HTML content of the email.
 * @param {string} replyTo - The email address to set as the "Reply-To" address.
 * @returns {Promise} A Promise that resolves when the email is sent.
 */
export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}): Promise<any> => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = { email: config.brevo.fromAdmin };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.subject = subject;
  if (text) sendSmtpEmail.textContent = text;
  if (html) sendSmtpEmail.htmlContent = html;
  if (replyTo) sendSmtpEmail.replyTo = { email: replyTo };

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
