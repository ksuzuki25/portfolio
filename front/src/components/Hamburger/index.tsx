import { Auth } from '@aws-amplify/auth'
import { userActions } from 'libs/recoil/state/userState'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  hamburgerBaseStyle,
  hamburgerButtonActiveStyle,
  hamburgerButtonLineStyle,
  hamburgerButtonStyle,
  hamburgerMenuitemStyle,
  hamburgerMenuListStyle,
  hamburgerMenuStyle,
  signOutLinkStyle,
  signOutLinkTextStyle,
} from './styles.css'

// 共通Headerコンポーネント
export const Hamburger = () => {
  // ハンバーガーメニューの制御
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const toggleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }
  // ユーザー名
  const setUser = userActions.useSetUserId()
  const router = useRouter()

  return (
    <div className={hamburgerBaseStyle}>
      <button
        type="button"
        className={isOpenMenu ? hamburgerButtonActiveStyle : hamburgerButtonStyle}
        onClick={toggleOpenMenu}
      >
        <span className={hamburgerButtonLineStyle}></span>
        <span className={hamburgerButtonLineStyle}></span>
        <span className={hamburgerButtonLineStyle}></span>
      </button>
      {isOpenMenu && (
        <nav className={hamburgerMenuStyle} onClick={toggleOpenMenu}>
          <ul className={hamburgerMenuListStyle}>
            <li className={hamburgerMenuitemStyle}>
              {/* サインアウトボタン */}
              <p className={signOutLinkStyle}>
                <span
                  className={signOutLinkTextStyle}
                  onClick={async () => {
                    await Auth.signOut()
                    setUser('')
                    router.push('/login')
                  }}
                >
                  サインアウト
                </span>
              </p>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
