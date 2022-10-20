import { toggleClass } from './util'

/**
 * Change the status of the project's color weakness mode
 * @param colorWeak
 */
 export function updateColorWeak(colorWeak: boolean) {
  toggleClass(colorWeak, 'color-weak', document.documentElement)
}

/**
 * Change project gray mode status
 * @param gray
 */
export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.documentElement)
}