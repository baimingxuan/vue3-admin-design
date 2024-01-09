import { defineComponent, ref, computed, watchEffect, unref, onMounted, watch } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'
import { isNumber } from '@/utils/is'
import { props } from './props'

export default defineComponent({
  name: 'CountTo',
  props,
  emits: ['onStarted', 'onFinished'],
  setup(props, { emit }) {
    const sourceValue = ref(props.startVal)
    const disabled = ref(false)
    let outputValue = useTransition(sourceValue)

    const showValue = computed(() => formatNumber(unref(outputValue)))

    watchEffect(() => {
      sourceValue.value = props.startVal
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
      sourceValue.value = props.endVal
    }

    function reset() {
      sourceValue.value = props.startVal
      run()
    }

    function run() {
      outputValue = useTransition(sourceValue, {
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

    return { showValue, start, reset }
  },

  render() {
    return <span style={{ color: this.color, fontSize: this.size + 'px' }}>{this.showValue}</span>
  }
})
