import type { Slots } from 'vue'
import { isFunction } from '@/utils/is'

/**
 * @description:  Get slot to prevent empty error
 */
export function getSlot(
  slots: Slots,
  slot = 'default',
  data?: any,
  opts?: {
    [key: string]: any
    disabled?: boolean
  }
) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  const params = { ...data, ...opts }
  return slotFn(params)
}
