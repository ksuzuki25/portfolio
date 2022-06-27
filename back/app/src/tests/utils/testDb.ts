import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

export const testDdb = DynamoDBDocument.from(
  new DynamoDB({
    ...{
      endpoint: 'http://localhost:9000',
      sslEnabled: false,
      region: 'local-env',
      credentials: {
        accessKeyId: 'fakeMyKeyId',
        secretAccessKey: 'fakeSecretAccessKey',
      },
    },
  }),
  {
    marshallOptions: {
      convertEmptyValues: true,
    },
  }
)
