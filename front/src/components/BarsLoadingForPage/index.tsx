import { Bars } from 'react-loader-spinner'
import { loadingStyle } from './styles.css'

// バー形式のローディングアイコンコンポーネント
// ページロード時などに画面全体を隠すのに使用
export const BarsLoadingForPage = () => {
  return (
    <span className={loadingStyle}>
      <Bars height="100" width="100" color="grey" ariaLabel="loading-indicator" />
    </span>
  )
}
