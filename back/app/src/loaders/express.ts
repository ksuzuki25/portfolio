import { auth, errorHandler } from '@/middlewares'
import route from '@/routers'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'

export default async ({ app }: { app: express.Application }) => {
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cookieParser())
  app.use(helmet())

  // 共通ミドルウェア
  app.use(auth)

  // ルート設定
  app.use('/', route)

  // デフォルトエラーハンドラーのカスタム
  app.use(errorHandler)
}
