import type { Component } from 'vue'
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  Tree,
  TreeSelect
} from 'ant-design-vue'
import {
  ApiCascader,
  ApiCheckboxGroup,
  ApiRadioGroup,
  ApiSelect,
  ApiTransfer,
  ApiTree,
  ApiTreeSelect
} from '../../ApiCompo'

export const compoMap = new Map<string, Component>([
  ['AutoComplete', AutoComplete],
  ['Cascader', Cascader],
  ['ApiCascader', ApiCascader],
  ['Checkbox', Checkbox],
  ['CheckboxGroup', Checkbox.Group],
  ['ApiCheckboxGroup', ApiCheckboxGroup],
  ['DatePicker', DatePicker],
  ['RangePicker', DatePicker.RangePicker],
  ['Input', Input],
  ['InputPassword', Input.Password],
  ['InputTextArea', Input.TextArea],
  ['InputNumber', InputNumber],
  ['RadioGroup', Radio.Group],
  ['ApiRadioGroup', ApiRadioGroup],
  ['Rate', Rate],
  ['Select', Select],
  ['ApiSelect', ApiSelect],
  ['Slider', Slider],
  ['Switch', Switch],
  ['TimePicker', TimePicker],
  ['TimeRangePicker', TimePicker.TimeRangePicker],
  ['Transfer', Transfer],
  ['ApiTransfer', ApiTransfer],
  ['Tree', Tree],
  ['ApiTree', ApiTree],
  ['TreeSelect', TreeSelect],
  ['ApiTreeSelect', ApiTreeSelect]
])
