const CognitoRegion = 'ap-northeast-1'
const CognitoUserPool = process.env.NEXT_PUBLIC_COGNITO_USER_POOL
const CognitoUserPoolClient = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT

// Amplifyの設定※基本Authのみ使用
export const amplifyConfig = {
  Auth: {
    region: CognitoRegion,
    userPoolId: CognitoUserPool,
    userPoolWebClientId: CognitoUserPoolClient,
  },
}
