import type { APIGatewayProxyHandler } from 'aws-lambda';
import * as dotenv from 'dotenv'
import { response, uploadFileToS3 } from './helpers';
import type { CsvFile } from './types';
dotenv.config();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const csvFileToUpload = event.body as CsvFile;

    if (!csvFileToUpload?.length) return response(400, "Empty or non existent file")

    await uploadFileToS3(csvFileToUpload);
    return response(200, "File uploaded successfully")
  }
  catch (error) {
    return response(500, `Unexpected Error Happened: ${error}`)
  }
};