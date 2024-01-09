/**
 *  vite plugin for importing svg-icons
 *  https://github.com/vbenjs/vite-plugin-svg-icons
 */

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

export function configSvgIconsPlugin(isBuild: boolean) {
  return createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    symbolId: 'icon-[dir]-[name]'
  })
}
