import { style } from '@vanilla-extract/css'
import { variableStyle } from 'styles/variables.css'

// ヘッダーのベース
export const headerStyle = style({
  backgroundColor: variableStyle.color.baseColor1,
  color: '#fff',
  fontWeight: 'bold',
  height: variableStyle.height.header,
  boxShadow: '0 1px 5px 0 rgba(0,0,0,0.5)',
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 9995,
})

// ヘッダーのコンテンツ部分
export const headerContentStyle = style({
  width: variableStyle.width.baseContent,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '40px 1fr',
  position: 'relative',
  '@media': {
    'screen and (max-width: 767px)': {
      width: '100vw',
      padding: '0 2vw',
    },
  },
})

// ハンバーガー
const hamburgerBaseStyle = style({
  width: variableStyle.height.header,
  height: variableStyle.height.header,
  cursor: 'pointer',
})
export const hamburgerOpenStyle = style([
  hamburgerBaseStyle,
  {
    backgroundColor: 'red',
  },
])
export const hamburgerCloseStyle = style([
  hamburgerBaseStyle,
  {
    backgroundColor: 'blue',
  },
])
// ハンバーガーメニュー
export const hamburgerMenuStyle = style({
  position: 'absolute',
  width: 100,
  height: 200,
  marginTop: variableStyle.height.header,
  backgroundColor: 'red',
})
export const hamburgerMenuListStyle = style({
  marginBlockEnd: 0,
  marginBlockStart: 0,
  height: '100%',
  selectors: {
    [`&`]: {},
  },
})

// ログインユーザー名
export const signInUserIdStyle = style({
  lineHeight: variableStyle.height.header,
  textAlign: 'right',
})

// ログアウトリンク
export const signOutLinkStyle = style({
  lineHeight: variableStyle.height.header,
  textAlign: 'right',
})

export const signOutLinkTextStyle = style({
  textDecoration: 'underline',
  cursor: 'pointer',
})
