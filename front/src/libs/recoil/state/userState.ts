import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from '../recoilkeys'

// UserStateの定義
type UserState = {
  userId: string
}
const userState = atom<UserState>({
  key: RecoilAtomKeys.USER_STATE,
  default: {
    userId: '',
  },
})

// 書き込み用Actionの定義
type UserActions = {
  useSetUserId: () => (userId: string) => void
}
export const userActions: UserActions = {
  // userIdのセット
  useSetUserId: () =>
    useRecoilCallback(({ set }) => (userId: string) => {
      set(userState, (prev) => {
        return {
          ...prev,
          userId: userId,
        }
      })
    }),
}

// 読取り用Selectorの定義
type UserSelectors = {
  useUserId: () => string
}
const userIdSelector = selector<string>({
  key: RecoilSelectorKeys.USER_USER,
  get: ({ get }) => get(userState).userId,
})
export const userSelectors: UserSelectors = {
  useUserId: () => useRecoilValue(userIdSelector),
}
