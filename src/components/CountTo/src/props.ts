export const props = {
  startVal: {
    type: Number,
    default: 0
  },
  endVal: {
    type: Number,
    default: 2020
  },
  duration: {
    type: Number,
    default: 1500
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  decimals: {
    type: Number,
    default: 0,
    validator(value: number) {
      return value >= 0
    }
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  separator: {
    type: String,
    default: ','
  },
  decimal: {
    type: String,
    default: '.'
  },
  // Font size
  size: {
    type: Number,
    default: 32
  },
  // Font color
  color: {
    type: String,
    default: '#e65d6e'
  },
  // Turn on digital animation
  useEasing: {
    type: Boolean,
    default: true
  },
  // Digital animation
  transition: {
    type: String,
    default: 'linear'
  }
}
