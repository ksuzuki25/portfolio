import { Authenticator } from '@aws-amplify/ui-react'
import type { NextPageWithLayout } from 'next'
import { authenticatorStyle } from './styles.css'

const Login: NextPageWithLayout = () => {
  // ログインUIを別途出すだけのページ
  return <Authenticator className={authenticatorStyle} signUpAttributes={['email']}></Authenticator>
}

export default Login
