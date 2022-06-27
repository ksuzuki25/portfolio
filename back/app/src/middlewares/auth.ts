import configs from '@/configs'
import { NextFunction, Request, Response } from 'express'
import { createRemoteJWKSet, jwtVerify } from 'jose'

// Cognitoの公開鍵リスト
const jwks = createRemoteJWKSet(
  new URL(
    `https://cognito-idp.${configs.cognito.region}.amazonaws.com/${configs.cognito.userPoolId}/.well-known/jwks.json`
  )
)

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  // AuthorizationHeaderからcognitoのidTokenの取得
  const idToken = req.headers.authorization?.replace('Bearer ', '')

  if (idToken) {
    // IDトークンの検証（API Gatewayで認証を行う前提のため一応の改ざんチェックとユーザーの一致確認のみ実施）
    try {
      // 検証とペイロードの取得
      const { payload } = await jwtVerify(idToken, jwks, {
        issuer: `https://cognito-idp.${configs.cognito.region}.amazonaws.com/${configs.cognito.userPoolId}`,
        audience: configs.cognito.appClientId,
      })

      // userId（username）を取得
      const userId = payload['cognito:username'] ?? undefined
      // リクエストからuserIdを取得
      const requestUserId = req.query.userId ? req.query.userId : req.body.userId

      // cognito:usernameが存在しないもしくはリクエストのuserIdに一致しない場合エラー
      if (!userId && userId !== requestUserId) {
        throw new Error()
      }
      
      // チェックに問題がなければ次へ
      next()
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      res.status(403).json()
    }
  } else {
    res.status(401).json()
  }
}
