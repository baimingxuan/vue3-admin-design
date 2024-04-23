import { unref, computed, watchEffect, onUnmounted } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { useUserStore } from '@/stores/modules/user'
import { useLockStore } from '@/stores/modules/lock'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'

export function useLockPage() {
  const userStore = useUserStore()
  const lockStore = useLockStore()
  const { getLockScreenTime } = useBaseSetting()

  let timeId: TimeoutHandle

  function lockPage(): void {
    lockStore.setLockInfo({
      isLock: true,
      pwd: undefined
    })
  }

  function clear(): void {
    window.clearTimeout(timeId)
  }

  function resetCalcLockTimeout() {
    if (!userStore.getToken) {
      clear()
      return
    }

    const lockTime = unref(getLockScreenTime)
    if (!lockTime || lockTime < 1) {
      clear()
      return
    }
    clear()

    timeId = setTimeout(
      () => {
        lockPage()
      },
      lockTime * 60 * 1000
    )
  }

  watchEffect(onClean => {
    if (userStore.getToken) {
      resetCalcLockTimeout()
    } else {
      clear()
    }

    onClean(() => {
      clear()
    })
  })

  onUnmounted(() => {
    clear()
  })

  const keyupFn = useThrottleFn(resetCalcLockTimeout, 2000)

  return computed(() => {
    if (unref(getLockScreenTime)) {
      return { onKeyup: keyupFn, onMousemove: keyupFn }
    } else {
      clear()
      return {}
    }
  })
}
