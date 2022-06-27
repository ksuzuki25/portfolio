import { isLocal, isLocalTest } from '@/configs'
import * as dynamooseBase from 'dynamoose'

if (isLocal) {
  dynamooseBase.aws.ddb.local('http://db:8000')
}

if (isLocalTest) {
  // CredentialsがTest時の実施では初期設定されないため、ここで設定
  dynamooseBase.aws.sdk.config.update({
    accessKeyId: 'fake',
    secretAccessKey: 'fake',
    region: 'us-east-1',
  })
  // テスト用DynamoDBにアクセスするようにDynamooseを設定
  dynamooseBase.aws.ddb.local('http://localhost:9000')
}

export const dynamoose = dynamooseBase
