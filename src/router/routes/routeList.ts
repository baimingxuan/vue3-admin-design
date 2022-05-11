import Layout from '../../layout/index.vue'

export const asyncRoutes = [
    {
        path: '/tools',
        name: 'Tools',
        component: Layout,
        redirect: '/tools/image-upload',
        meta: {
            title: '组件',
            icon: 'vue-dsn-icon-zujian'
        },
        children: [
            {
                path: 'image-upload',
                name: 'ImageUpload',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '图片上传'
                }
            },
            {
                path: 'drag',
                name: 'Drag',
                component: () => import('../../views/home.vue'),
                redirect: '/tools/drag/drag-list',
                meta: {
                    title: '拖拽'
                },
                children: [
                    {
                        path: 'drag-list',
                        name: 'DragList',
                        component: () => import('../../views/home.vue'),
                        meta: {
                            title: '列表拖拽'
                        }
                    },
                    {
                        path: 'vue-drr',
                        name: 'VueDrr',
                        component: () => import('../../views/home.vue'),
                        meta: {
                            title: '组件拖拽'
                        }
                    }
                ]
            },
            {
                path: 'transfer',
                name: 'Transfer',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '穿梭框'
                }
            },
            {
                path: 'count-to',
                name: 'CountTo',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '数字滚动'
                }
            }
        ]
    },
    {
        path: '/tree',
        name: 'Tree',
        component: Layout,
        redirect: '/tree/org-tree',
        meta: {
            title: '树形结构',
            icon: 'vue-dsn-icon-shuxing'
        },
        children: [
            {
                path: 'org-tree',
                name: 'OrgTree',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '组织树'
                }
            },
            {
                path: 'ele-tree',
                name: 'EleTree',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '控件树'
                }
            }
        ]
    },
    {
        path: '/graph-editors',
        name: 'GraphEditors',
        component: Layout,
        redirect: '/graph-editors/flow',
        meta: {
            title: '图形编辑器',
            icon: 'vue-dsn-icon-excel'
        },
        children: [
            {
                path: 'flow',
                name: 'Flow',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '流程图'
                }
            },
            {
                path: 'mind-editor',
                name: 'MindEditor',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '思维导图'
                }
            }
        ]
    },
    {
        
    }
]
