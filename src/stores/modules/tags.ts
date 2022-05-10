import { defineStore } from 'pinia'
import type { AppMenu } from '@/router/types'

interface tagsState {
    visitedViews: AppMenu[]
    cachedViews: AppMenu[]
}

export const useTagsStore = defineStore({
    id: 'app-tags',
    state: (): tagsState => ({
        visitedViews: [],
        cachedViews: []
    }),
    getters: {
        getVisitedViews(): AppMenu[] {
            return this.visitedViews
        },
        getCachedViews(): AppMenu[] {
            return this.cachedViews
        }
    },
    actions: {
        setVisitedView(view: AppMenu) {
            if (this.visitedViews.some((item) => item.path === view.path)) return
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view?.meta?.title || 'no-title'
                })
            )
        },
        delVisitedView(view: AppMenu) {
            const index = this.visitedViews.findIndex(item => {
                return item.path === view.path
            })
            this.visitedViews.splice(index, 1)
        },
        delAllVisitedView() {
            this.visitedViews = this.visitedViews.filter(item => item?.meta?.fixed)
        },
        delOthersVisitedView(view: AppMenu) {
            this.visitedViews = this.visitedViews.filter(item => {
                return item?.meta?.fixed || item.path === view.path
            })
        }
    }
})
