import { toast as toastify } from 'react-toastify'

export type toastInfo = {
  toastType: 'SUCCESS' | 'WARN' | 'ERROR' | 'INIT'
  message: string
}

export const toast = (info: toastInfo) => {
  switch (info.toastType) {
    case 'SUCCESS':
      toastify.success(info.message)
      break
    case 'WARN':
      toastify.warn(info.message, { autoClose: false })
      break
    case 'ERROR':
      toastify.error(info.message, { autoClose: false })
      break
    default:
      break
  }
}
