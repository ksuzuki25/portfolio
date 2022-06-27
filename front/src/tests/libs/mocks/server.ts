import { setupServer } from 'msw/node'
import { sampleHandlers } from './handlers/sample'

// mockサーバーのハンドラー、ハンドラーが増えた場合は、,...handlerで配列に納めること
const serverHandlers = [...sampleHandlers]

// サーバーの作成
export const server = setupServer(...serverHandlers)
