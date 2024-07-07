import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const createPresignedPostUrl = async (
  filename: string,
  contentType: string
) => {
  try {
    const { url, fields } = await createPresignedPost(s3, {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `logo/${uuidv4()}_${filename}`,
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 600 by default.
    });

    return { url, fields };
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw new Error("Could not generate presigned URL");
  }
};

export const uploadToS3 = async (
  file: File,
  presignedUrl: string,
  fields: any
) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  formData.append("file", file);

  const response = await fetch(presignedUrl, {
    method: "POST",
    body: formData,
  });

  console.log(response, "response");

  if (!response.ok) {
    throw new Error("Failed to upload file to S3");
  }

  return presignedUrl + fields.Key;
};
