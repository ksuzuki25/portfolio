import { style } from '@vanilla-extract/css'
import { variableStyle } from 'styles/variables.css'

// ハンバーガーメニュー全体のベーススタイル
export const hamburgerBaseStyle = style({
  height: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
})

// ハンバーガーボタン
export const hamburgerButtonBaseStyle = style({
  display: 'inline-block',
  transition: 'all .4s',
  boxSizing: 'border-box',
})
export const hamburgerButtonStyle = style([
  hamburgerButtonBaseStyle,
  {
    position: 'relative',
    width: 30,
    height: 24,
    background: 'none',
    border: 'none',
    appearance: 'none',
    cursor: 'pointer',
  },
])
export const hamburgerButtonActiveStyle = style([hamburgerButtonStyle, {}])
export const hamburgerButtonLineStyle = style([
  hamburgerButtonBaseStyle,
  {
    selectors: {
      [`${hamburgerButtonStyle} &`]: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: 4,
        backgroundColor: '#fff',
        borderRadius: 4,
      },
      [`${hamburgerButtonStyle} &:nth-of-type(1)`]: {
        top: 0,
      },
      [`${hamburgerButtonStyle} &:nth-of-type(2)`]: {
        top: 10,
      },
      [`${hamburgerButtonStyle} &:nth-of-type(3)`]: {
        bottom: 0,
      },
      [`${hamburgerButtonActiveStyle} &:nth-of-type(1)`]: {
        transform: 'translateY(10px) rotate(-45deg)',
      },
      [`${hamburgerButtonActiveStyle} &:nth-of-type(2)`]: {
        opacity: 0,
      },
      [`${hamburgerButtonActiveStyle} &:nth-of-type(3)`]: {
        transform: 'translateY(-10px) rotate(45deg)',
      },
    },
  },
])

// ハンバーガーメニュー
export const hamburgerMenuStyle = style({
  position: 'absolute',
  width: 250,
  top: 'calc(100% - 2px)',
  transition: 'all .4s',
  borderRadius: '5px',
  boxShadow: '0 1px 5px 0 rgb(0,0,0,0.6)',
})
export const hamburgerMenuListStyle = style({
  marginBlockEnd: 0,
  marginBlockStart: 0,
  height: '100%',
})
export const hamburgerMenuitemStyle = style({
  height: 30,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: variableStyle.color.baseColor5,
  color: '#000',
  padding: '3px 5px',
  selectors: {
    '&:first-child': {
      borderRadius: '5px 5px 0 0',
    },
    '&:not(:last-child)': {
      borderBottom: '1px solid black',
      cursor: 'pointer',
    },
    '&:last-child': {
      borderRadius: '0 0 5px 5px',
    },
    '&:hover': {
      backgroundColor: variableStyle.color.baseColor4,
    },
  },
})
export const linkStyle = style({
  height: '100%',
  width: '100%',
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
