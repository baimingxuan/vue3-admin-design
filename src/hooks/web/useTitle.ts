import { watch, unref } from 'vue'
import { useTitle as usePageTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { t } = useI18n()
  const { currentRoute } = useRouter()

  const pageTitle = usePageTitle()
  const appName = import.meta.env.VITE_APP_NAME

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute)

      if (route.name === 'RedirectTo') return

      const title = route.meta.title ? t(route.meta.title) : ''
      pageTitle.value = title ? `${title} | ${appName}` : appName
    },
    { immediate: true }
  )
}
