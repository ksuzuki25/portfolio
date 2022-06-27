import { rest } from 'msw'

export const sampleHandlers = [
  rest.get('/sample', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: { name: 'test', note: 'メモ', gender: 'male' },
        info: {
          message: 'test',
          toastType: 'SUCCESS',
        },
      })
    )
  }),
]
