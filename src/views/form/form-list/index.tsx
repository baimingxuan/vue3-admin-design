import { defineComponent, ref, reactive, watch } from 'vue'
import { Card as AntdCard, Form as AntdForm, FormItem as AntdFormItem, Row as AntdRow, Col as AntdCol,
  Input as AntdInput, InputNumber as AntdInputNumber, InputPassword as AntdInputPassword, Button as AntdButton,
  Select as AntdSelect, DatePicker as AntdDatePicker, TimePicker as AntdTimePicker, Switch as AntdSwitch,
  Slider as AntdSlider, Cascader as AntdCascader } from 'ant-design-vue'
import { FORM_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { PageWrapper } from '@/components/Page'
import { provinceData, cityData, cascaderData } from './data'

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
      cascaderLazy: ''
    })

    const lazyOptions = ref([])

    const loadCascaders = selectedOptions => {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true

      setTimeout(() => {
        targetOption.loading = false
        targetOption.children = []
      }, 1000)
    }

    watch(
      () => formState.selectProvince,
      val => {
        formState.selectCity = cityData[val][0]
      }
    )

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
                          v-model={[formState.cascaderLazy, 'value']}
                          options={lazyOptions}
                          loadData={loadCascaders}
                          changeOnSelect
                        />
                      </AntdCol>
                    </AntdRow>
                  </AntdFormItem>
                </div>
              </AntdForm>
            </AntdCard>
        }}
      </PageWrapper>
    )
  }
})