import Link from 'next/link'
import { linkStyle, variableDisabledLinkButtonStyle, variableLinkButtonStyle } from './styles.css'

export type Props = {
  href: string
  children: string
  disabled?: boolean
  size?: 'small' | 'medium' | 'big'
}

// リンク用ボタンコンポーネント
export const LinkButton = (props: Props) => {
  const { href, children, disabled, size } = props

  // ボタンサイズの切り替え
  const buttonSize = size ?? 'medium'

  return (
    <div className={disabled ? variableDisabledLinkButtonStyle?.[buttonSize] : variableLinkButtonStyle?.[buttonSize]}>
      {disabled ? (
        <p className={linkStyle}>{children}</p>
      ) : (
        <Link href={href}>
          <a className={linkStyle}>{children}</a>
        </Link>
      )}
    </div>
  )
}
