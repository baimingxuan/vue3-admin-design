import Layout from '../../layout/index.vue'

export const asyncRoutes = [
    {
        path: '/form-table',
        name: 'FormTable',
        component: Layout,
        redirect: '/form-table/table-classic',
        meta: {
            title: '表格&表单',
            icon: 'vue-dsn-icon-biaoge'
        },
        children: [
            {
                path: 'table-classic',
                name: 'TableClassic',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '综合表格'
                }
            },
            {
                path: 'form-list',
                name: 'FormList',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '表单列表'
                }
            },
            {
                path: 'table-inline-edit',
                name: 'TableInlineEdit',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '行内编辑表格'
                }
            }
        ]
    },
    {
        path: '/image',
        name: 'Image',
        component: Layout,
        redirect: '/image/image-cropper',
        meta: {
            title: '图片处理',
            icon: 'vue-dsn-icon-picture'
        },
        children: [
            {
                path: 'image-cropper',
                name: 'ImageCropper',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '图片裁剪'
                }
            },
            {
                path: 'image-compress',
                name: 'ImageCompress',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '图片压缩'
                }
            },
            {
                path: 'image-synthesizer',
                name: 'ImageSynthesizer',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '图片合成'
                }
            }
        ]
    },
    {
        path: '/video',
        name: 'Video',
        component: Layout,
        redirect: '/video/video-player',
        meta: {
            title: '视频处理',
            icon: 'vue-dsn-icon-video'
        },
        children: [
            {
                path: 'video-player',
                name: 'VideoPlayer',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '视频播放器'
                }
            },
            {
                path: 'video-mark',
                name: 'VideoMark',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '视频水印'
                }
            }
        ]
    },
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
        path: '/editors',
        name: 'Editors',
        component: Layout,
        redirect: '/editors/markdown',
        meta: {
            title: '编辑器',
            icon: 'vue-dsn-icon-bianjiqi'
        },
        children: [
            {
                path: 'markdown',
                name: 'Markdown',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: 'Markdown编辑器'
                }
            },
            {
                path: 'rich-text',
                name: 'ImageRichText',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '富文本编辑器'
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
        path: '/excel',
        name: 'Excel',
        component: Layout,
        redirect: '/excel/export-excel',
        meta: {
            title: 'Excel',
            icon: 'vue-dsn-icon-excel'
        },
        children: [
            {
                path: 'export-excel',
                name: 'ExportExcel',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '导出Excel'
                }
            },
            {
                path: 'import-excel',
                name: 'ImportExcel',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '导入Excel'
                }
            }
        ]
    },
    {
        path: '/error-page',
        name: 'ErrorPage',
        component: Layout,
        redirect: '/error-page/page-401',
        meta: {
            title: '错误页面',
            icon: 'vue-dsn-icon-bug'
        },
        children: [
            {
                path: 'page-401',
                name: 'Page401',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '401页面'
                }
            },
            {
                path: 'page-404',
                name: 'Page404',
                component: () => import('../../views/home.vue'),
                meta: {
                    title: '404页面'
                }
            }
        ]
    }
]
