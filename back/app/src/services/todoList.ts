import { TodoListArray, todoListModel } from '@/models/todoList'

// todoListの取得
export const getTodoList = async (userId: string) => {
  const result: { todoListId: string; todoList: TodoListArray } = { todoListId: '', todoList: [] }

  if (userId !== '') {
    const userTodoList = await todoListModel
      .query('HashId')
      .eq(userId)
      .exec()
      .catch((error) => {
        throw error
      })

    // ユーザーデータが存在する場合は、Todoリストを取得
    if (Array.isArray(userTodoList) && userTodoList.length > 0) {
      const todoListId = userTodoList[0].RangeId
      const itemList = await todoListModel
        .query('HashId')
        .eq(todoListId)
        .filter('RangeId')
        .eq(todoListId)
        .exec()
        .catch((error) => {
          throw error
        })
      if (Array.isArray(itemList) && itemList.length > 0) {
        result.todoListId = itemList[0].RangeId
        result.todoList = itemList[0].TodoList ?? []
      }
    }
  }

  return result
}

// TodoListの更新・登録
export const updateTodoList = async (userId: string, todoListId: string, todoList: TodoListArray) => {
  if (todoListId) {
    const itemList = await todoListModel
      .query('HashId')
      .eq(todoListId)
      .filter('RangeId')
      .eq(todoListId)
      .exec()
      .catch((error) => {
        throw error
      })

    if (Array.isArray(itemList) && itemList.length > 0) {
      // 更新の場合
      const targetItem = itemList[0]
      targetItem.TodoList = todoList
      await targetItem.save()
    } else {
      // 登録の場合
      // ユーザーと紐づけ用のItemを作成
      await todoListModel
        .create({
          HashId: userId,
          RangeId: todoListId,
        })
        .catch((error) => {
          throw error
        })
      // TodoList用のItemを作成
      await todoListModel
        .create({
          HashId: todoListId,
          RangeId: todoListId,
          TodoList: todoList,
        })
        .catch((error) => {
          throw error
        })
    }
  }

  return
}
