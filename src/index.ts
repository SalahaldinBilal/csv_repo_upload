import type { APIGatewayEvent } from 'aws-lambda';
import * as dotenv from 'dotenv'
import { uploadFileToS3 } from './helpers';
import type { CsvFile } from './types';
dotenv.config();

export const handler = async (event: APIGatewayEvent) => {
  const csvFileToUpload = event.body as CsvFile;

  if (!csvFileToUpload?.length) {
    return {
      statusCode: 400,
      message: "Empty or non existent file"
    }
  }

  try {
    await uploadFileToS3(csvFileToUpload);
  } catch (error) {
    return {
      statusCode: 500,
      message: `Unexpected Error Happened: ${error}`
    }
  }

  return {
    statusCode: 200,
    message: "File uploaded successfully"
  }
};