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

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type EmitType = (event: string, ...args: any[]) => void