import { defineComponent, ref, computed, watchEffect, unref, onMounted, watch } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'
import { isNumber } from '@/utils/is'
import { props } from './props'

export default defineComponent({
  name: 'CountTo',
  props,
  emits: ['onStarted', 'onFinished'],
  setup(props, { emit }) {
    const source = ref(props.startVal)
    const disabled = ref(false)
    let outputValue = useTransition(source)

    const value = computed(() => formatNumber(unref(outputValue)))

    watchEffect(() => {
      source.value = props.startVal
    })

    watch([() => props.startVal, () => props.endVal], () => {
      if (props.autoplay) {
        start()
      }
    })

    onMounted(() => {
      props.autoplay && start()
    })

    function start() {
      run()
      source.value = props.endVal
    }

    function run() {
      outputValue = useTransition(source, {
        disabled,
        duration: props.duration,
        onFinished: () => emit('onFinished'),
        onStarted: () => emit('onStarted'),
        ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {})
      })
    }

    function formatNumber(num: number | string) {
      if (!num && num !== 0) {
        return ''
      }
      const { decimals, decimal, separator, suffix, prefix } = props
      num = Number(num).toFixed(decimals)
      num += ''

      const x = num.split('.')
      let x1 = x[0]
      const x2 = x.length > 1 ? decimal + x[1] : ''

      const rgx = /(\d+)(\d{3})/
      if (separator && !isNumber(separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + separator + '$2')
        }
      }
      return prefix + x1 + x2 + suffix
    }

    return () => (
      <span style={{color: props.color}}>{value}</span>
    )

  }
})