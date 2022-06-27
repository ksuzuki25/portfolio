import { NextFunction, Request, RequestHandler, Response } from 'express'

interface PromiseRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<unknown>
}

// 非同期関数時の例外発生時にexpressのデフォルトハンドラーでnext()をキャッチさせないようにするためのラッパー
export const asyncFunctionWrap = (fn: PromiseRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): Promise<unknown> =>
    fn(req, res, next).catch((error: unknown) => {
      next(error || 'Null') // 変数 error が null や undefined だとエラーミドルウェアに移動しないので適当な値を入れておく
    })
}
