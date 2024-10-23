import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export function configAntdComponentsPlugin() {
  return Components({
    resolvers: [
      AntDesignVueResolver({
        importStyle: false
      })
    ]
  })
}
