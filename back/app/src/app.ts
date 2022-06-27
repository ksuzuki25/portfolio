import loaders from '@/loaders'
import serverlessExpress from '@vendia/serverless-express'
import { APIGatewayProxyEvent, APIGatewayProxyEventV2, Context } from 'aws-lambda'
import express from 'express'

// lambdaHandler
export const lambdaHandler = async (event: APIGatewayProxyEvent | APIGatewayProxyEventV2, context: Context) => {
  // expressHandler作成
  const app = express()
  const handler = serverlessExpress({ app })
  await loaders({ expressApp: app })

  return await handler(event, context, () => {
    return
  })
}
