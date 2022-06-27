import { style, styleVariants } from '@vanilla-extract/css'
import { variableStyle } from 'styles/variables.css'

export const formTextStyle = style({
  display: 'grid',
  gridTemplateColumns: `${variableStyle.width.formInputTitle} 1fr`,
  marginBottom: variableStyle.margin.formBottom,
})
export const errorFormTextStyle = style([
  formTextStyle,
  {
    marginBottom: 0,
  },
])

export const titleStyle = style({
  color: '#000',
  fontWeight: 'bold',
  width: variableStyle.width.formInputTitle,
})

export const inputStyle = style({
  selectors: {
    '&::placeholder': {
      color: variableStyle.color.placeholderColor,
    },
  },
})
export const variableInputStyle = styleVariants({
  default: [inputStyle],
  change: [inputStyle, { backgroundColor: variableStyle.color.changedForm }],
})

export const errorMessageStyle = style({
  display: 'inline-block',
  color: 'red',
  marginBottom: variableStyle.margin.formBottom,
})
