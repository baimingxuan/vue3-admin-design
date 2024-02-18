import { defineComponent, computed, unref, ref, watch, nextTick, Teleport, Transition } from 'vue'
import { Input } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useRefs } from '@/hooks/core/useRefs'
import { useMenuSearch } from './useMenuSearch'
import SvgIcon from '@/components/SvgIcon'
import clickOutside from '@/directives/clickOutside'
import compoStyle from './modal.module.less'

export default defineComponent({
  name: 'SearchModal',
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    clickOutside
  },
  emits: ['close'],
  setup(props, { emit }) {
    const prefixCls = 'app-search-modal'
    const inputRef = ref<Nullable<HTMLElement>>(null)
    const scrollWrap = ref<Nullable<ElRef>>(null)

    const [refs, setRefs] = useRefs()

    const { handleSearch, searchResult, keyword, activeIndex, handleEnter, handleMouseenter } = useMenuSearch(
      refs,
      scrollWrap,
      emit
    )

    const getIsNotData = computed(() => !keyword || unref(searchResult).length === 0)

    watch(
      () => props.visible,
      (visible: boolean) => {
        visible &&
          nextTick(() => {
            unref(inputRef)?.focus()
          })
      }
    )

    function handleClose() {
      searchResult.value = []
      emit('close')
    }

    return () => (
      <Teleport to='body'>
        <Transition name='zoom-fade' mode='out-in'>
          {props.visible && (
            <div class={compoStyle[prefixCls]} onClickStop>
              <div class={compoStyle[`${prefixCls}-content`]} v-click-outside={handleClose}>
                <div class={compoStyle[`${prefixCls}-input__wrapper`]}>
                  <Input
                    ref={inputRef}
                    class={compoStyle[`${prefixCls}-input`]}
                    placeholder='搜索'
                    allowClear
                    onChange={handleSearch}
                  >
                    {{
                      prefix: () => <SearchOutlined />
                    }}
                  </Input>
                </div>
                <div v-show={unref(getIsNotData)} class={compoStyle[`${prefixCls}-not-data`]}>
                  暂无搜索结果
                </div>
                <ul ref={scrollWrap} v-show={!unref(getIsNotData)} class={compoStyle[`${prefixCls}-list`]}>
                  {unref(searchResult).map((item, index) => {
                    return (
                      <li
                        ref={setRefs(index)}
                        key={item.path}
                        dataIndex={index}
                        class={[
                          compoStyle[`${prefixCls}-list__item`],
                          {
                            [compoStyle[`${prefixCls}-list__item--active`]]: unref(activeIndex) === index
                          }
                        ]}
                        onMouseenter={() => handleMouseenter(index)}
                        onClick={handleEnter}
                      >
                        <div class={compoStyle[`${prefixCls}-list__item-icon`]}>
                          <SvgIcon name={item.icon || ''} size={20} />
                        </div>
                        <div class={compoStyle[`${prefixCls}-list__item-text`]}>{item.name}</div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}
        </Transition>
      </Teleport>
    )
  }
})
