/**
 * Converts base64 image data to Blob
 * @param image
 * @returns {Blob}
 */
 export function base64toBlob(image: string): Blob {
  const bytes = window.atob(image.split(',')[1])
  const array: number[] = []
  for (let i = 0; i < bytes.length; i++) {
    array.push(bytes.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' })
}

/**
 * Computed image width, height and ratio
 * @param imageTrueW
 * @param imageTrueH
 * @param showAreaW
 * @param showAreaH
 * */
export function getComputedImageProp(
  imageTrueW: number,
  imageTrueH: number,
  showAreaW: number,
  showAreaH: number
) {
  let [width, height, ratio] = [0, 0, 0]
  // 图片真实宽大于真实高
  if (imageTrueW > imageTrueH) {
    if (imageTrueW >= showAreaW) { // 真实宽大于或等于展示区最大宽
      const imageRatioH = imageTrueH * (showAreaW / imageTrueW)
      // 按展示区最大宽与实际宽比率换算后，高度大于显示高度时
      if (imageRatioH >= showAreaW) {
        width = imageTrueW * (showAreaH / imageTrueH)
        height = showAreaH
        ratio = imageTrueH / showAreaH
      } else {
        width = showAreaW
        height = imageRatioH
        ratio = imageTrueW / showAreaW
      }
    } else {
      width = imageTrueW
      height = imageTrueH
      ratio = 1
    }
  } else { // 图片真实宽小于或等于真实高
    if (imageTrueH >= showAreaH) { // 真实高大于或等于展示区最大高
      width = imageTrueW * (showAreaH / imageTrueH)
      height = showAreaH
      ratio = imageTrueH / showAreaH
    } else {
      width = imageTrueW
      height = imageTrueH
      ratio = 1
    }
  }
  return {
    width,
    height,
    ratio
  }
}