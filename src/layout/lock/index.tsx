import { defineComponent, unref, computed, Transition } from 'vue'
import { useLockStore } from '@/stores/modules/lock'
import LockScreen from './components/LockScreen'

export default defineComponent({
  name: 'LockPage',
  setup() {
    const lockStore = useLockStore()
    const getIsLock = computed(() => lockStore.getLockInfo?.isLock ?? false)

    return () => (
      <Transition name='fade-bottom' mode='out-in'>
        {unref(getIsLock) && <LockScreen />}
      </Transition>
    )
  }
})
