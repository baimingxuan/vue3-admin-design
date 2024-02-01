import type { BaseNodeModel, ConnectRule } from '@logicflow/core'
import type LogicFlow from '@logicflow/core'
import type GraphModel from '@logicflow/core/types/model/GraphModel'
import type { nodeProperty } from './type'
import { CircleNodeModel, CircleNode, h, RectNode, RectNodeModel, PolygonNode, PolygonNodeModel } from '@logicflow/core'

export default function RegisteNode(lf: LogicFlow) {
  class ApplyNodeModel extends CircleNodeModel {
    getConnectedTargetRules(): ConnectRule[] {
      const rules = super.getConnectedTargetRules()
      const geteWayOnlyAsTarget = {
        message: '开始节点只能连出，不能连入！',
        validate: (_source: BaseNodeModel, target: BaseNodeModel) => {
          let isValid = true
          if (target) {
            isValid = false
          }
          return isValid
        }
      }
      // @ts-ignore
      rules.push(geteWayOnlyAsTarget)
      return rules
    }
  }
  lf.value?.register({
    type: 'apply',
    view: CircleNode,
    model: ApplyNodeModel
  })

  class ApproverNode extends RectNode {
    static extendKey = 'UserTaskNode'
    getLabelShape() {
      const { x, y, width, height, properties } = this.props.model
      const { labelColor, approveTypeLabel } = properties as nodeProperty
      return h(
        'text',
        {
          fill: labelColor,
          fontSize: 12,
          x: x - width / 2 + 5,
          y: y - height / 2 + 15,
          width: 50,
          height: 25
        },
        approveTypeLabel
      )
    }
    getShape() {
      const { x, y, width, height, radius } = this.props.model
      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width,
          height
        }),
        this.getLabelShape()
      ])
    }
  }
  class ApproverModel extends RectNodeModel {
    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel)
      this.properties = {
        labelColor: '#000000',
        approveTypeLabel: '',
        approveType: ''
      }
    }
  }

  lf.value?.register({
    type: 'approver',
    view: ApproverNode,
    model: ApproverModel
  })

  class JugementModel extends PolygonNodeModel {
    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel)
      this.points = [
        [35, 0],
        [70, 35],
        [35, 70],
        [0, 35]
      ]
      this.properties = {
        api: ''
      }
    }
  }
  lf.value?.register({
    type: 'jugement',
    view: PolygonNode,
    model: JugementModel
  })

  class FinshNodeModel extends CircleNodeModel {
    getConnectedSourceRules(): ConnectRule[] {
      const rules = super.getConnectedSourceRules()
      const geteWayOnlyAsTarget = {
        message: '结束节点只能连入，不能连出！',
        validate: (source: BaseNodeModel) => {
          let isValid = true
          if (source) {
            isValid = false
          }
          return isValid
        }
      }
      // @ts-ignore
      rules.push(geteWayOnlyAsTarget)
      return rules
    }
  }
  lf.value?.register({
    type: 'finsh',
    view: CircleNode,
    model: FinshNodeModel
  })
}
