import { openWindow } from '.'
import { base64toBlob, urlToBase64 } from './image'

/**
 * Download image by url
 * @param url
 * @param filename
 * @param mineType
 * @param bom
 */
export function downloadImgByUrl(url: string, filename: string, mineType?: string, bom?: BlobPart) {
  urlToBase64(url).then(base64 => {
    downloadImgByBase64(base64, filename, mineType, bom)
  })
}

/**
 * Download image based on base64
 * @param buf
 * @param filename
 * @param mineType
 * @param bom
 */
export function downloadImgByBase64(buf: string, filename: string, mineType?: string, bom?: BlobPart) {
  const base64Buf = base64toBlob(buf)
  downloadByData(base64Buf, filename, mineType, bom)
}

/**
 * Download by the back-end interface file stream
 * @param {*} data
 * @param {*} filename
 * @param {*} mineType
 * @param {*} bom
 */
export function downloadByData(data: BlobPart, filename: string, mineType?: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mineType || 'application/octet-stream' })

  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', filename)
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL)
}

/**
 * Download file by url
 * @param {*} sUrl
 */
export function downloadByUrl({
  url,
  target = '_blank',
  fileName
}: {
  url: string
  target?: TargetContext
  fileName?: string
}): boolean {
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!')
    return false
  }
  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    link.target = target

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download'
  }

  openWindow(url, { target })
  return true
}
