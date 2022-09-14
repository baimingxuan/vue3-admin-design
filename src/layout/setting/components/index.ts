import { withInstall } from '@/utils'
import { ImportAsyncComponent } from '@/utils/factory/ImportAsyncComponent'
import appModeSwitch from './AppModeSwitch.vue'

export const AppModeSwitch = withInstall(appModeSwitch)
export const MenuThemeRadio = ImportAsyncComponent(() => import('./MenuThemeRadio.vue'))
export const MenuTypePicker = ImportAsyncComponent(() => import('./MenuTypePicker.vue'))
export const ThemeColorPicker = ImportAsyncComponent(() => import('./ThemeColorPicker.vue'))
export const SwitchItem = ImportAsyncComponent(() => import('./SwitchItem.vue'))
export const SelectItem = ImportAsyncComponent(() => import('./SelectItem.vue'))
export const InputNumItem = ImportAsyncComponent(() => import('./InputNumItem.vue'))
