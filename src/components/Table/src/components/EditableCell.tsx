import type { PropType, CSSProperties } from 'vue'
import type { ColumnType } from 'ant-design-vue/es/table'
import type { EditColumnType } from '../types/column'
import { defineComponent, ref, unref, computed, toRaw, nextTick, watchEffect } from 'vue'
import { Spin, Popover } from 'ant-design-vue'
import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'EditableCell',
  props: {
    value: {
      type: [String, Number, Boolean, Object] as PropType<string | number | boolean | Record<string, any>>
    },
    index: {
      type: Number as PropType<number>
    },
    record: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    column: {
      type: Object as PropType<ColumnType & EditColumnType>,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const isEdit = ref<boolean>(false)
    const spinning = ref<boolean>(false)

    const getComponent = computed(() => props.column?.editComponent || 'Input')

    return () => <div class='editable-cell'></div>
  }
})
