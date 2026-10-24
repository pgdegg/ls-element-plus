import {
  Comment,
  cloneVNode,
  createTextVNode,
  createVNode,
  defineComponent,
  isVNode,
  renderSlot,
} from 'vue'
import {
  PatchFlags,
  buildProps,
  definePropType,
  isArray,
  isFragment,
  isNumber,
  isString,
  isValidElementNode,
} from '@element-plus/utils'
import { componentSizes } from '@element-plus/constants'
import Item from './item'
import { useSpace } from './use-space'

import type {
  ExtractPropTypes,
  ExtractPublicPropTypes,
  StyleValue,
  VNode,
  VNodeArrayChildren,
  VNodeChild,
} from 'vue'
import type { AlignItems, ClassValue } from '@element-plus/utils'

export const spaceProps = buildProps({
  /**
   * @description 排列方向
   */
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  /**
   * @description 类名
   */
  class: {
    type: definePropType<ClassValue>([String, Object, Array, Boolean]),
    default: '',
  },
  /**
   * @description 额外样式规则
   */
  style: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: '',
  },
  /**
   * @description 控制子项对齐方式
   */
  alignment: {
    type: definePropType<AlignItems>(String),
    default: 'center',
  },
  /**
   * @description space-items 的前缀
   */
  prefixCls: {
    type: String,
  },
  /**
   * @description 间隔符
   */
  spacer: {
    type: definePropType<VNodeChild>([Object, String, Number, Array]),
    default: null,
    validator: (val: unknown) => isVNode(val) || isNumber(val) || isString(val),
  },
  /**
   * @description 自动换行
   */
  wrap: Boolean,
  /**
   * @description 是否填充容器
   */
  fill: Boolean,
  /**
   * @description 填充比例
   */
  fillRatio: {
    type: Number,
    default: 100,
  },
  /**
   * @description 间距大小
   */
  size: {
    type: [String, Array, Number],
    values: componentSizes,
    validator: (val: unknown): val is [number, number] | number => {
      return (
        isNumber(val) ||
        (isArray(val) && val.length === 2 && val.every(isNumber))
      )
    },
  },
} as const)
export type SpaceProps = ExtractPropTypes<typeof spaceProps>
export type SpacePropsPublic = ExtractPublicPropTypes<typeof spaceProps>

const Space = defineComponent({
  name: 'ElSpace',

  props: spaceProps,

  setup(props, { slots }) {
    const { classes, containerStyle, itemStyle } = useSpace(props)

    // 通过简单的 for 循环取出子节点
    // 这里的边界情况是：当用户使用 <v-for>、<v-if> 这类指令时，
    // 需要不断深入，直到子节点不是 Fragment 类型
    function extractChildren(
      children: VNodeArrayChildren,
      parentKey = '',
      extractedChildren: VNode[] = []
    ) {
      const { prefixCls } = props
      children.forEach((child, loopKey) => {
        if (isFragment(child)) {
          if (isArray(child.children)) {
            child.children.forEach((nested, key) => {
              if (isFragment(nested) && isArray(nested.children)) {
                extractChildren(
                  nested.children,
                  `${parentKey + key}-`,
                  extractedChildren
                )
              } else {
                if (isVNode(nested) && nested?.type === Comment) {
                  extractedChildren.push(nested)
                } else {
                  extractedChildren.push(
                    createVNode(
                      Item,
                      {
                        style: itemStyle.value,
                        prefixCls,
                        key: `nested-${parentKey + key}`,
                      },
                      {
                        default: () => [nested],
                      },
                      PatchFlags.PROPS | PatchFlags.STYLE,
                      ['style', 'prefixCls']
                    )
                  )
                }
              }
            })
          }
          // 如果当前子节点是有效的 vnode，则将该 vnode 追加
          // 到 item 中作为子节点。
        } else if (isValidElementNode(child)) {
          extractedChildren.push(
            createVNode(
              Item,
              {
                style: itemStyle.value,
                prefixCls,
                key: `LoopKey${parentKey + loopKey}`,
              },
              {
                default: () => [child],
              },
              PatchFlags.PROPS | PatchFlags.STYLE,
              ['style', 'prefixCls']
            )
          )
        }
      })

      return extractedChildren
    }

    return () => {
      const { spacer, direction } = props

      const children = renderSlot(slots, 'default', { key: 0 }, () => [])

      if ((children.children ?? []).length === 0) return null
      // 遍历子节点，如果当前子节点是通过 `renderList` 或 `<v-for>` 渲染的
      if (isArray(children.children)) {
        let extractedChildren = extractChildren(children.children)

        if (spacer) {
          // 跟踪当前渲染索引，遇到最后一个元素时
          // 其后无需再添加间隔符。
          const len = extractedChildren.length - 1
          extractedChildren = extractedChildren.reduce<VNode[]>(
            (acc, child, idx) => {
              const children = [...acc, child]
              if (idx !== len) {
                children.push(
                  createVNode(
                    'span',
                    // 添加 100% 宽度以实现垂直对齐，
                    // 当间隔符从
                    // 父级继承宽度时，该 span 未设置宽度，因此间隔
                    // 可能消失
                    {
                      style: [
                        itemStyle.value,
                        direction === 'vertical' ? 'width: 100%' : null,
                      ],
                      key: idx,
                    },
                    [
                      // 如果 spacer 已是有效的 vnode，则将其追加到当前
                      // span 元素中。
                      // 否则，将其作为字符串处理。
                      isVNode(spacer)
                        ? cloneVNode(spacer)
                        : createTextVNode(spacer as string, PatchFlags.TEXT),
                    ],
                    PatchFlags.STYLE
                  )
                )
              }
              return children
            },
            []
          )
        }

        // 间隔符容器。
        return createVNode(
          'div',
          {
            class: classes.value,
            style: containerStyle.value,
          },
          extractedChildren,
          PatchFlags.STYLE | PatchFlags.CLASS
        )
      }

      return children.children
    }
  },
})

export type SpaceInstance = InstanceType<typeof Space> & unknown

export default Space
