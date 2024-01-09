declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

declare module 'vue-drag-resize/src' {
  import VueDragResize from 'vue-drag-resize/src'
  export default VueDragResize
}
