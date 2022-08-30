import { computed, Ref, unref } from 'vue'
import type { AppMenu } from '@/router/types'

import { ref } from 'vue'
// import { useRouter } from 'vue-router'

import { getMenus } from '@/router/menus'
import { MenuSplitTyeEnum } from '@/enums/menuEnum'

export function useSplitMenu(menuSplitType: Ref<MenuSplitTyeEnum>) {
    const menusRef = ref<AppMenu[]>([])
    // const { currentRoute } = useRouter()

    const getMenuNoneSplit = computed(() => {
        return unref(menuSplitType) === MenuSplitTyeEnum.NONE
    })

    // get menus
    async function getMenuList() {
        // normal mode
        if (unref(getMenuNoneSplit)) {
            menusRef.value = await getMenus()
            return
        }
        
    }

    getMenuList()

    return { menusRef }
}