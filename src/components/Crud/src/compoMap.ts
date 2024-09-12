import type { Component } from 'vue'
import {
  Input,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Cascader,
  Radio,
  RadioGroup,
  Switch,
  Transfer,
  TreeSelect
} from 'ant-design-vue'

export const compoMap = new Map<string, Component>([
  ['input', Input],
  ['inputNumber', InputNumber],
  ['select', Select],
  ['datePicker', DatePicker],
  ['checkbox', Checkbox],
  ['cascader', Cascader],
  ['radio', Radio],
  ['radioGroup', RadioGroup],
  ['switch', Switch],
  ['transfer', Transfer],
  ['treeSelect', TreeSelect]
])
