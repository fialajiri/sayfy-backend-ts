import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY as string,
  secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_KEY as string,
  region: process.env.AWS_S3_BUCKET_REGION,
});

export const deleteFileFromS3 = async (key: string): Promise<void> => {
  s3.deleteObject({ Bucket: process.env.AWS_S3_BUCKET_NAME as string, Key: key });
};
