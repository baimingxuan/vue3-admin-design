import type { WorkSheet } from 'xlsx'
import { write, read, utils } from 'xlsx'
import { saveAs } from 'file-saver'
import type { ImportType, DataToSheet } from './types'

export function useExcel() {
  // Automatic width calculation (自动宽度计算)
  function AutoWidth(ws: WorkSheet, arr: any[][]) {
    // Sets the maximum width of each column of the worksheet (设置worksheet每列的最大宽度)
    const colWidth = arr.map(row =>
      row.map(val => {
        // Checked null or undefined（判断是否为null/undefined）
        if (val == null) {
          return { wch: 10 }
        } else if (val.toString().charCodeAt(0) > 255) {
          // Checked Chinese (判断是否为中文)
          return { wch: val.toString().length * 2 }
        } else {
          return { wch: val.toString().length }
        }
      })
    )
    // The initial value of the first row (以第一行为初始值)
    const result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j].wch < colWidth[i][j].wch) {
          result[j].wch = colWidth[i][j].wch
        }
      }
    }
    ws['!cols'] = result
  }

  // Array to JSON (数组转换成JSON)
  function formatJSON(key: any[], data: any[]) {
    return data.map(v =>
      key.map(i => {
        return v[i]
      })
    )
  }

  // String to ArrayBuffer (字符串转ArrayBuffer)
  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  // Exporting EXCEL (导出EXCEL表格)
  function exportDataToExcel({
    header, // Table header label (表头名数组)
    key, // Table header key (列对应字段数组)
    data, // Data to be exported (需要导出数据的数组)
    fileName, // Export file name (导出文件名)
    autoWidth = true, // Automatic width (是否自动宽度)
    bookType = 'xlsx' // Export file type (导出文件格式)
  }: DataToSheet) {
    // Create the Workbook object (创建Workbook对象)
    const wb = utils.book_new()
    const arr = formatJSON(key, data)
    fileName = fileName || 'excel-list'
    arr.unshift(header)
    // Convert the array to worksheet (将数组数据转换为worksheet)
    const ws = utils.aoa_to_sheet(arr)
    if (autoWidth) {
      AutoWidth(ws, arr)
    }
    // Appends the worksheet and fileName to the Workbook object (向Workbook对象中追加worksheet和fileName)
    utils.book_append_sheet(wb, ws, fileName)
    // Generate EXCEL configuration items (生成EXCEL的配置项)
    const wbout = write(wb, {
      bookType: bookType,
      bookSST: false,
      type: 'binary'
    })
    // Browser download (浏览器下载)
    saveAs(
      new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
      }),
      `${fileName}.${bookType}`
    )
  }

  // Get the table header from the Excel file (从Excel文件中获取表格头)
  function getHeaderRow(sheet: WorkSheet) {
    if (!sheet || !sheet['!ref']) return []

    const headers: string[] = []
    // Converts a string such as A1:G8 to a column and row object (将 A1:G8 这种字符串转换为行列对象)
    const range = utils.decode_range(sheet['!ref'])

    const R = range.s.r
    // Start in the first row, walk every column in the range (从第一列开始，遍历范围中的每一列)
    for (let C = range.s.c; C <= range.e.c; ++C) {
      // Converts a row object to a string such as A1 (将行列对象转换为 A1 这种字符串)
      const cell = sheet[utils.encode_cell({ c: C, r: R })]
      // Replace with your desired default (用默认值替换)
      let hdr = 'UNKNOWN ' + C
      if (cell && cell.t) hdr = utils.format_cell(cell)
      headers.push(hdr)
    }
    return headers
  }

  // Reading excel files (读取Excel文件)
  function readDataFromExcel(data: any, type: ImportType) {
    // Read the Excel file and save it to the Workbook object (读取Excel文件并保存到Workbook对象)
    const workbook = read(data, { type: type })
    const firstSheetName = workbook.SheetNames[0]
    // Gets the worksheet of the Workbook object (获取Workbook对象的worksheet)
    const worksheet = workbook.Sheets[firstSheetName]
    const header = getHeaderRow(worksheet)
    // Convert the worksheet to an array (将worksheet转化成数组)
    const results = utils.sheet_to_json(worksheet)
    return { header, results }
  }

  return {
    exportDataToExcel,
    readDataFromExcel
  }
}
