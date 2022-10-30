import type { AppRoute } from '../../types'
import Layout from '@/layout/index.vue'

// text-editor module page
const TextEditorRoute: AppRoute = {
    path: '/editor',
    name: 'Editor',
    component: Layout,
    redirect: '/editor/markdown',
    meta: {
        title: '文本编辑器',
        icon: 'editor',
        orderNo: 7
    },
    children: [
        {
            path: 'markdown',
            name: 'Markdown',
            component: () => import('@/views/editor/markdown/index.vue'),
            meta: {
                title: 'Markdown编辑器'
            }
        },
        {
            path: 'rich-text',
            name: 'ImageRichText',
            component: () => import('@/views/home.vue'),
            meta: {
                title: '富文本编辑器'
            }
        }
    ]
}

export default TextEditorRoute