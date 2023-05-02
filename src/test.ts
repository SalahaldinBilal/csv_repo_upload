import type { APIGatewayEvent } from 'aws-lambda'
import { handler } from './index'

const test = async () => {
  const testData: APIGatewayEvent = {
    body: `------WebKitFormBoundaryagIjqa1irQDt3b48
    Content-Disposition: form-data; name="file"; filename="test_file.csv"
    Content-Type: text/csv
       
    hello,world
    1,2
    ------WebKitFormBoundaryagIjqa1irQDt3b48--
    `,
    isBase64Encoded: false,
    headers: {},
    httpMethod: "POST",
    multiValueHeaders: {},
    path: "",
    pathParameters: null,
    queryStringParameters: null,
    stageVariables: null,
    resource: "",
    requestContext: {} as any,
    multiValueQueryStringParameters: null
  }

  const response = await handler(testData, undefined as any, undefined as any);
  console.log(response)
  process.exit(1)
}

test();