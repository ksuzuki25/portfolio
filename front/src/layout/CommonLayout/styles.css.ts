import { style } from '@vanilla-extract/css'
import { variableStyle } from 'styles/variables.css'

// コンテンツ領域のスタイル
export const contentSectionStyle = style({
  width: variableStyle.width.baseContent,
  margin: '0 auto',
  marginTop: 30,
  marginBottom: 30,
  '@media': {
    'screen and (max-width: 767px)': {
      width: '100vw',
      padding: '0 2vw',
    },
  },
})

// トーストのスタイル
export const toastStyle = style({
  selectors: {
    '&:first-child': {
      marginTop: variableStyle.height.header,
    },
  },
})
