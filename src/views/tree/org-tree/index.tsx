import { defineComponent } from 'vue'
import { PageWrapper } from '@/components/Page'
import { Vue3TreeOrg } from 'vue3-tree-org'
import { data } from './data'

export default defineComponent({
  name: 'OrgTree',
  setup() {
    return () => (
      <PageWrapper name='树状组织图'>
        {{
          header: () => <>
            <p>vue3-org-tree: 基于vue的树结构组织图, 可用于公司组织架构展示。</p>
            <p>github地址: 立即访问 </p>
          </>,
          default: () => <div style='height: 420px;'>
            <Vue3TreeOrg data={data} />
          </div>
        }}
      </PageWrapper>
    )
  }
})