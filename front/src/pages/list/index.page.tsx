import { AxiosResponse } from 'axios'
import { BarsLoadingForPage } from 'components/BarsLoadingForPage'
import { ContentHeader } from 'components/ContentHeader'
import { TodoList } from 'components/TodoList'
import { CommonLayout } from 'layout/CommonLayout'
import { backendAxios } from 'libs/axios'
import { todoActions } from 'libs/recoil/state/todoState'
import { userSelectors } from 'libs/recoil/state/userState'
import { createUUID } from 'libs/uuid'
import type { NextPageWithLayout } from 'next'
import useSWR from 'swr'

const UserTodoList: NextPageWithLayout = () => {
  const userId = userSelectors.useUserId()
  const setTodoList = todoActions.useSetTodoList()
  const setTodoListId = todoActions.useSetTodoListId()

  // swr用のfetcher
  const fetcher = (url: string, data: object) =>
    backendAxios
      .get(url, data)
      .then((res: AxiosResponse) => {
        if (res.data?.todoListId !== '') {
          setTodoList(res.data.todoList)
          setTodoListId(res.data.todoListId)
        } else {
          // 未登録の場合、ListのIDを新規設定する
          setTodoListId(createUUID())
        }
        return res.data
      })
      .catch()

  // fetcherをuseSWRでコールする
  // 失敗時の繰り返しなどの制御済
  // revalidateOnMountのオプションでページ遷移時に再ロードする
  const { data, error } = useSWR(['/api/list', { params: { userId: userId } }], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    revalidateOnMount: true,
  })

  if (error) {
    return <div>読み込みに失敗しました。時間をおいて再度お試しください。</div>
  }
  if (!data) {
    return (
      <>
        <BarsLoadingForPage />
      </>
    )
  }

  // データが取得できたら画面を表示
  return (
    <section>
      <ContentHeader>Todo</ContentHeader>
      <TodoList />
    </section>
  )
}

// レイアウトの指定
UserTodoList.getLayout = (page) => <CommonLayout>{page}</CommonLayout>

export default UserTodoList
