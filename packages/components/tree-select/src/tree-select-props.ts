import { SelectDefaultValueProps } from '@element-plus/components/select'
import { TreeDefaultValueProps } from '@element-plus/components/tree'
import { definePropType } from '@element-plus/utils'

export const TreeSelectDefaultValueProps = {
  ...SelectDefaultValueProps,
  ...TreeDefaultValueProps,
  filterMethod: {
    type: definePropType<(query: string) => void>(Function),
  },
  /**
   * @description 懒加载节点的缓存数据，结构与 data 相同，用于获取未加载数据的标签
   */
  cacheData: {
    type: Array,
    default: () => [],
  },
} as const
