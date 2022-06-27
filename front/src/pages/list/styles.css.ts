import { style } from '@vanilla-extract/css'
import { variableStyle } from 'styles/variables.css'

export const userTodoPageStyle = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  marginTop: 100,
  justifyItems: 'center',
  height: `calc(100% - ${variableStyle.height.header})`,
})
