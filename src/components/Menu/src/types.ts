export interface MenuState {
  // array with the keys of currently opened sub menus
  openKeys: string[]

  // array with the keys of currently selected menu items
  selectedKeys: string[]

  // array with the keys of currently opened sub menus with collapsed status
  collapsedOpenKeys: string[]
}
