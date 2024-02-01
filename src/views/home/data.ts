import type { EChartsOption } from 'echarts'

export const countToData = [
  {
    title: '今日点击',
    icon: 'location',
    count: 682,
    color: '#1890ff'
  },
  {
    title: '新增用户',
    icon: 'person',
    count: 259,
    color: '#fa541c'
  },
  {
    title: '信息发送',
    icon: 'message',
    count: 1262,
    color: '#faad14'
  },
  {
    title: '点赞统计',
    icon: 'like',
    count: 508,
    color: '#13c2c2'
  },
  {
    title: '累计收藏',
    icon: 'heart',
    count: 379,
    color: '#722ed1'
  }
]

export const pieOptions: EChartsOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: 0,
    left: 'center'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '70%',
      center: ['50%', '45%'],
      color: ['#1890ff', '#fa541c', '#faad14', '#13c2c2', '#722ed1'],
      data: [
        { value: 1620, name: '直接访问' },
        { value: 1169, name: '邮件营销' },
        { value: 986, name: '联盟广告' },
        { value: 624, name: '视频广告' },
        { value: 857, name: '搜索引擎' }
      ],
      roseType: 'radius',
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay: function () {
        return Math.random() * 400
      }
    }
  ]
}

export const ringOptions: EChartsOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: 0,
    left: 'center'
  },
  series: [
    {
      color: ['#1890ff', '#fa541c', '#faad14', '#13c2c2', '#722ed1'],
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1620, name: '直接访问' },
        { value: 1169, name: '邮件营销' },
        { value: 986, name: '联盟广告' },
        { value: 624, name: '视频广告' },
        { value: 2758, name: '搜索引擎' }
      ],
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay: function () {
        return Math.random() * 100
      }
    }
  ]
}

export const radarOptions: EChartsOption = {
  legend: {
    bottom: 0,
    data: ['推广渠道', '广告投放', '访问来源']
  },
  radar: {
    radius: '70%',
    center: ['50%', '45%'],
    splitNumber: 8,
    indicator: [
      {
        name: '直接访问'
      },
      {
        name: '邮件营销'
      },
      {
        name: '联盟广告'
      },
      {
        name: '视频广告'
      },
      {
        name: '搜索引擎'
      }
    ]
  },
  series: [
    {
      type: 'radar',
      symbolSize: 0,
      areaStyle: {
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,.2)',
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        opacity: 1
      },
      data: [
        {
          value: [1920, 1920, 1920, 0, 0],
          name: '推广渠道',
          itemStyle: {
            color: '#1890ff'
          }
        },
        {
          value: [1920, 0, 0, 1920, 1920],
          name: '访问来源',
          itemStyle: {
            color: '#722ed1'
          }
        },
        {
          value: [920, 920, 920, 920, 920],
          name: '广告投放',
          itemStyle: {
            color: '#faad14'
          }
        }
      ]
    }
  ]
}

export const barOptions: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1,
        color: '#fa541c'
      }
    }
  },
  grid: {
    left: 0,
    right: '1%',
    top: '2%',
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value',
    max: value => {
      return Math.ceil(value.max / 100) * 100 + 300
    }
  },
  label: {
    show: true,
    fontSize: 14,
    color: '#1890ff',
    position: 'top',
    formatter: '{c}'
  },
  series: [
    {
      type: 'bar',
      name: '访问量',
      barWidth: '40%',
      color: ['#1890ff'],
      data: [782, 925, 1196, 812, 328, 223, 1080]
    }
  ]
}

export const lineOptions: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1,
        color: '#fa541c'
      }
    }
  },
  grid: {
    left: 0,
    right: '1%',
    top: '2%',
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value',
    max: value => {
      return Math.ceil(value.max / 100) * 100 + 300
    }
  },
  label: {
    show: true,
    fontSize: 14,
    color: '#722ed1',
    position: 'top',
    formatter: '{c}'
  },
  series: [
    {
      type: 'line',
      name: '访问量',
      color: ['#722ed1'],
      smooth: true,
      data: [782, 925, 1196, 812, 328, 223, 1080]
    }
  ]
}
