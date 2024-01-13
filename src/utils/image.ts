/**
 * Image base64 to Blob
 * @param image
 * @returns {Blob}
 */
export function base64toBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',')
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)![1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * Image url to base64
 * @param url
 * @param mineType
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>
    const ctx = canvas!.getContext('2d')

    const img = new Image()
    img.crossOrigin = ''
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject()
      }
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      canvas = null
      resolve(dataURL)
    }
    img.src = url
  })
}

/**
 * 获取图片宽高
 * @param url
 * @returns {Promise<{width: number; height: number}>}
 */
export function getImageSize(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = function () {
      reject()
    }
    img.src = url
  })
}

/**
 * Compress image through Settings
 * @param imgSrc
 * @param settings
 */
interface ImageProps {
  width: number
  height: number
  quality?: number
  mineType?: string
}
export function getCompressImage(imgSrc: string, settings: ImageProps): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>
    const ctx = canvas!.getContext('2d')

    const { width, height, quality, mineType } = settings
    const img = new Image()
    img.crossOrigin = ''
    img.src = imgSrc
    img.onload = function () {
      if (!canvas || !ctx) return reject()

      canvas.width = width
      canvas.height = height
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      const dataURL = canvas.toDataURL(mineType || 'image/png', quality || 1)
      canvas = null
      resolve(dataURL)
    }
  })
}

/**
 * 计算图片宽高及比率
 * @param imageTrueW 图片实际宽
 * @param imageTrueH 图片实际高
 * @param showAreaW 展示区宽度
 * @param showAreaH 展示区高度
 * @returns {{width: number; height: number; ratio: number}}
 */
export function calcImageSize(
  imageTrueW: number,
  imageTrueH: number,
  showAreaW: number,
  showAreaH: number
): { width: number; height: number; ratio: number } {
  let [width, height, ratio] = [0, 0, 0]
  // 图片真实宽大于真实高
  if (imageTrueW > imageTrueH) {
    if (imageTrueW >= showAreaW) {
      // 真实宽大于或等于展示区最大宽
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
  } else {
    // 图片真实宽小于或等于真实高
    if (imageTrueH >= showAreaH) {
      // 真实高大于或等于展示区最大高
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
