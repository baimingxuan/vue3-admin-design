import { defineComponent } from 'vue'
import { PageWrapper } from '@/components/Page'
import { Vue3TreeOrg } from 'vue3-tree-org'
import { VUE_TREE_ORG_PLUGIN } from '@/settings/websiteSetting'
import { data } from './data'

export default defineComponent({
  name: 'OrgTree',
  setup() {
    return () => (
      <PageWrapper plugin={VUE_TREE_ORG_PLUGIN}>
        {{
          default: () => (
            <div style='height: 420px;'>
              <Vue3TreeOrg data={data} />
            </div>
          )
        }}
      </PageWrapper>
    )
  }
})
