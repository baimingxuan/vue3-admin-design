<template>
  <svg class="svg-icon" :style="iconStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
  import type { CSSProperties } from 'vue'
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon'
      },
      name: {
        type: String,
        required: true
      },
      size: {
        type: [Number, String],
        default: 16
      }
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`)
      const iconStyle = computed((): CSSProperties => {
        let size = `${props.size}`
        size = `${size.replace('px', '')}px`
        return {
          width: size,
          height: size
        }
      })

      return {
        symbolId,
        iconStyle
      }
    }
  })
</script>

<style lang="less" scoped>
  .svg-icon {
    display: inline-block;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>