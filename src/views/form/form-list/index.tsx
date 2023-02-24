import type { FormInstance, CascaderProps, TreeSelectProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { defineComponent, ref, reactive, watch } from 'vue'
import { Card, Form, Row, Col, Input, InputNumber, Button, Select, DatePicker, TimePicker, Switch, Slider, Cascader,
  TreeSelect, Radio, Checkbox, Textarea } from 'ant-design-vue'
import { FORM_COMPO } from '@/settings/websiteSetting'
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
    
    return () => (
      <PageWrapper plugin={FORM_COMPO}>
        {{
          default: () => <Card bordered={false}>
              <Form
                ref={formRef}
                model={formState}
                rules={formRules}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                style='width: 40%; margin: 0 auto;'
              >
                <Form.Item label='输入框(长度限制):' name='inputLimit'>
                  <Input
                    v-model={[formState.inputLimit, 'value']}
                    showCount
                    maxlength={20}
                    placeholder='请输入内容'
                  />
                </Form.Item>
                <Form.Item label='输入框(纯数字):' name='inputNum'>
                  <InputNumber
                    v-model={[formState.inputNum, 'value']}
                    style='width: 100%;'
                    placeholder='请输入数字'
                  />
                </Form.Item>
                <Form.Item label='输入框(密码隐藏):' name='password'>
                  <Input.Password
                    v-model={[formState.password, 'value']}
                    maxlength={16}
                    autocomplete='off'
                    placeholder="请输入密码"
                  />
                </Form.Item>
                <Form.Item label='select选择器(联动):' name='selectProvince'>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Select
                        v-model={[formState.selectProvince, 'value']}
                        options={provinceData.map(pro => ({ value: pro }))}
                      />
                    </Col>
                    <Col span={12}>
                      <Form.Item name='selectCity'>
                        <Select
                          v-model={[formState.selectCity, 'value']}
                          options={cityData[formState.selectProvince].map(city => ({ value: city }))}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label='日期和时间选择器:' name='dateVal'>
                  <Row gutter={12}>
                    <Col span={12}>
                      <DatePicker
                        v-model={[formState.dateVal, 'value']}
                        placeholder='选择日期'
                        style='width: 100%;'
                      />
                    </Col>
                    <Col span={12}>
                      <Form.Item name='timeVal'>
                        <TimePicker
                          v-model={[formState.timeVal, 'value']}
                          placeholder='选择时间'
                          style='width: 100%;'
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label='switch开关(显示隐藏):' name='switchVal'>
                  <Switch v-model={[formState.switchVal, 'checked']} />
                </Form.Item>
                <div v-show={formState.switchVal}>
                  <Form.Item label='滑块条(初始值):' name='sliderVal'>
                    <Slider v-model={[formState.sliderVal, 'value']} />
                  </Form.Item>
                  <Form.Item label='级联选择器:' name='cascaderVal'>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Cascader
                          v-model={[formState.cascaderVal, 'value']}
                          options={cascaderData}
                          placeholder='请选择'
                        />
                      </Col>
                      <Col span={12}>
                        <Form.Item name='cascaderLazy'>
                          <Cascader
                            v-model={[formState.cascaderLazy, 'value']}
                            options={cascaderLazyData.value}
                            loadData={loadCascaderLazy}
                            changeOnSelect
                            placeholder='请输入'
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label='树选择器(可勾选):' name='treeVal'>
                    <Row gutter={12}>
                      <Col span={12}>
                        <TreeSelect
                          v-model={[formState.treeVal, 'value']}
                          treeData={treeData}
                          treeCheckable
                          allowClear
                          showCheckedStrategy={TreeSelect.SHOW_PARENT}
                          placeholder='请选择'
                        />
                      </Col>
                      <Col span={12}>
                        <Form.Item name='treeLazy'>
                          <TreeSelect
                            v-model={[formState.treeLazy, 'value']}
                            treeDataSimpleMode
                            treeData={treeLazyData.value}
                            loadData={loadTreeLazy}
                            placeholder='请选择'
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label='单选框(带禁止):' name='radioVal'>
                    <Radio.Group v-model={[formState.radioVal, 'value']} options={radioData} />
                  </Form.Item>
                  <Form.Item label='多选框(带禁止):' name='checkboxVal'>
                    <Checkbox.Group v-model={[formState.checkboxVal, 'value']} options={checkboxData} />
                  </Form.Item>
                  <Form.Item label='文本域(长度限制):' name='textareaVal'>
                    <Textarea
                      v-model={[formState.textareaVal, 'value']}
                      maxlength={50}
                      rows={3}
                      placeholder='请输入内容'
                    />
                  </Form.Item>
                </div>
                <Form.Item wrapperCol={{span: 12, offset: 12}}>
                  <Button type='primary' htmlType='submit'>提交</Button>
                  <Button style='margin-left: 12px;' onClick={resetForm}>重置</Button>
                </Form.Item>
              </Form>
            </Card>
        }}
      </PageWrapper>
    )
  }
})