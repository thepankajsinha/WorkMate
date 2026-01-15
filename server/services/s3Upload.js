import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuid } from "uuid";
import s3 from "../config/s3.js";

export const uploadToS3 = async (file, folder, userId) => {
  if (!file) return null;

  const key = `${folder}/${userId}/${uuid()}-${file.originalname}`;

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    },
  });

  const result = await upload.done();

  return {
    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    key: key
  };
};
