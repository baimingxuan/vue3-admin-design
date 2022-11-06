import type { FormInstance, CascaderProps, TreeSelectProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { defineComponent, ref, reactive, watch } from 'vue'
import { Card as AntdCard, Form as AntdForm, FormItem as AntdFormItem, Row as AntdRow, Col as AntdCol,
  Input as AntdInput, InputNumber as AntdInputNumber, InputPassword as AntdInputPassword, Button as AntdButton,
  Select as AntdSelect, DatePicker as AntdDatePicker, TimePicker as AntdTimePicker, Switch as AntdSwitch,
  Slider as AntdSlider, Cascader as AntdCascader, TreeSelect as AntdTreeSelect, RadioGroup as AntdRadioGroup,
  CheckboxGroup as AntdCheckboxGroup, Textarea as AntdTextarea
} from 'ant-design-vue'
import { FORM_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { PageWrapper } from '@/components/Page'
import { provinceData, cityData, cascaderData, treeData, radioData, checkboxData } from './data'

export default defineComponent({
  name: 'FormList',
  setup() {
    const formRef = ref<FormInstance>()

    const province = provinceData[0]
    const formState = reactive<Record<string, any>>({
      inputLimit: '',
      inputNum: '',
      password: '',
      selectProvince: province,
      selectCity: cityData[province][0],
      dateVal: '',
      timeVal: '',
      switchVal: true,
      sliderVal: 32,
      cascaderVal: [],
      cascaderLazy: [],
      treeVal: ['0-0-1'],
      treeLazy: '1',
      radioVal: 'offline',
      checkboxVal: ['read'],
      textareaVal: ''
    })

    const formRules: Record<string, Rule[]> = {
      inputLimit: [
        { required: true, message: '内容不能为空', trigger: 'blur' }
      ],
      inputNum: [
        { required: true, message: '内容不能为空', trigger: 'blur' },
        { type: 'number', message: '内容必须为数字值', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '内容不能为空', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: ['blur', 'change'] },
        { pattern: /^[a-zA-Z0-9_-]{6,16}$/, message: '密码只支持字母、数字和下划线', trigger: ['blur', 'change'] }
      ]
    }
    
    const cascaderLazyData = ref<CascaderProps['options']>([
      { value: 1, label: '选项1', isLeaf: false }
    ])

    const treeLazyData = ref<TreeSelectProps['treeData']>([
      { id: 1, pId: 0, value: '1', title: 'Expand to load' },
      { id: 2, pId: 0, value: '2', title: 'Expand to load' },
      { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
    ])

    watch(
      () => formState.selectProvince,
      val => {
        formState.selectCity = cityData[val][0]
      }
    )

    function loadCascaderLazy(selectedOptions: any) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true

      setTimeout(() => {
        targetOption.loading = false
        let id = selectedOptions.length
        const level = selectedOptions.length
        targetOption.children = Array.from({ length: level + 1 })
          .map(() => ({
            value: ++id,
            label: `选项${id}`,
            isLeaf: level >= 2
          }))
          cascaderLazyData.value = [...cascaderLazyData.value!]
      }, 1000)
    }

    function loadTreeLazy(treeNode: any) {
      const genTreeNode = (parentId: number, isLeaf = false) => {
        const random = Math.random().toString(36).substring(2, 6)
        return {
          id: random,
          pId: parentId,
          value: random,
          title: isLeaf ? 'Tree Node' : 'Expand to load',
          isLeaf
        }
      }

      return new Promise(resolve => {
        const { id } = treeNode.dataRef
        setTimeout(() => {
          treeLazyData.value = treeLazyData.value?.concat([
            genTreeNode(id, false),
            genTreeNode(id, true),
            genTreeNode(id, true)
          ])
          resolve(true)
        }, 1000)
      })
    }

    function resetForm() {
      console.log('formState', formState, formRef)
      formRef.value?.resetFields()
    }
    
    function openGithub() {
      openWindow(FORM_PLUGIN_URL)
    }
    
    return () => (
      <PageWrapper name='Form 表单'>
        {{
          header: () => <>
            <p>ant-design-form: 使用 ant-design 的 form 组件, 可用以收集、校验和提交数据等操作。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdCard bordered={false}>
              <AntdForm
                ref={formRef}
                model={formState}
                rules={formRules}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                style='width: 40%; margin: 0 auto;'
              >
                <AntdFormItem label='输入框(长度限制):' name='inputLimit'>
                  <AntdInput
                    v-model={[formState.inputLimit, 'value']}
                    showCount
                    maxlength={20}
                    placeholder='请输入内容'
                  />
                </AntdFormItem>
                <AntdFormItem label='输入框(纯数字):' name='inputNum'>
                  <AntdInputNumber
                    v-model={[formState.inputNum, 'value']}
                    style='width: 100%;'
                    placeholder='请输入数字'
                  />
                </AntdFormItem>
                <AntdFormItem label='输入框(密码隐藏):' name='password'>
                  <AntdInputPassword
                    v-model={[formState.password, 'value']}
                    maxlength={16}
                    autocomplete='off'
                    placeholder="请输入密码"
                  />
                </AntdFormItem>
                <AntdFormItem label='select选择器(联动):' name='selectProvince'>
                  <AntdRow gutter={12}>
                    <AntdCol span={12}>
                      <AntdSelect
                        v-model={[formState.selectProvince, 'value']}
                        options={provinceData.map(pro => ({ value: pro }))}
                      />
                    </AntdCol>
                    <AntdCol span={12}>
                      <AntdFormItem name='selectCity'>
                        <AntdSelect
                          v-model={[formState.selectCity, 'value']}
                          options={cityData[formState.selectProvince].map(city => ({ value: city }))}
                        />
                      </AntdFormItem>
                    </AntdCol>
                  </AntdRow>
                </AntdFormItem>
                <AntdFormItem label='日期和时间选择器:' name='dateVal'>
                  <AntdRow gutter={12}>
                    <AntdCol span={12}>
                      <AntdDatePicker
                        v-model={[formState.dateVal, 'value']}
                        placeholder='选择日期'
                        style='width: 100%;'
                      />
                    </AntdCol>
                    <AntdCol span={12}>
                      <AntdFormItem name='timeVal'>
                        <AntdTimePicker
                          v-model={[formState.timeVal, 'value']}
                          placeholder='选择时间'
                          style='width: 100%;'
                        />
                      </AntdFormItem>
                    </AntdCol>
                  </AntdRow>
                </AntdFormItem>
                <AntdFormItem label='switch开关(显示隐藏):' name='switchVal'>
                  <AntdSwitch v-model={[formState.switchVal, 'checked']} />
                </AntdFormItem>
                <div v-show={formState.switchVal}>
                  <AntdFormItem label='滑块条(初始值):' name='sliderVal'>
                    <AntdSlider v-model={[formState.sliderVal, 'value']} />
                  </AntdFormItem>
                  <AntdFormItem label='级联选择器:' name='cascaderVal'>
                    <AntdRow gutter={12}>
                      <AntdCol span={12}>
                        <AntdCascader
                          v-model={[formState.cascaderVal, 'value']}
                          options={cascaderData}
                          placeholder='请选择'
                        />
                      </AntdCol>
                      <AntdCol span={12}>
                        <AntdFormItem name='cascaderLazy'>
                          <AntdCascader
                            v-model={[formState.cascaderLazy, 'value']}
                            options={cascaderLazyData.value}
                            loadData={loadCascaderLazy}
                            changeOnSelect
                            placeholder='请输入'
                          />
                        </AntdFormItem>
                      </AntdCol>
                    </AntdRow>
                  </AntdFormItem>
                  <AntdFormItem label='树选择器(可勾选):' name='treeVal'>
                    <AntdRow gutter={12}>
                      <AntdCol span={12}>
                        <AntdTreeSelect
                          v-model={[formState.treeVal, 'value']}
                          treeData={treeData}
                          treeCheckable
                          allowClear
                          showCheckedStrategy={AntdTreeSelect.SHOW_PARENT}
                          placeholder='请选择'
                        />
                      </AntdCol>
                      <AntdCol span={12}>
                        <AntdFormItem name='treeLazy'>
                          <AntdTreeSelect
                            v-model={[formState.treeLazy, 'value']}
                            treeDataSimpleMode
                            treeData={treeLazyData.value}
                            loadData={loadTreeLazy}
                            placeholder='请选择'
                          />
                        </AntdFormItem>
                      </AntdCol>
                    </AntdRow>
                  </AntdFormItem>
                  <AntdFormItem label='单选框(带禁止):' name='radioVal'>
                    <AntdRadioGroup v-model={[formState.radioVal, 'value']} options={radioData} />
                  </AntdFormItem>
                  <AntdFormItem label='多选框(带禁止):' name='checkboxVal'>
                    <AntdCheckboxGroup v-model={[formState.checkboxVal, 'value']} options={checkboxData} />
                  </AntdFormItem>
                  <AntdFormItem label='文本域(长度限制):' name='textareaVal'>
                    <AntdTextarea
                      v-model={[formState.textareaVal, 'value']}
                      maxlength={50}
                      rows={3}
                      placeholder='请输入内容'
                    />
                  </AntdFormItem>
                </div>
                <AntdFormItem wrapperCol={{span: 12, offset: 12}}>
                  <AntdButton type='primary' htmlType='submit'>提交</AntdButton>
                  <AntdButton style='margin-left: 12px;' onClick={resetForm}>重置</AntdButton>
                </AntdFormItem>
              </AntdForm>
            </AntdCard>
        }}
      </PageWrapper>
    )
  }
})