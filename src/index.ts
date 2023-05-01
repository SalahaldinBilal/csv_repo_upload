import type { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as dotenv from 'dotenv'
import { uploadFileToS3 } from './helpers';
import type { CsvFile } from './types';
dotenv.config();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
};

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const csvFileToUpload = event.body as CsvFile;

    if (!csvFileToUpload?.length) {
      return {
        statusCode: 400,
        headers,
        body: "Empty or non existent file"
      }
    }

    await uploadFileToS3(csvFileToUpload);
    return {
      statusCode: 200,
      headers,
      body: "File uploaded successfully"
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      headers,
      body: `Unexpected Error Happened: ${error}`
    }
  }
};