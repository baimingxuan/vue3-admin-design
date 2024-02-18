import type { AppMenu } from '@/router/types'
import type { Ref } from 'vue'
import { ref, unref, nextTick, onBeforeMount } from 'vue'
import { cloneDeep } from 'lodash-es'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { getAsyncMenus } from '@/router/menus'
import { filter, forEach } from '@/utils/helper/treeHelper'
import { useGo } from '@/hooks/web/usePage'
import { useScrollTo } from '@/hooks/event/useScrollTo'

export interface SearchResult {
  name: string
  path: string
  icon?: string
}

// Translate special characters
function transform(c: string) {
  const code: string[] = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|']
  return code.includes(c) ? `\\${c}` : c
}

function createSearchReg(key: string) {
  const keys = [...key].map(item => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

export function useMenuSearch(refs: Ref<HTMLElement[]>, scrollWrap: Ref<ElRef>, emit: EmitType) {
  const searchResult = ref<SearchResult[]>([])
  const keyword = ref('')
  const activeIndex = ref(-1)

  let menuList: AppMenu[] = []

  const go = useGo()
  const handleSearch = useDebounceFn(search, 200)

  onBeforeMount(async () => {
    const list = await getAsyncMenus()
    menuList = cloneDeep(list)
    forEach(menuList, item => {
      item.name = item.name
    })
  })

  function search(e: ChangeEvent) {
    e?.stopPropagation()
    const key = e.target.value
    keyword.value = key.trim()

    if (!key) {
      searchResult.value = []
      return
    }
    const reg = createSearchReg(unref(keyword))
    const filterMenu = filter(menuList, item => {
      return reg.test(item.name) && !item.hideMenu
    })
    searchResult.value = handlerSearchResult(filterMenu, reg)
    activeIndex.value = 0
  }

  function handlerSearchResult(filterMenu: AppMenu[], reg: RegExp, parent?: AppMenu) {
    const ret: SearchResult[] = []
    filterMenu.forEach(item => {
      const { name, path, icon, children, hideMenu, meta } = item
      if (!hideMenu && reg.test(name) && (!children?.length || meta?.hideChildrenInMenu)) {
        ret.push({
          name: parent?.name ? `${parent.name} > ${name}` : name,
          path,
          icon: parent?.icon || icon
        })
      }
      if (!meta?.hideChildrenInMenu && Array.isArray(children) && children.length) {
        ret.push(...handlerSearchResult(children, reg, item))
      }
    })
    return ret
  }

  // Activate when the mouse moves to a certain line
  function handleMouseenter(index: number) {
    activeIndex.value = index
  }

  // Arrow key up
  function handleUp() {
    if (!searchResult.value.length) return
    activeIndex.value--
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1
    }
    handleScroll()
  }

  // Arrow key down
  function handleDown() {
    if (!searchResult.value.length) return
    activeIndex.value++
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0
    }
    handleScroll()
  }

  // When the keyboard up and down keys move to an invisible place
  // the scroll bar needs to scroll automatically
  function handleScroll() {
    const refList = unref(refs)
    if (!refList || !Array.isArray(refList) || refList.length === 0 || !unref(scrollWrap)) {
      return
    }

    const index = unref(activeIndex)
    const currentRef = refList[index]
    if (!currentRef) {
      return
    }
    const wrapEl = unref(scrollWrap)
    if (!wrapEl) {
      return
    }
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight
    const wrapHeight = wrapEl.offsetHeight
    const { start } = useScrollTo({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight
    })
    start()
  }

  // enter keyboard event
  async function handleEnter() {
    if (!searchResult.value.length) {
      return
    }
    const result = unref(searchResult)
    const index = unref(activeIndex)
    if (result.length === 0 || index < 0) {
      return
    }
    const to = result[index]
    handleClose()
    await nextTick()
    go(to.path)
  }

  // close search modal
  function handleClose() {
    searchResult.value = []
    emit('close')
  }

  // enter search
  onKeyStroke('Enter', handleEnter)

  // Monitor keyboard arrow keys
  onKeyStroke('ArrowUp', handleUp)
  onKeyStroke('ArrowDown', handleDown)

  // esc close
  onKeyStroke('Escape', handleClose)

  return { handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter }
}
