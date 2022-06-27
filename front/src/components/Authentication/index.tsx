import { Auth } from '@aws-amplify/auth'
import { Amplify } from '@aws-amplify/core'
import '@aws-amplify/ui-react/styles.css'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { BarsLoadingForPage } from 'components/BarsLoadingForPage'
import { amplifyConfig } from 'configs/amplify'
import { todoActions } from 'libs/recoil/state/todoState'
import { userActions, userSelectors } from 'libs/recoil/state/userState'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

export type Props = {
  children?: ReactNode
}

// 認証制御コンポーネント
export const Authentication = (props: Props): JSX.Element => {
  const { children } = props
  const router = useRouter()
  const setUserIdForAuth = userActions.useSetUserId()
  const userId = userSelectors.useUserId()
  const setUserIdForTodo = todoActions.useSetUserId()

  // Amplifyの設定を実行
  Amplify.configure(amplifyConfig)

  useEffect(() => {
    // 現在のセッションをチェック
    Auth.currentSession()
      .then((session: CognitoUserSession) => {
        // セッションが取得された場合はglobal stateに保存
        const userId = (session && session?.getIdToken?.().payload['cognito:username']) || ''
        setUserIdForAuth(userId)
        setUserIdForTodo(userId)
        if (userId && ['/', '/login'].includes(router.pathname)) {
          router.push('/list')
        }
      })
      .catch(() => {
        // セッションが取得できない場合はloginに遷移してログインUIを表示
        // ※ログインUI事態はどこで表示してもOK
        router.push('/login')
      })
  }, [router, router.pathname, setUserIdForAuth, setUserIdForTodo, userId])

  // 認証ができていない場合はLoadingを表示
  if (!userId && router.pathname !== '/login') {
    return (
      <>
        <BarsLoadingForPage></BarsLoadingForPage>
      </>
    )
  }

  return <>{children}</>
}
