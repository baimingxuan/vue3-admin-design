/**
 * 任意类型的异步函数
 */
export type AnyPromiseFunction = (...arg: any[]) => PromiseLike<any>

/**
 * 任意类型的普通函数
 */
export type AnyNormalFunction = (...arg: any[]) => any

/**
 * 任意类型的函数
 */
export type AnyFunction = AnyNormalFunction | AnyPromiseFunction

/**
 *  T | null 包装
 */
export type Nullable<T> = T | null

/**
 * T | Not null 包装
 */
export type NonNullable<T> = T extends null | undefined ? never : T

/**
 * 字符串类型对象
 */
export type Recordable<T = any> = Record<string, T>

/**
 * 字符串类型对象（只读）
 */
export interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T
}

/**
 * setTimeout 返回值类型
 */
export type TimeoutHandle = ReturnType<typeof setTimeout>

/**
 * setInterval 返回值类型
 */
export type IntervalHandle = ReturnType<typeof setInterval>
