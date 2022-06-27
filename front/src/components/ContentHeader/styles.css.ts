import { style } from '@vanilla-extract/css'
import { variableStyle } from 'styles/variables.css'

// メインヘッダーのスタイル
export const mainHeaderStyle = style({
  backgroundColor: variableStyle.color.baseColor2,
  color: '#fff',
  fontSize: 24,
  width: 'fit-content',
  padding: 5,
  marginBottom: 10,
})

export const subHeaderStyle = style({
  backgroundColor: variableStyle.color.baseColor3,
  color: '#000',
  fontSize: 16,
  width: 'fit-content',
  padding: 5,
  marginBottom: 10,
})
