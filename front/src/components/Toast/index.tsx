import { toastSelectors } from 'libs/recoil/state/toastState'
import { toast } from 'libs/toast'
import { useEffect } from 'react'

// Toast表示コンポーネント
// Recoilのstateの更新に合わせてtoastを表示
// 親コンポーネントに、ToastContainerが必要な点に注意
export const Toast = (): null => {
  const toastInfo = toastSelectors.useToastInfo()

  useEffect(() => {
    toast(toastInfo)
  }, [toastInfo])

  return null
}
