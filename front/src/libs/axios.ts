import { Auth } from '@aws-amplify/auth'
import axios, { AxiosRequestConfig } from 'axios'

// backendAPIコール用のカスタムAxiosインスタンス
// 認証を含むためAuthenticationコンポーネント以下で使用すること
const backendAxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})
backendAxiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // Cognitoの認証用トークンを設定
  try {
    const idToken = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: idToken,
    }
  } catch (e: unknown) {
    // エラーが発生した場合はAuthenticationヘッダーを設定しない
  }

  return config
})
export const backendAxios = backendAxiosInstance
