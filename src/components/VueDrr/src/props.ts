import type { PropType } from 'vue'

type OverflowMode = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'

export const props = {
  active: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: Boolean,
    default: true
  },
  resizable: {
    type: Boolean,
    default: true
  },
  rotatable: {
    type: Boolean,
    default: true
  },
  canDeactive: {
    type: Boolean,
    default: true
  },
  w: {
    type: [Number],
    default: 200
  },
  h: {
    type: [Number, String],
    default: 28,
    validator: function (val) {
      const valid = typeof val === 'string' ? val === 'auto' : val >= 0
      return valid
    }
  },
  ratio: {
    type: [Number, String]
  },
  contains: {
    type: Boolean,
    default: false
  },
  minw: {
    type: Number,
    default: 28,
    validator(val) {
      return val > 0
    }
  },
  minh: {
    type: Number,
    default: 28,
    validator(val) {
      return val > 0
    }
  },
  angle: {
    type: Number,
    default: 0,
    validator(val) {
      return typeof val === 'number'
    }
  },
  x: {
    type: Number,
    default: 0,
    validator(val) {
      return typeof val === 'number'
    }
  },
  y: {
    type: Number,
    default: 0,
    validator(val) {
      return typeof val === 'number'
    }
  },
  z: {
    type: [String, Number],
    default: 'auto',
    validator: function (val) {
      const valid = typeof val === 'string' ? val === 'auto' : val >= 0
      return valid
    }
  },
  handles: {
    type: Array,
    default() {
      return ['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw']
    },
    validator: function (val) {
      const s = new Set(['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw'])

      return new Set(val.filter(h => s.has(h))).size === val.length
    }
  },
  dragHandle: {
    type: String,
    default: null
  },
  dragCancel: {
    type: String,
    default: null
  },
  axis: {
    type: String,
    default: 'both',
    validator(val) {
      return ['x', 'y', 'both'].indexOf(val) !== -1
    }
  },
  grid: {
    type: Array,
    default() {
      return [1, 1]
    }
  },
  parent: {
    type: Boolean,
    default: false
  },
  overflowY: {
    type: String as PropType<OverflowMode>,
    default: ''
  }
}
