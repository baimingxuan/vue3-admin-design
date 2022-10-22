declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

declare type TargetContext = '_self' | '_blank'