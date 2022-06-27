import { style } from '@vanilla-extract/css'
import { variableStyle } from 'styles/variables.css'

export const todoItemStyle = style({
  display: 'grid',
  gridTemplateColumns: '25px 35px 1fr 30px',
  placeItems: 'center',
  border: '1px solid #000',
  height: 50,
  padding: '10px 5px',
  backgroundColor: '#fff',
})
export const todoItemDraggingStyle = style([
  todoItemStyle,
  {
    opacity: '0.5',
  },
])

export const dragIndicatorStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: 'fit-content',
  padding: '2px 0',
  cursor: 'move',
  borderRadius: 3,
  selectors: {
    '&:hover': {
      backgroundColor: '#d2d2d29c',
    },
  },
})

export const checkBoxStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: 'fit-content',
  padding: '2px 0',
  cursor: 'pointer',
  borderRadius: 3,
})

export const inputStyle = style({
  width: '99%',
  height: '100%',
  display: 'grid',
})

export const doneTextStyle = style({
  height: '100%',
  minHeight: '24px',
  width: 'fit-content',
  maxWidth: '100%',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  margin: '3px 4px',
  textDecoration: 'line-through',
  color: variableStyle.color.placeholderColor,
})

export const deleteStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: 'fit-content',
  padding: '2px 0',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: '#d2d2d29c',
    },
    '&:active': {
      color: 'red',
      backgroundColor: '#e0a3a39c',
    },
  },
})
