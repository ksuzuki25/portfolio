import { isAWSTest, isDev, isLocal, isLocalTest, isProd } from '@/configs'
import { dynamoose } from '@/loaders/dynamoose'
import { Document } from 'dynamoose/dist/Document'

// TodoList用の配列
export type TodoListArray = Array<TodoItem>
export type TodoItem = {
  id: number
  text: string
  isDone: boolean
}


// TodoList
export interface TodoList extends Document {
  HashId: string
  RangeId: string
  TodoList?: TodoListArray
}

const todoListSchema = new dynamoose.Schema(
  {
    HashId: {
      type: String,
      hashKey: true,
    },
    RangeId: {
      type: String,
      rangeKey: true,
    },
    TodoList: {
      type: Array,
    },
  },
  {
    saveUnknown: true,
  }
)

// テーブル名の制御
const tableName =
  isLocal || isLocalTest || isAWSTest
    ? 'kobuhei-development-test-todo-list'
    : isDev
    ? 'kobuhei-development-dev-todo-list'
    : isProd
    ? 'kobuhei-development-prod-todo-list'
    : 'kobuhei-development-test-todo-list'
const modelConfig = {
  create: false,
  waitForActive: false,
}
export const todoListModel = dynamoose.model<TodoList>(tableName, [todoListSchema], modelConfig)
