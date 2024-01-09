// for details, see https://dwightjack.github.io/vue-types/
import { createTypes } from 'vue-types'

const propTypes = createTypes({
  string: undefined,
  number: undefined,
  bool: undefined,
  integer: undefined,
  object: undefined,
  func: undefined
})

export { propTypes }
