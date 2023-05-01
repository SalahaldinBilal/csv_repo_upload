import type { APIGatewayEvent } from 'aws-lambda';
import * as dotenv from 'dotenv'
import { uploadFileToS3 } from './helpers';
import type { CsvFile } from './types';
dotenv.config();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
};

export const handler = async (event: APIGatewayEvent) => {
  const csvFileToUpload = event.body as CsvFile;

  if (!csvFileToUpload?.length) {
    return {
      statusCode: 400,
      headers,
      message: "Empty or non existent file"
    }
  }

  try {
    await uploadFileToS3(csvFileToUpload);
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      message: `Unexpected Error Happened: ${error}`
    }
  }

  return {
    statusCode: 200,
    headers,
    message: "File uploaded successfully"
  }
};