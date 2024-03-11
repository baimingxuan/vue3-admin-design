import { addClass, hasClass, removeClass } from '@/utils/dom'
import { toggleClass } from './util'
import { setThemColor } from './'

// Change the system dark mode
export async function updateDarkTheme(mode: string | null = 'light') {
  const htmlRoot = document.getElementById('htmlRoot')
  if (!htmlRoot) return

  setThemColor(htmlRoot)
  const hasDarkClass = hasClass(htmlRoot, 'dark')

  if (mode === 'dark') {
    htmlRoot.setAttribute('data-theme', 'dark')

    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark')
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light')

    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark')
    }
  }
}

// Change the system color weak mode
export function updateColorWeak(colorWeak: boolean) {
  toggleClass(colorWeak, 'color-weak', document.documentElement)
}

// Change the system gray mode
export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.documentElement)
}
