import type { PropType } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import type { styleState } from '@/types'
import { defineComponent, ref, unref, watch } from 'vue'
import { Form, Button, Space, Select, Dropdown, Menu } from 'ant-design-vue'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import RichTextInput from './RichTextInput'
import SvgIcon from '@/components/SvgIcon'

const alignItems: MenuProps['items'] = [
  {
    key: 'left',
    label: '左对齐'
  },
  {
    key: 'center',
    label: '居中'
  },
  {
    key: 'right',
    label: '右对齐'
  }
]

export default defineComponent({
  name: 'RichTextSetting',
  props: {
    textValue: {
      type: String,
      default: ''
    },
    textStyles: {
      type: Object as PropType<styleState>,
      default: () => ({})
    }
  },
  emits: ['changeValue', 'changeStyles'],
  setup(props, { emit }) {
    const rtValue = ref<string>(props.textValue)
    const { getThemeColor } = useBaseSetting()

    watch(
      () => props.textValue,
      value => (rtValue.value = value)
    )

    watch(
      () => rtValue.value,
      value => emit('changeValue', value)
    )

    const handleTextAlign: MenuProps['onClick'] = ({ key }) => {
      emit('changeStyles', { ...props.textStyles, textAlign: key })
    }

    const handleChangeStyle = (type: 'fontWeight' | 'fontStyle' | 'textShadow', val: string) => {
      let styleVal = ''
      switch (type) {
        case 'fontWeight':
          styleVal = val ? '' : 'bold'
          break
        case 'fontStyle':
          styleVal = val ? '' : 'italic'
          break
        case 'textShadow':
          styleVal = val ? '' : '1px 1px 1px #333'
          break
      }
      emit('changeStyles', { ...props.textStyles, [type]: styleVal ? styleVal : '' })
    }

    return () => (
      <Form
        colon={false}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign='left'
        style={{ width: '300px', margin: '0 auto' }}
      >
        <Form.Item label='文本'>
          <RichTextInput v-model:value={rtValue.value} hasBorder />
        </Form.Item>
        <Form.Item label='字体'>
          <Select
            value={props.textStyles.fontFamily}
            onChange={(value: string) => emit('changeStyles', { ...props.textStyles, fontFamily: value })}
          >
            {['黑体', '宋体', '楷体', '隶书', '微软雅黑', '华文行楷', '方正姚体'].map(item => {
              return (
                <Select.Option value={item} key={item} style={{ fontFamily: item }}>
                  {item}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item label='字号'>
          <Select
            value={props.textStyles.fontSize}
            onChange={(value: string) =>
              emit('changeStyles', { ...props.textStyles, fontSize: value, lineHeight: value })
            }
          >
            {[12, 14, 16, 20, 24, 32, 48].map(item => {
              return (
                <Select.Option value={item + 'px'} key={item} style={{ fontSize: item + 'px' }}>
                  {item + 'px'}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item label='样式'>
          <Space size={6}>
            {/* <ColorPicker onChange={(_, hex: string) => emit('changeStyles', { ...props.textStyles, color: hex })}> */}
            <Button icon={<SvgIcon name='color-font' size={20} />} style={{ color: props.textStyles.color }} />
            {/* </ColorPicker> */}
            {/* <ColorPicker
              onChange={(_, hex: string) => emit('changeStyles', { ...props.textStyles, backgroundColor: hex })}
            > */}
            <Button icon={<SvgIcon name='color-bg' size={20} />} style={{ color: props.textStyles.backgroundColor }} />
            {/* </ColorPicker> */}
            <Button
              icon={<SvgIcon name='font-bold' size={20} />}
              style={{ color: props.textStyles.fontWeight ? unref(getThemeColor) : '' }}
              onClick={() => handleChangeStyle('fontWeight', props.textStyles.fontWeight!)}
            />
            <Button
              icon={<SvgIcon name='font-italic' size={20} />}
              style={{ color: props.textStyles.fontStyle ? unref(getThemeColor) : '' }}
              onClick={() => handleChangeStyle('fontStyle', props.textStyles.fontStyle!)}
            />
            <Button
              icon={<SvgIcon name='font-shadow' size={20} />}
              style={{ color: props.textStyles.textShadow ? unref(getThemeColor) : '' }}
              onClick={() => handleChangeStyle('textShadow', props.textStyles.textShadow!)}
            />
            <Dropdown placement='bottomRight' trigger={['click']}>
              {{
                default: () => <Button icon={<SvgIcon name='font-align' size={20} />} />,
                overlay: () => (
                  <Menu items={alignItems} selectedKeys={[props.textStyles.textAlign!]} onClick={handleTextAlign} />
                )
              }}
            </Dropdown>
          </Space>
        </Form.Item>
      </Form>
    )
  }
})
