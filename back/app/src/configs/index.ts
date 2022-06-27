import dotenv from 'dotenv'

// Set the NODE_ENV to 'local' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'local'

dotenv.config({ override: true })

export const isLocal = process.env.NODE_ENV == 'local'
export const isProd = process.env.NODE_ENV == 'production'
export const isDev = process.env.NODE_ENV == 'development'
export const isAWSTest = process.env.NODE_ENV == 'aws-test'
export const isLocalTest = process.env.NODE_ENV == 'test'

export default {
  // cognitoの情報
  cognito: {
    region: 'ap-northeast-1',
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    appClientId: process.env.COGNITO_APP_CLIENT_ID,
  },
}
