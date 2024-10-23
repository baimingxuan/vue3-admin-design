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
  TreeSelect
} from 'ant-design-vue'

export const compoMap = new Map<string, Component>([
  ['AutoComplete', AutoComplete],
  ['Cascader', Cascader],
  ['Checkbox', Checkbox],
  ['CheckboxGroup', Checkbox.Group],
  ['DatePicker', DatePicker],
  ['RangePicker', DatePicker.RangePicker],
  ['Input', Input],
  ['InputPassword', Input.Password],
  ['InputTextArea', Input.TextArea],
  ['InputNumber', InputNumber],
  ['RadioGroup', Radio.Group],
  ['Rate', Rate],
  ['Select', Select],
  ['Slider', Slider],
  ['Switch', Switch],
  ['TimePicker', TimePicker],
  ['TimeRangePicker', TimePicker.TimeRangePicker],
  ['Transfer', Transfer],
  ['TreeSelect', TreeSelect]
])
