import type { Component } from 'vue'
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker
} from 'ant-design-vue'
import { ApiCheckboxGroup, ApiRadioGroup, ApiSelect, ApiTreeSelect } from '../../ApiCompo'

export const compoMap = new Map<string, Component>([
  ['AutoComplete', AutoComplete],
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
  ['Select', Select],
  ['ApiSelect', ApiSelect],
  ['Switch', Switch],
  ['TimePicker', TimePicker],
  ['TimeRangePicker', TimePicker.TimeRangePicker],
  ['ApiTreeSelect', ApiTreeSelect]
])
