import type { AppRoute } from '../../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

// text-editor module page
const TextEditorRoute: AppRoute = {
  path: '/editor',
  name: 'Editor',
  component: Layout,
  redirect: '/editor/markdown',
  meta: {
    title: t('routes.editor.name'),
    icon: 'editor',
    orderNo: 7
  },
  children: [
    {
      path: 'markdown',
      name: 'Markdown',
      component: () => import('@/views/editor/markdown'),
      meta: {
        title: t('routes.editor.markdown')
      }
    },
    {
      path: 'rich-text',
      name: 'RichText',
      component: () => import('@/views/editor/rich-text'),
      meta: {
        title: t('routes.editor.richText')
      }
    },
    {
      path: 'code-editor',
      name: 'CodeEditor',
      component: () => import('@/views/editor/code-mirror'),
      meta: {
        title: t('routes.editor.codeEditor')
      }
    }
  ]
}

export default TextEditorRoute
