import { toastInfo } from 'libs/toast'
import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from '../recoilkeys'

// ToastStateの定義
type ToastState = {
  toastInfo: toastInfo
}
const toastState = atom<ToastState>({
  key: RecoilAtomKeys.TOAST_STATE,
  default: {
    toastInfo: {
      toastType: 'INIT',
      message: '',
    },
  },
})

// 書き込み用Actionの定義
type ToastActions = {
  useSetToastInfo: () => (toastInfo: toastInfo) => void
}
export const toastActions: ToastActions = {
  // toastInfoのセット
  useSetToastInfo: () =>
    useRecoilCallback(({ set }) => (toastInfo: toastInfo) => {
      set(toastState, (prev) => {
        return {
          ...prev,
          toastInfo: toastInfo,
        }
      })
    }),
}

// 読取り用Selectorの定義
type ToastSelectors = {
  useToastInfo: () => toastInfo
}
const toastNameSelector = selector<toastInfo>({
  key: RecoilSelectorKeys.TOAST_TOAST_INFO,
  get: ({ get }) => get(toastState).toastInfo,
})
export const toastSelectors: ToastSelectors = {
  useToastInfo: () => useRecoilValue(toastNameSelector),
}
