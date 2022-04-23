import { ImportAsyncComponent } from '../../../utils/factory/ImportAsyncComponent'

export const SwitchItem = ImportAsyncComponent(() => import('./SwitchItem.vue'))
export const SelectItem = ImportAsyncComponent(() => import('./SelectItem.vue'))
export const InputNumItem = ImportAsyncComponent(() => import('./InputNumItem.vue'))
export const MenuTypePicker = ImportAsyncComponent(() => import('./MenuTypePicker.vue'))
export const ThemeColorPicker = ImportAsyncComponent(() => import('./ThemeColorPicker.vue'))