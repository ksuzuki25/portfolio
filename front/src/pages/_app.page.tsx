import { Authentication } from 'components/Authentication'
import 'modern-css-reset'
import type { AppPropsWithLayout } from 'next/app'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <RecoilRoot>
      <Authentication>{getLayout(<Component {...pageProps} />)}</Authentication>
    </RecoilRoot>
  )
}

export default MyApp
