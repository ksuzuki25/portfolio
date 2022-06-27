import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CloseIcon from '@mui/icons-material/Close'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { FormText } from 'components/FormText'
import { todoActions } from 'libs/recoil/state/todoState'
import { useEffect, useRef } from 'react'
import * as types from 'types'
import {
  checkBoxStyle,
  deleteStyle,
  doneTextStyle,
  dragIndicatorStyle,
  inputStyle,
  todoItemDraggingStyle,
  todoItemStyle,
} from './styles.css'

export type Props = {
  todoItem: types.TodoItem
}

export const TodoItem = (props: Props) => {
  const { todoItem } = props
  // アイテムの更新・削除処理
  const updateItemIsDone = todoActions.useUpdateItemIsDone()
  const updateItemText = todoActions.useUpdateItemText()
  const removeItem = todoActions.useRemoveItem()
  // focus用のref
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (todoItem.text === '') {
      inputRef.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef])

  // dnd kit の設定関連
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todoItem.id,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  // dnd kit end

  // 進捗の設定
  const handleUpdateItemIsDone = () => {
    updateItemIsDone(todoItem.id)
  }

  // テキストの設定
  const handleUpdateItemText = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItemText(todoItem.id, event.currentTarget.value)
  }

  // アイテムの削除
  const handleRemoveItem = () => {
    removeItem(todoItem.id)
  }

  return (
    <>
      <div
        className={isDragging ? todoItemDraggingStyle : todoItemStyle}
        ref={setNodeRef}
        style={style}
        {...attributes}
        tabIndex={-1}
      >
        <span className={dragIndicatorStyle} {...listeners}>
          <DragIndicatorIcon></DragIndicatorIcon>
        </span>
        <span className={checkBoxStyle} onClick={handleUpdateItemIsDone}>
          {todoItem.isDone ? <CheckBoxIcon></CheckBoxIcon> : <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>}
        </span>
        <span className={inputStyle}>
          {todoItem.isDone ? (
            <p className={doneTextStyle}>{todoItem.text}</p>
          ) : (
            <FormText
              name={`todo_item_text_${todoItem.id}`}
              placeholder={''}
              setValue={handleUpdateItemText}
              value={todoItem.text}
              isOnblur
              _ref={inputRef}
            />
          )}
        </span>
        <span className={deleteStyle} onClick={handleRemoveItem}>
          <CloseIcon></CloseIcon>
        </span>
      </div>
    </>
  )
}
