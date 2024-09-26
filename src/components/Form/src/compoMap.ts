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
  // Transfer,
  TreeSelect
} from 'ant-design-vue'

export const compoMap = new Map<string, Component>([
  ['Input', Input],
  ['InputNumber', InputNumber],
  ['Select', Select],
  ['DatePicker', DatePicker],
  ['Checkbox', Checkbox],
  ['Cascader', Cascader],
  ['Radio', Radio],
  ['RadioGroup', RadioGroup],
  ['Switch', Switch],
  ['TreeSelect', TreeSelect]
])
