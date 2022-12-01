export interface DataItem {
  key: number
  name: string
  sex: string
  phone: number
  birth: string
  education: string
  hobby: string
  forbid: boolean
  editable: boolean
}

export const tableData: DataItem[] = [
  {
    key: 1001,
    name: '张三',
    sex: '男',
    phone: 15266001235,
    birth: '2002-05-06',
    education: '高中',
    hobby: '羽毛球、篮球、听歌、阅读',
    forbid: false,
    editable: true
  },
  {
    key: 1002,
    name: '李四',
    sex: '男',
    phone: 15266006621,
    birth: '1998-09-21',
    education: '初中',
    hobby: '乒乓球、排球、游泳',
    forbid: true,
    editable: false
  },
  {
    key: 1003,
    name: '王五',
    sex: '男',
    phone: 15264848125,
    birth: '1993-06-06',
    education: '本科',
    hobby: '旱冰、滑雪、跳高、打游戏',
    forbid: false,
    editable: false
  },
  {
    key: 1004,
    name: '辛八',
    sex: '男',
    phone: 15248491001,
    birth: '1995-08-03',
    education: '大专',
    hobby: '网球、篮球、跳伞',
    forbid: true,
    editable: false
  },
  {
    key: 1005,
    name: '刘二',
    sex: '女',
    phone: 15248411021,
    birth: '1999-11-05',
    education: '本科',
    hobby: '滑翔、游泳、篮球、看电影',
    forbid: true,
    editable: false
  },
  {
    key: 1006,
    name: '赵七',
    sex: '男',
    phone: 15298621500,
    birth: '2000-07-18',
    education: '大专',
    hobby: '游泳、篮球、潜水',
    forbid: false,
    editable: false
  },
  {
    key: 1007,
    name: '杨一',
    sex: '女',
    phone: 15267499461,
    birth: '1998-12-25',
    education: '高中',
    hobby: '冲浪、上网、看书、打游戏',
    forbid: false,
    editable: false
  }
]
