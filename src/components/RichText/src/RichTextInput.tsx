import type { CSSProperties, PropType } from 'vue'
import type { styleState } from '@/types'
import { defineComponent, computed, unref, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { keepCursorEnd, getPasteText } from '@/utils/rich-text'

export default defineComponent({
  name: 'RichTextInput',
  props: {
    value: {
      type: String,
      default: '请输入文本'
    },
    styles: {
      type: Object as PropType<styleState>,
      default: () => ({})
    },
    hasBorder: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const rtStyles = computed(() => {
      const borderStyle = props.hasBorder ? { border: '1px solid #d9d9d9', borderRadius: '6px' } : {}

      return {
        minHeight: '20px',
        padding: '6px 8px',
        outline: 'none',
        wordBreak: 'break-all',
        ...borderStyle,
        ...props.styles
      } as CSSProperties
    })

    const handleInput = useDebounceFn((event: any) => {
      emit('update:value', event.target.innerHTML)
    }, 200)

    function handlePaste(event: any) {
      event.preventDefault()
      const text = getPasteText(event)
      emit('update:value', text)
      nextTick(() => {
        keepCursorEnd(event.target)
      })
    }

    return () => (
      <div
        v-html={props.value}
        class='rich-text-input'
        style={{ ...unref(rtStyles) }}
        contentEditable
        spellCheck='false'
        onPaste={handlePaste}
        onInput={handleInput}
      />
    )
  }
})
