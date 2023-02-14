import { withInstall } from '@/utils'

import appLogo from './src/AppLogo.vue'
import appLocalePicker from './src/AppLocalePicker.vue'
import appSearch from './src/AppSearch'

export const AppLogo = withInstall(appLogo)
export const AppLocalePicker = withInstall(appLocalePicker)
export const AppSearch = withInstall(appSearch)