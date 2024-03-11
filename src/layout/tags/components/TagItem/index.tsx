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
    isDark: propTypes.bool
  },
  setup(props, { emit }) {
    return () => (
      <Tag
        class={[
          styles['tag-item'],
          { [styles['is-dark']]: props.isDark },
          { ['ant-tag-checkable-checked']: props.active }
        ]}
        closable={!props.fixed}
        onClose={() => emit('closeTag')}
      >
        <span class={[styles['tag-item__dot'], 'tag-dot']} />
        <span class={styles['tag-item__name']}>{props.name}</span>
      </Tag>
    )
  }
})
