import { backendAxios } from 'libs/axios'
import { toast } from 'libs/toast'
import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { TodoList } from 'types'
import { RecoilAtomKeys, RecoilSelectorKeys } from '../recoilkeys'

// TodoStateの定義
type TodoState = {
  todoList: TodoList
  itemMaxId: number
  todoListId: string
  userId: string
}
// Stateのデフォルト値
const todoState = atom<TodoState>({
  key: RecoilAtomKeys.TODO_STATE,
  default: {
    todoList: [],
    itemMaxId: 0,
    todoListId: '',
    userId: '',
  },
})

// 登録処理
const postTodoList = (userId: string, todoListId: string, todoList: TodoList) => {
  backendAxios.post('/api/list', { userId: userId, todoListId: todoListId, todoList: todoList }).catch(() => {
    toast({
      toastType: 'ERROR',
      message: '更新に失敗しました、時間をおいて再度お試しください。',
    })
  })
  return
}

// 書き込み用Actionの定義
type TodoActions = {
  // 設定
  useSetTodoList: () => (todoList: TodoList) => void
  useSetNewItem: () => () => void
  useSetTodoListId: () => (todoListId: string) => void
  useSetUserId: () => (userId: string) => void
  // 削除
  useRemoveItem: () => (itemId: number) => void
  // 更新（入力）
  useUpdateItemText: () => (itemId: number, text: string) => void
  useUpdateItemIsDone: () => (itemId: number) => void
  useUpdateTodoList: () => (todoList: TodoList) => void
}
export const todoActions: TodoActions = {
  // TodoListの設定
  useSetTodoList: () =>
    useRecoilCallback(({ set }) => (todoList: TodoList) => {
      set(todoState, (prev) => {
        // 振られているIDの最大値を算出
        const maxId = Math.max(...todoList.map((value) => value.id))

        return {
          ...prev,
          todoList: todoList,
          itemMaxId: maxId,
        }
      })
    }),
  // Itemの新規追加
  useSetNewItem: () =>
    useRecoilCallback(({ set }) => () => {
      set(todoState, (prev) => {
        // 変更前の配列をdepp copyして、デフォルト条件を追加
        const newTodoList = JSON.parse(JSON.stringify(prev.todoList)) as unknown as TodoList

        const nextId = prev.itemMaxId + 1
        newTodoList.push({
          id: nextId,
          text: '',
          isDone: false,
        })

        return {
          ...prev,
          todoList: newTodoList,
          itemMaxId: nextId,
        }
      })
    }),
  // list idの設定
  useSetTodoListId: () =>
    useRecoilCallback(({ set }) => (todoListId: string) => {
      set(todoState, (prev) => {
        return {
          ...prev,
          todoListId: prev.todoListId !== '' ? prev.todoListId : todoListId,
        }
      })
    }),
  // user idの設定
  useSetUserId: () =>
    useRecoilCallback(({ set }) => (userId: string) => {
      set(todoState, (prev) => {
        return {
          ...prev,
          userId: userId,
        }
      })
    }),
  // TodoListからItemを削除
  useRemoveItem: () =>
    useRecoilCallback(({ set }) => (itemId: number) => {
      set(todoState, (prev) => {
        // 変更前の配列をdepp copyして、指定されたItemを削除
        const newTodoList = JSON.parse(JSON.stringify(prev.todoList)) as unknown as TodoList
        const targetIndex = newTodoList.findIndex((item) => item.id == itemId)
        newTodoList.splice(targetIndex, 1)

        postTodoList(prev.userId, prev.todoListId, newTodoList)

        return {
          ...prev,
          todoList: newTodoList,
        }
      })
    }),
  // itemのテキスト更新
  useUpdateItemText: () =>
    useRecoilCallback(({ set }) => (itemId: number, text: string) => {
      set(todoState, (prev) => {
        // 変更前の配列をdepp copyして、指定された項目のテキストを更新
        const newTodoList = JSON.parse(JSON.stringify(prev.todoList)) as unknown as TodoList
        const targetIndex = newTodoList.findIndex((item) => item.id == itemId)
        newTodoList[targetIndex].text = text

        postTodoList(prev.userId, prev.todoListId, newTodoList)

        return {
          ...prev,
          todoList: newTodoList,
        }
      })
    }),
  // itemの処理状態を変更
  useUpdateItemIsDone: () =>
    useRecoilCallback(({ set }) => (itemId: number) => {
      set(todoState, (prev) => {
        // 変更前の配列をdepp copyして、指定された項目のテキストを更新
        const newTodoList = JSON.parse(JSON.stringify(prev.todoList)) as unknown as TodoList
        const targetIndex = newTodoList.findIndex((item) => item.id == itemId)
        newTodoList[targetIndex].isDone = !newTodoList[targetIndex].isDone

        postTodoList(prev.userId, prev.todoListId, newTodoList)

        return {
          ...prev,
          todoList: newTodoList,
        }
      })
    }),
  // リスト全体の更新（※並べ替え時の更新含む）
  useUpdateTodoList: () =>
    useRecoilCallback(({ set }) => (todoList: TodoList) => {
      set(todoState, (prev) => {
        postTodoList(prev.userId, prev.todoListId, todoList)
        return {
          ...prev,
          todoList: todoList,
        }
      })
    }),
}

// 読取り用Selectorの定義
type TodoSelectors = {
  useTodoList: () => TodoList
  useTodoListId: () => string
}
const todoListSelector = selector<TodoList>({
  key: RecoilSelectorKeys.TODO_TODO_LIST,
  get: ({ get }) => get(todoState).todoList,
})
const todoListIdSelector = selector<string>({
  key: RecoilSelectorKeys.TODO_TODO_LIST_ID,
  get: ({ get }) => get(todoState).todoListId,
})
export const todoSelectors: TodoSelectors = {
  useTodoList: () => useRecoilValue(todoListSelector),
  useTodoListId: () => useRecoilValue(todoListIdSelector),
}
