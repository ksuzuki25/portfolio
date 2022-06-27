import { style, styleVariants } from '@vanilla-extract/css'
import { variableStyle } from 'styles/variables.css'

const smallButton = style({
  height: 30,
  width: 120,
  fontSize: 12,
})
const mediumButton = style({
  height: 40,
  width: 160,
  fontSize: 16,
})
const bigButton = style({
  height: 50,
  width: 200,
  fontSize: 20,
})

// リンクボタン共通のスタイル
const linkButtonBase = style({
  backgroundColor: variableStyle.color.baseColor3,
  color: '#000',
  borderRadius: 5,
  fontWeight: 'bold',
})
// リンクボタン活性状態のスタイル
const linkButtonStyle = style([
  linkButtonBase,
  {
    cursor: 'pointer',
    boxShadow: '0 3px 2px -1px rgb(0,0,0,0.2)',
    selectors: {
      '&:hover': {
        backgroundColor: variableStyle.color.baseColor3A,
        boxShadow: '0 2px 2px 0 rgb(0,0,0,0.3)',
      },
    },
  },
])
export const variableLinkButtonStyle = styleVariants({
  small: [linkButtonStyle, smallButton],
  medium: [linkButtonStyle, mediumButton],
  big: [linkButtonStyle, bigButton],
})

const disabledLinkButtonStyle = style([
  linkButtonBase,
  {
    backgroundColor: variableStyle.color.baseColor5,
    cursor: 'not-allowed',
  },
])
export const variableDisabledLinkButtonStyle = styleVariants({
  small: [disabledLinkButtonStyle, smallButton],
  medium: [disabledLinkButtonStyle, mediumButton],
  big: [disabledLinkButtonStyle, bigButton],
})

// リンク部分のスタイル
export const linkStyle = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
