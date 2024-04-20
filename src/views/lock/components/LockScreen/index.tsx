import { defineComponent, unref } from 'vue'
import { LockOutlined } from '@ant-design/icons-vue'
import { useNowTime } from '@/views/lock/useNowTime'
import styles from './index.module.less'

export default defineComponent({
  name: 'LockScreen',
  setup() {
    const { year, month, day, week, hour, minute } = useNowTime(true)

    return () => (
      <div class={styles['lock-screen-wrapper']}>
        <div class={styles['main-content']}>
          <div class={styles['unlock-btn']}>
            <LockOutlined />
            <p>点击解锁</p>
          </div>
          <div class={styles['contrast']}>
            <div class={styles['circle']} />
            <ul class={styles['bubbles']}>
              {Array.from({ length: 15 }).map((_, index) => (
                <li key={index} />
              ))}
            </ul>
          </div>
          <div class={styles['local-time']}>
            <p class={styles['time-text']}>
              {unref(hour)}:{unref(minute)}
            </p>
            <p class={styles['date-text']}>
              {unref(year)}/{unref(month)}/{unref(day)} {unref(week)}
            </p>
          </div>
        </div>
      </div>
    )
  }
})
