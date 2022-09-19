interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

export function findPath<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {},
): T | T[] | null {
  config = getConfig(config)
  const path: T[] = []
  const list = [...tree]
  const visitedSet = new Set()
  const { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      path.push(node)
      if (func(node)) {
        return path
      }
    }
  }
  return null
}

export function filter<T = any>(
  tree: T[],
  config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config)
  const children = config.children as string
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter(node => {
        node[children] = node[children] && listFilter(node[children])
        return node[children] && node[children].length
      })
  }
  return listFilter(tree)
}

// Extract tree specified structure
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
  return treeData.map(item => treeMapEach(item, opt))
}

// Extract tree specified structure
export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn },
) {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((index: number) =>
        treeMapEach(index, {
          children,
          conversion
        })
      )
    };
  } else {
    return {
      ...conversionData
    };
  }
}