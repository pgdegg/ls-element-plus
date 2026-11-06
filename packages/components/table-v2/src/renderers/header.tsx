import { HeaderRow } from '../components'
import { tryCall } from '../utils'

import type { FunctionalComponent, PropType } from 'vue'
import type { UseNamespaceReturn } from '@element-plus/hooks'
import type { TableV2HeaderRendererParams } from '../components'
import type { TableV2Props } from '../table'

type HeaderRendererProps = TableV2HeaderRendererParams &
  Pick<TableV2Props, 'headerClass' | 'headerProps'> & {
    ns: UseNamespaceReturn
  }

export const TableV2HeaderRendererDefaultValueProps = {
  class: {
    type: String as PropType<HeaderRendererProps['class']>,
    required: true,
  },
  columns: {
    type: Array as PropType<HeaderRendererProps['columns']>,
    required: true,
  },
  columnsStyles: {
    type: Object as PropType<HeaderRendererProps['columnsStyles']>,
    required: true,
  },
  headerIndex: {
    type: Number as PropType<HeaderRendererProps['headerIndex']>,
    required: true,
  },
  style: {
    type: [String, Array, Object, Boolean] as PropType<
      HeaderRendererProps['style']
    >,
    required: true,
  },
  headerClass: {
    type: [String, Function] as PropType<HeaderRendererProps['headerClass']>,
  },
  headerProps: {
    type: null as unknown as PropType<HeaderRendererProps['headerProps']>,
  },
  ns: { type: Object as PropType<HeaderRendererProps['ns']>, required: true },
} as const

const HeaderRenderer: FunctionalComponent<HeaderRendererProps> = (
  {
    columns,
    columnsStyles,
    headerIndex,
    style,
    // derived from root
    headerClass,
    headerProps,

    ns,
  },
  { slots }
) => {
  const param = { columns, headerIndex }

  const kls = [
    ns.e('header-row'),
    tryCall(headerClass, param, ''),
    ns.is('customized', Boolean(slots.header)),
  ]

  const extraProps = {
    ...tryCall(headerProps, param),
    columnsStyles,
    class: kls,
    columns,
    headerIndex,
    style,
  }

  return <HeaderRow {...extraProps}>{slots}</HeaderRow>
}

HeaderRenderer.props = TableV2HeaderRendererDefaultValueProps

export default HeaderRenderer
