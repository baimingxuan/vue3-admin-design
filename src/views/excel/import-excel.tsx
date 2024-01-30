import type { UploadChangeParam } from 'ant-design-vue'
import { defineComponent, ref, unref } from 'vue'
import { Card, Table, UploadDragger, Space, message } from 'ant-design-vue'
import type { ColumnType } from 'ant-design-vue/lib/table'
import { CloudUploadOutlined } from '@ant-design/icons-vue'
import { PageWrapper } from '@/components/Page'
import { XLSX_PLUGIN } from '@/settings/websiteSetting'
import { useExcel } from './useExcel'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'

export default defineComponent({
  name: 'ImportExcel',
  setup() {
    const tableData = ref<object[]>([])
    const tableColumns = ref<ColumnType[]>([])

    const { readDataFromExcel } = useExcel()
    const { getThemeColor } = useBaseSetting()

    function handleChange(fileParam: UploadChangeParam) {
      const { file } = fileParam
      const rawFile = file.originFileObj

      if (!rawFile) return
      if (!/\.(xlsx|xls|csv)$/.test(rawFile.name)) {
        message.warning('Excel文件只支持.xlsx, .xls, .csv格式!')
        return
      }

      const isLimit1M = rawFile.size / 1024 / 1024 < 1
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
        tableColumns.value = header.map(key => ({ title: key, dataIndex: key, align: 'center' })) as ColumnType[]
        tableData.value = results as object[]
      }
      reader.readAsArrayBuffer(rawFile)
      reader.onerror = () => {
        message.error('Excel文件读取出错!')
      }
    }

    return () => (
      <PageWrapper plugin={XLSX_PLUGIN}>
        <Card>
          <Space direction='vertical' size={16} style={{ width: '100%' }}>
            <UploadDragger
              ref='uploadExcel'
              accept='.xlsx, .xls, .csv'
              showUploadList={false}
              maxCount={1}
              onChange={handleChange}
            >
              <p class='ant-upload-drag-icon' style='margin-bottom: 0;'>
                <CloudUploadOutlined />
              </p>
              <p>
                将Excel文件拖到此处, 或<span style={{ color: unref(getThemeColor) }}>点击上传</span>
              </p>
            </UploadDragger>
            <Table dataSource={unref(tableData)} columns={unref(tableColumns)} pagination={false} />
          </Space>
        </Card>
      </PageWrapper>
    )
  }
})
