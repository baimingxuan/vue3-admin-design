import type { UploadChangeParam } from 'ant-design-vue'
import { defineComponent, ref, unref } from 'vue'
import { Button as AntdButton, Card as AntdCard, Table as AntdTable, UploadDragger as AntdUploadDragger,
    Space as AntdSpace, message } from 'ant-design-vue'
import { ColumnType } from 'ant-design-vue/lib/table'
import { CloudUploadOutlined } from '@ant-design/icons-vue'
import { PageWrapper } from '@/components/Page'
import { XLSX_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { useExcel } from './useExcel'

export default defineComponent({
  name: 'ImportExcel',
  setup() {
    const tableData = ref<object[]>([])
    const tableColumns = ref<ColumnType[]>([])

    const { readDataFromExcel } = useExcel()

    function openGithub() {
      openWindow(XLSX_PLUGIN_URL)
    }

    function handleChange(fileParam: UploadChangeParam) {
      const { file } = fileParam
      const rawFile = file.originFileObj

      if (!rawFile) return
      if (!/\.(xlsx|xls|csv)$/.test(rawFile.name)) {
        message.warning('Excel文件只支持.xlsx, .xls, .csv格式!')
        return
      }

      const isLimit1M = rawFile.size / 1024 /1024 < 1
      if (!isLimit1M) {
        message.warning('上传的Excel文件大小不能超过1M!')
        return
      }

      readFile(rawFile)
    }

    function readFile(rawFile: File) {
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target && e.target.result
        const { header, results } = readDataFromExcel(data, 'array')
        tableColumns.value = header.map(key => ({title: key, dataIndex: key, align: 'center'})) as ColumnType[]
        tableData.value = results as object[]
      }
      reader.readAsArrayBuffer(rawFile)
      reader.onerror = () => {
        message.error('Excel文件读取出错!')
      }
    }
    
    return () => (
      <PageWrapper name='JS-xlsx插件'>
        {{
          header: () => <>
            <p>JS-xlsx: 由SheetJS出品的一款非常方便的只需要纯JS即可读取和导出excel的工具库, 功能强大, 支持xlsx、csv、txt等格式。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdCard bordered={false}>
            <AntdSpace direction='vertical' size={16} style={{width: '100%'}}>
              <AntdUploadDragger
                ref='uploadExcel'
                accept='.xlsx, .xls, .csv'
                showUploadList={false}
                maxCount={1}
                onChange={handleChange}
              >
                <p class="ant-upload-drag-icon" style='margin-bottom: 0;'>
                  <CloudUploadOutlined />
                </p>
                <p>将Excel文件拖到此处, 或<span style='color: #1890ff;'>点击上传</span></p>
              </AntdUploadDragger>
              <AntdTable
                dataSource={unref(tableData)}
                columns={unref(tableColumns)}
                pagination={false}
              />
            </AntdSpace>
          </AntdCard>
        }}
      </PageWrapper>
    )
  }
})