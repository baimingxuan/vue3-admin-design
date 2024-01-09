import { getThemeVariables } from 'ant-design-vue/dist/theme'
import { primaryColor, generateAntColors } from './themeConfig'
import { resolve } from 'path'

// Less global variable
export function generateModifyVars(dark = false) {
  const colors = generateAntColors(primaryColor)
  const primary = colors[5]

  const primaryColorObj: Record<string, string> = {}

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = colors[index]
  }

  const modifyVars = getThemeVariables({ dark })

  return {
    ...modifyVars,
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj
  }
}
