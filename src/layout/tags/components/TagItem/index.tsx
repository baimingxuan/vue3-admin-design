import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { Tag } from 'ant-design-vue'
import styles from './index.module.less'

export default defineComponent({
  name: 'TagItem',
  props: {
    fixed: propTypes.bool,
    name: propTypes.string,
    active: propTypes.bool,
    isDarkBg: propTypes.bool
  },
  setup(props, { emit }) {
    function handleClose() {
      emit('closeTag')
    }

    return () => (
      <Tag
        class={[
          styles['tag-item'],
          { [styles['is-dark-bg']]: props.isDarkBg },
          { ['ant-tag-checkable-checked']: props.active }
        ]}
        closable={!props.fixed}
        onClose={handleClose}
      >
        <span class={[styles['tag-item__dot'], 'tag-dot']} />
        <span class={styles['tag-item__name']}>{props.name}</span>
      </Tag>
    )
  }
})
