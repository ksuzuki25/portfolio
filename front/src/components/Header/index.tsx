import { Hamburger } from 'components/Hamburger'
import { userSelectors } from 'libs/recoil/state/userState'
import { headerContentStyle, headerStyle, signInUserIdStyle } from './styles.css'

// 共通Headerコンポーネント
export const Header = () => {
  // ユーザー名
  const userId = userSelectors.useUserId()

  return (
    <header className={headerStyle}>
      <div className={headerContentStyle}>
        {/* ハンバーガーメニュー */}
        <Hamburger />
        {/* ログインユーザー名 */}
        <p className={signInUserIdStyle}>{userId}</p>
      </div>
    </header>
  )
}
