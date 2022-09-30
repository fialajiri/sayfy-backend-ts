import { Request, Response } from "express";
import { PutObjectAclCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY as string,
  secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_KEY as string,
  region: process.env.AWS_S3_BUCKET_REGION,
});

// const client = new S3Client({
//   credentials: {
//     accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY as string,
//     secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_KEY as string,
//   },
//   region: process.env.AWS_S3_BUCKET_REGION,

// });

const uploadImage = async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;

  const key = `${fileName}/${uuidv4()}.jpg`;

  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ContentType: "image/jpeg",
    Key: key,
  };

  const command = new PutObjectAclCommand(s3Params);

  try {
    //const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
    const signedUrl = await s3.getSignedUrl("putObject", {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: "image/jpeg",
      Key: key,
    });
    console.log(signedUrl);
    res.send({ key, signedUrl });
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export default uploadImage;
