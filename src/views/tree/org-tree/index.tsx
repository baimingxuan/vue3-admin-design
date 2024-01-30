import { defineComponent, reactive, unref, computed } from 'vue'
import { Card, Form, Radio, Switch } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { Vue3TreeOrg } from 'vue3-tree-org'
import { VUE_TREE_ORG_PLUGIN } from '@/settings/websiteSetting'
import { data } from './data'

export default defineComponent({
  name: 'OrgTree',
  setup() {
    const config = reactive({
      horizontal: false,
      expandAll: true
    })
    const contentHeight = computed(() => {
      if (config.horizontal) {
        return '1000px'
      } else {
        return '400px'
      }
    })

    return () => (
      <PageWrapper plugin={VUE_TREE_ORG_PLUGIN}>
        <Card bodyStyle={{ height: unref(contentHeight) }}>
          <Form model={config} layout='inline' labelAlign='left'>
            <Form.Item label='排列方式' name='horizontal'>
              <Radio.Group v-model:value={config.horizontal} optionType='button' buttonStyle='solid'>
                <Radio.Button value={true}>水平</Radio.Button>
                <Radio.Button value={false}>垂直</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='展开全部' name='expandAll'>
              <Switch v-model:checked={config.expandAll} />
            </Form.Item>
          </Form>
          <Vue3TreeOrg data={data} horizontal={config.horizontal} collapsable={!config.expandAll} center />
        </Card>
      </PageWrapper>
    )
  }
})
