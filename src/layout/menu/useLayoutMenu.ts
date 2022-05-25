import type { AppMenu } from '@/router/types'

import { ref } from 'vue'
// import { useRouter } from 'vue-router'

import { getMenus } from '@/router/menus'

export function useSplitMenu() {
    const menusRef = ref<AppMenu[]>([])
    // const { currentRoute } = useRouter()

    // get menus
    async function getMenuList() {
        // normal mode
        menusRef.value = await getMenus()
        return
    }

    getMenuList()

    return { menusRef }
}