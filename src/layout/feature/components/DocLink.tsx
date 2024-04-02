import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon'

export default defineComponent({
  name: 'DocLink',

  setup() {
    const { t } = useI18n()

    return () => (
      <span>
        <Tooltip title={t('layout.feature.document')} placement='bottom' mouseEnterDelay={0.5}>
          <span class='icon-btn'>
            <SvgIcon name='document' size={20} />
          </span>
        </Tooltip>
      </span>
    )
  }
})
