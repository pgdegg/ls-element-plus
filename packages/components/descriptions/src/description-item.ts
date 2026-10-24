import { defineComponent } from 'vue'
import { columnAlignment } from '@element-plus/constants'
import { buildProps } from '@element-plus/utils'
import { COMPONENT_NAME } from './constants'

import type { ExtractPropTypes, ExtractPublicPropTypes, Slot, VNode } from 'vue'

export const descriptionItemProps = buildProps({
  /**
   * @description 标签文本
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * @description 列的 colspan
   */
  span: {
    type: Number,
    default: 1,
  },
  /**
   * @description 单元格应跨越的行数
   */
  rowspan: {
    type: Number,
    default: 1,
  },
  /**
   * @description 列宽；不同行中同一列的宽度取最大值（若无 `border`，宽度包含标签和内容）
   */
  width: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 列最小宽度；使用 `width` 的列宽度固定，使用 `min-width` 的列按比例分配宽度（若无 `border`，宽度包含标签和内容）
   */
  minWidth: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 列标签宽度；若未设置，则与列宽相同。优先级高于 `Descriptions` 的 `label-width`
   */
  labelWidth: {
    type: [String, Number],
  },
  /**
   * @description 列内容对齐方式（若无 `border`，对标签和内容均生效）
   */
  align: {
    type: String,
    values: columnAlignment,
    default: 'left',
  },
  /**
   * @description 列标签对齐方式；省略时应用上面 `align` 属性的值（若无 `border`，请使用 `align` 属性）
   */
  labelAlign: {
    type: String,
    values: columnAlignment,
  },
  /**
   * @description 列内容自定义类名
   */
  className: {
    type: String,
    default: '',
  },
  /**
   * @description 列标签自定义类名
   */
  labelClassName: {
    type: String,
    default: '',
  },
})

const DescriptionItem = defineComponent({
  name: COMPONENT_NAME,
  props: descriptionItemProps,
})

export default DescriptionItem

export type DescriptionItemProps = ExtractPropTypes<typeof descriptionItemProps>
export type DescriptionItemPropsPublic = ExtractPublicPropTypes<
  typeof descriptionItemProps
>
export type DescriptionItemVNode = VNode & {
  children: { [name: string]: Slot } | null
  props: Partial<DescriptionItemProps> | null
}
