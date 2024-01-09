import type { BookType } from 'xlsx'

export type ImportType = 'base64' | 'binary' | 'string' | 'buffer' | 'array' | 'file'

export interface DataToSheet<T = any> {
  data: T[]
  header: T[]
  key: T[]
  fileName?: string
  autoWidth?: boolean
  bookType: BookType
}
