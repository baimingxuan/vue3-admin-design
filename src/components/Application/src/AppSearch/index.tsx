import { defineComponent, ref, unref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import SvgIcon from '@/components/SvgIcon'
import SearchModal from './Modal'

export default defineComponent({
  name: 'AppSearch',
  setup() {
    const { t } = useI18n()
    const showModal = ref(false)

    function changeModal(show: boolean) {
      showModal.value = show
    }

    return () => (
      <span onClick={changeModal.bind(null, true)}>
        <Tooltip title={t('layout.feature.search')} placement='bottom' mouseEnterDelay={0.5}>
          <span class='icon-btn'>
            <SvgIcon name='search' size={20} />
          </span>
        </Tooltip>
        <SearchModal visible={unref(showModal)} onClose={changeModal.bind(null, false)} />
      </span>
    )
  }
})
