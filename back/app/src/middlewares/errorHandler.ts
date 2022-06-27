import { NextFunction, Request, Response } from 'express'

// デフォルトエラーハンドラー
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const status = 500
  let message = ''

  if (err instanceof Error) {
    message = err.message
  } else {
    message = 'Internal Server Error'
  }
  res.status(status).json({ message: message })
}
