import { defineComponent, ref, unref, Transition } from 'vue'
import { LockOutlined } from '@ant-design/icons-vue'
import { useNowTime } from '@/layout/lock/useNowTime'
import { useI18n } from 'vue-i18n'
import UnlockForm from '../UnlockForm'
import styles from './index.module.less'

export default defineComponent({
  name: 'LockScreen',
  setup() {
    const { t } = useI18n()
    const isShowForm = ref(false)
    const { year, month, day, week, hour, minute } = useNowTime(true)

    function handleShowForm(isShow: boolean) {
      isShowForm.value = isShow
    }

    return () => (
      <div class={[styles['lock-screen-wrapper'], 'flex-center']}>
        <div class={styles['main-content']}>
          <Transition name='fade-slide'>
            <div v-show={!unref(isShowForm)} class={styles['unlock-btn']} onClick={() => handleShowForm(true)}>
              <LockOutlined />
              <p>{t('layout.lock.unlockBtn')}</p>
            </div>
          </Transition>
          <div class={styles['contrast']}>
            <div class={styles['circle']} />
            <ul class={styles['bubbles']}>
              {Array.from({ length: 15 }).map((_, index) => (
                <li key={index} />
              ))}
            </ul>
          </div>
        </div>
        <Transition name='fade-slide'>
          <UnlockForm v-show={unref(isShowForm)} onCancel={() => handleShowForm(false)} />
        </Transition>
        <div class={[styles['main-footer'], 'flex-center']}>
          <p class={styles['local-time']}>
            {unref(hour)}:{unref(minute)}
          </p>
          <p class={styles['local-date']}>
            {unref(year)}/{unref(month)}/{unref(day)} {unref(week)}
          </p>
        </div>
      </div>
    )
  }
})
