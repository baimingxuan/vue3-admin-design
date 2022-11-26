import type { BookType } from 'xlsx'

export interface DataToSheet<T = any> {
  data: T[]
  header: T[]
  key: T[]
  fileName?: string
  autoWidth?: boolean
  bookType: BookType
}