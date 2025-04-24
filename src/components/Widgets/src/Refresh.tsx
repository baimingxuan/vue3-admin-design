import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { SyncOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Refresh',
  emits: ['refresh'],
  setup(_, { emit }) {
    const { t } = useI18n()

    return () => (
      <span onClick={() => emit('refresh')}>
        <Tooltip title={t('components.widgets.refresh')} placement='top' mouseEnterDelay={0.5}>
          <span class='icon-btn'>
            <SyncOutlined />
          </span>
        </Tooltip>
      </span>
    )
  }
})
