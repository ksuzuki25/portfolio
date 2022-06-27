import { mainHeaderStyle, subHeaderStyle } from './styles.css'

export type Props = {
  children: string
  isSubHeader?: boolean
}

// リンク用ボタンコンポーネント
export const ContentHeader = (props: Props) => {
  const { children, isSubHeader } = props

  return isSubHeader ? <h2 className={subHeaderStyle}>{children}</h2> : <h1 className={mainHeaderStyle}>{children}</h1>
}
