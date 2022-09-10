/**
 * Vite plugin for website theme color switching
 * https://github.com/vbenjs/vite-plugin-theme
 */
import type { Plugin } from 'vite'
import { viteThemePlugin, mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme'
import { getThemeColors } from '../../config/themeConfig'

export function configThemePlugin(isBuild: boolean): Plugin[] {
  const plugin = [
    viteThemePlugin({
      colorVariables: [...getThemeColors()]
    })
  ]

  return plugin as unknown as Plugin[]
}