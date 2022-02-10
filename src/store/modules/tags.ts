import { defineStore } from 'pinia'
import type { Menu } from '@/router/types'

interface tagsState {
    visitedViews: Menu[]
    cachedViews: Menu[]
}

export const tagsStore = defineStore({
    id: 'app-tags',
    state: (): tagsState => ({
        visitedViews: [],
        cachedViews: []
    }),
    getters: {
        getVisitedViews(): Menu[] {
            return this.visitedViews
        },
        getCachedViews(): Menu[] {
            return this.cachedViews
        }
    },
    actions: {
        setVisitedView(view: Menu) {
            if (this.visitedViews.some((item) => item.path === view.path)) return
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || 'no-title'
                })
            )
        },
        delVisitedView(view: Menu) {
            const index = this.visitedViews.findIndex(item => {
                return item.path === view.path
            })
            this.visitedViews.splice(index, 1)
        },
        delAllVisitedView() {
            this.visitedViews = this.visitedViews.filter(item => item.meta.fixed)
        },
        delOthersVisitedView(view: Menu) {
            this.visitedViews = this.visitedViews.filter(item => {
                return item.meta.fixed || item.path === view.path
            })
        }
    }
})
