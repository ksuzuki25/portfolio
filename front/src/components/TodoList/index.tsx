import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import AddIcon from '@mui/icons-material/Add'
import { TodoItem } from 'components/TodoItem'
import { todoActions, todoSelectors } from 'libs/recoil/state/todoState'
import { useCallback, useState } from 'react'
import * as types from 'types'
import { addItemButtonStyle, todoListListItemStyle, todoListListStyle } from './styles.css'

export const TodoList = () => {
  const setNewItem = todoActions.useSetNewItem()
  const updateTodoList = todoActions.useUpdateTodoList()
  const todoList = todoSelectors.useTodoList()
  // drag中の要素のid
  const [activeId, setActiveId] = useState<number | null>(null)
  // drag中の要素のconfig
  const [activeItem, setActiveItem] = useState<types.TodoItem | null>(null)
  // drag中の要素のindex
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Dnd操作時の処理
  // ドラッグ開始時の処理
  const handleDragStart = useCallback(
    (event: DragEndEvent) => {
      const { active } = event
      // activeなConfigを取得
      const activeItem =
        todoList.find((item) => {
          return item.id == active.id
        }) ?? null
      // activeなconfigの配列上のIndexを取得
      const activeIndex = todoList
        .map((item) => {
          return item.id
        })
        .indexOf(parseInt(`${active.id}`))
      // activeなid、config、indexをそれぞれ設定
      setActiveId(parseInt(`${active.id}`))
      setActiveItem(activeItem)
      setActiveIndex(activeIndex)
    },
    [todoList]
  )
  // ドラッグ終了時の処理
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      // ドラッグ中の処理用のstateを初期化
      setActiveId(null)
      setActiveItem(null)
      setActiveIndex(null)

      const { active, over } = event
      // 重移動がない場合は何もしない
      if (over === null) {
        return
      }
      // 移動がある場合は配列上の入れ替えを実施
      if (active.id !== over.id) {
        // 配列の入れ替え
        const oldIndex = todoList
          .map((item) => {
            return item.id
          })
          .indexOf(parseInt(`${active.id}`))
        const newIndex = todoList
          .map((item) => {
            return item.id
          })
          .indexOf(parseInt(`${over.id}`))
        // 移動後の状態に変更した配列を作成
        const newTodoList = arrayMove(todoList, oldIndex, newIndex)
        // 作成した移動後の状態の配列をstateに反映
        updateTodoList(newTodoList)
      }
    },
    [updateTodoList, todoList]
  )

  // 設定追加時のハンドラー
  const handleSetNewItem = () => {
    setNewItem()
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <SortableContext id={'redirect-manager'} items={todoList} strategy={verticalListSortingStrategy}>
          <ul className={todoListListStyle}>
            {todoList &&
              todoList.map((item) => {
                return (
                  <li key={item.id} className={todoListListItemStyle}>
                    <TodoItem todoItem={item} />
                  </li>
                )
              })}
          </ul>
        </SortableContext>
        <DragOverlay>
          {activeId && activeItem && activeIndex !== null ? <TodoItem todoItem={activeItem} /> : null}
        </DragOverlay>
      </DndContext>
      <button className={addItemButtonStyle} onClick={handleSetNewItem} tabIndex={-1}>
        <AddIcon />
      </button>
    </>
  )
}
