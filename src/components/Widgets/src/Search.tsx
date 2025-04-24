import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Search',
  emits: ['toggle'],
  setup(_, { emit }) {
    const { t } = useI18n()

    return () => (
      <span onClick={() => emit('toggle')}>
        <Tooltip title={t('components.widgets.search')} placement='top' mouseEnterDelay={0.5}>
          <span class='icon-btn'>
            <SearchOutlined />
          </span>
        </Tooltip>
      </span>
    )
  }
})
