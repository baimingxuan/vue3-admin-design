import { getThemeColors } from '../../../build/config/themeConfig'

import { replaceStyleVariables } from 'vite-plugin-theme/es/client'

export async function changeTheme(color: string) {
  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color)]
  })
}