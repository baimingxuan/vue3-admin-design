import { defineComponent, reactive, watch } from 'vue'
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
      cascaderVal: '',
      cascaderSearch: '',
      treeVal: undefined,
      treeLazy: undefined,
      radioVal: 'offline',
      checkboxVal: 'read',
      textareaVal: ''
    })
    let treeLazyData = [
      { id: 1, pId: 0, value: '1', title: 'Expand to load' },
      { id: 2, pId: 0, value: '2', title: 'Expand to load' },
      { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true }
    ]

    watch(
      () => formState.selectProvince,
      val => {
        formState.selectCity = cityData[val][0]
      }
    )

    function filterCascader(inputValue, path) {
      const isBoolean: boolean = path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
      return isBoolean
    }

    function loadLazyTree(treeNode: any) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve(true)
          return
        }
        
        const { id } = treeNode.dataRef
        const random = Math.random().toString(36).substring(2, 6)
        setTimeout(() => {
          treeLazyData = treeLazyData.concat([
            {
              id: random as unknown as number,
              pId: id,
              value: random,
              title: 'Tree Node',
              isLeaf: false
            }
          ])
          resolve(true)
        }, 1000)
      })
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
              <AntdForm model={formState} labelCol={{span: 6}} wrapperCol={{span: 18}} style='width: 40%; margin: 0 auto;'>
                <AntdFormItem label='输入框(长度限制):'>
                  <AntdInput
                    v-model={[formState.inputLimit, 'value']}
                    showCount
                    maxlength={20}
                    placeholder='请输入内容'
                  />
                </AntdFormItem>
                <AntdFormItem label='输入框(纯数字):'>
                  <AntdInputNumber
                    v-model={[formState.inputNum, 'value']}
                    style='width: 100%;'
                    placeholder='请输入数字'
                  />
                </AntdFormItem>
                <AntdFormItem label='输入框(密码隐藏):'>
                  <AntdInputPassword
                    v-model={[formState.password, 'value']}
                    maxlength={16}
                    placeholder="请输入密码"
                  />
                </AntdFormItem>
                <AntdFormItem label='select选择器(联动):'>
                  <AntdRow gutter={12}>
                    <AntdCol span={12}>
                      <AntdSelect
                        v-model={[formState.selectProvince, 'value']}
                        options={provinceData.map(pro => ({ value: pro }))}
                      />
                    </AntdCol>
                    <AntdCol span={12}>
                      <AntdSelect
                        v-model={[formState.selectCity, 'value']}
                        options={cityData[formState.selectProvince].map(city => ({ value: city }))}
                      />
                    </AntdCol>
                  </AntdRow>
                </AntdFormItem>
                <AntdFormItem label='日期和时间选择器:'>
                  <AntdRow gutter={12}>
                    <AntdCol span={12}>
                      <AntdDatePicker
                        v-model={[formState.dateVal, 'value']}
                        placeholder='选择日期'
                        style='width: 100%;'
                      />
                    </AntdCol>
                    <AntdCol span={12}>
                      <AntdTimePicker
                        v-model={[formState.timeVal, 'value']}
                        placeholder='选择时间'
                        style='width: 100%;'
                      />
                    </AntdCol>
                  </AntdRow>
                </AntdFormItem>
                <AntdFormItem label='switch开关(显示隐藏):'>
                  <AntdSwitch v-model={[formState.switchVal, 'checked']} />
                </AntdFormItem>
                <div v-show={formState.switchVal}>
                  <AntdFormItem label='滑块条(初始值):'>
                    <AntdSlider v-model={[formState.sliderVal, 'value']} />
                  </AntdFormItem>
                  <AntdFormItem label='级联选择器:'>
                    <AntdRow gutter={12}>
                      <AntdCol span={12}>
                        <AntdCascader
                          v-model={[formState.cascaderVal, 'value']}
                          options={cascaderData}
                          placeholder='请选择'
                        />
                      </AntdCol>
                      <AntdCol span={12}>
                        <AntdCascader
                          v-model={[formState.cascaderSearch, 'value']}
                          options={cascaderData}
                          showSearch={filterCascader}
                          placeholder='请输入'
                        />
                      </AntdCol>
                    </AntdRow>
                  </AntdFormItem>
                  <AntdFormItem label='树选择器(可勾选):'>
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
                        <AntdTreeSelect
                          v-model={[formState.treeLazy, 'value']}
                          treeDataSimpleMode
                          treeData={treeLazyData}
                          loadData={loadLazyTree}
                          placeholder='请选择'
                        />
                      </AntdCol>
                    </AntdRow>
                  </AntdFormItem>
                  <AntdFormItem label='单选框(带禁止):'>
                    <AntdRadioGroup v-model={[formState.radioVal, 'value']} options={radioData} />
                  </AntdFormItem>
                  <AntdFormItem label='多选框(带禁止):'>
                    <AntdCheckboxGroup v-model={[formState.checkboxVal, 'value']} options={checkboxData} />
                  </AntdFormItem>
                  <AntdFormItem label='文本域(长度限制):'>
                    <AntdTextarea
                      v-model={[formState.textareaVal, 'value']}
                      maxlength={50}
                      rows={3}
                      placeholder='请输入内容'
                    />
                  </AntdFormItem>
                </div>
              </AntdForm>
            </AntdCard>
        }}
      </PageWrapper>
    )
  }
})