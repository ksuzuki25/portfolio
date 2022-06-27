import { v4 as uuidv4 } from 'uuid'

// アクセスキー生成処理
export const createUUID = (): string => {
  return uuidv4().replace(/-/g, '')
}
