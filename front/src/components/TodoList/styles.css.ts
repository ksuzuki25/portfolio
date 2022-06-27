import { style } from '@vanilla-extract/css'
import { variableStyle } from 'styles/variables.css'

export const todoListListStyle = style({
  margin: '10px 0 0 0',
})

export const todoListListItemStyle = style({
  backgroundColor: '#fff',
  marginTop: -1,
})

const buttonBaseStyle = style({
  cursor: 'pointer',
  backgroundColor: variableStyle.color.baseColor3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
export const addItemButtonStyle = style([
  buttonBaseStyle,
  {
    width: '100%',
    border: '1px solid #000',
    marginTop: -1,
    height: 40,
  },
])
