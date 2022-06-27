import { Header } from 'components/Header'
import { Toast } from 'components/Toast'
import Head from 'next/head'
import { ReactElement } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { baseTheme } from 'styles/variables.css'
import { contentSectionStyle, toastStyle } from './styles.css'

export type Props = {
  children: ReactElement
}

// 共通レイアウト
// 特に不都合がない限り各ページには本レイアウトを使用
export const CommonLayout = (props: Props) => {
  const { children } = props

  return (
    <>
      <Head>
        <title>Todoリスト</title>
        <meta name="description" content="Simple TodoList" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={baseTheme} id="main">
        <ToastContainer
          position="top-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName={toastStyle}
        />
        <Toast />
        <Header />
        <section id="content" className={contentSectionStyle}>
          {children}
        </section>
      </section>
    </>
  )
}
