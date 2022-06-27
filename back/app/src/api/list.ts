import { getTodoList, updateTodoList } from '@/services/todoList'
import { asyncFunctionWrap } from '@/utils/asyncFunctionWrap'
import { NextFunction, Request, Response } from 'express'

// TodoListの取得
export const get = asyncFunctionWrap(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = await getTodoList(`${req.query.userId ?? ''}`)
  res.json(result)
})

// TodoListの更新・登録
export const post = asyncFunctionWrap(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await updateTodoList(req.body.userId, req.body.todoListId, req.body.todoList)
  res.json({})
})
