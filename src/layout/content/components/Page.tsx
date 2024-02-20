import { defineComponent, computed, unref, Transition, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'

export default defineComponent({
  name: 'LayoutPage',

  setup() {
    const { getOpenKeepAlive } = useBaseSetting()
    const { getShowTags } = useHeaderSetting()
    const { getOpenTransition, getBasicTransition } = useTransitionSetting()

    const openPageCache = computed(() => unref(getOpenKeepAlive) && unref(getShowTags))

    function getTransitionName({ openTransition, def }: { openTransition: boolean; def: string }): string | undefined {
      if (!openTransition) return undefined
      return def
    }

    return () => (
      <RouterView>
        {{
          default: ({ Component, route }) => {
            return (
              <Transition
                name={getTransitionName({
                  openTransition: unref(getOpenTransition),
                  def: unref(getBasicTransition)
                })}
                mode='out-in'
                appear
              >
                <div>
                  {unref(openPageCache) ? (
                    <KeepAlive>
                      <Component key={route.fullPath} />
                    </KeepAlive>
                  ) : (
                    <Component key={route.fullPath} />
                  )}
                </div>
              </Transition>
            )
          }
        }}
      </RouterView>
    )
  }
})
