/**
 * div contenteditable 光标定位到最后
 * @param target
 * @returns
 */
export function keepCursorEnd(target: HTMLElement) {
  // 非IE浏览器
  if (window.getSelection) {
    // 解决Firefox不获取焦点无法定位问题
    target.focus()
    // 创建range对象
    const range = window.getSelection()
    // 选择target下所有子内容
    range?.selectAllChildren(target)
    // 光标移至最后
    range?.collapseToEnd()
  } else if ((document as any).selection) {
    // IE浏览器
    // 创建range对象
    const range = (document as any).selection.createRange()
    // 定位到target
    range.moveToElementText(target)
    // 光标移至最后
    range.collapse(false)
    range.select()
  }
}

/**
 * 获取粘贴的纯文本
 * @param event
 * @returns {string}
 */
export function getPasteText(event: ClipboardEvent): string {
  const clipboardData = event.clipboardData || (window as any).clipboardData
  let pasteText = ''
  if (clipboardData && clipboardData.getData) {
    pasteText = clipboardData.getData('text/plain')
  }
  return pasteText
}
