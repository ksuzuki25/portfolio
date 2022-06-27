// Promiseかどうかの判定処理、thenメソッドの有無をチェックしているため、thenメソッドが存在するインスタンスも引っかかるため注意
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPromise = (obj: any): obj is Promise<any> => {
  return obj instanceof Promise || (obj && typeof obj.then === 'function')
}
