import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv'
import type { CsvFile } from "./types";
dotenv.config();

const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
});

export async function uploadFileToS3(data: CsvFile) {
  const filename = data.match(/filename="([^"]+)"/i)![1];
  const fixedData = data.split('\n').slice(4).join('\n').replace(/-*WebKitFormBoundary[a-zA-z0-9]*--/gm, "");

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Body: fixedData,
    Key: filename,
    ContentType: "text/csv"
  })

  return await client.send(command)
}

export function response(statusCode: number, body: any, extraHeaders: { [key: string]: string } = {}) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...extraHeaders
    },
    body
  }
}