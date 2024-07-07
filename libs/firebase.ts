import admin, { ServiceAccount } from "firebase-admin";
// import serviceAccount from "@/components/autopostthat-bbfad-firebase-adminsdk-inu9a-8522ba886c.json";

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

if (!serviceAccountBase64) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_BASE64 is not set");
}

const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, "base64").toString("utf-8")
);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: "autopostthat-bbfad.appspot.com/",
  });
}
const bucket = admin.storage().bucket();

interface File {
  originalname: string;
  buffer: Buffer;
}

export async function uploadToFirebase(file: File) {
  const { originalname, buffer } = file;
  const blob = bucket.file(originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
    gzip: true,
    public: true,
  });

  return new Promise((resolve, reject) => {
    blobStream.on("error", (err) => {
      console.error("Error uploading to Firebase Storage:", err);
      reject(new Error("Could not upload file to Firebase Storage"));
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      console.log(`File ${originalname} uploaded to Firebase Storage`);
      resolve(publicUrl);
    });

    blobStream.end(buffer);
  });
}
