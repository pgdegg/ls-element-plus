import { withInstall } from '@element-plus/utils'
import Pagination from './src/pagination'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElPagination: SFCWithInstall<typeof Pagination> =
  withInstall(Pagination)
export default ElPagination

export * from './src/pagination'
export * from './src/constants'

export { PaginationJumperDefaultValueProps } from './src/components/jumper'

export { PaginationNextDefaultValueProps } from './src/components/next'

export { PaginationPagerDefaultValueProps } from './src/components/pager'

export { PaginationPrevDefaultValueProps } from './src/components/prev'

export { PaginationSizesDefaultValueProps } from './src/components/sizes'

export { PaginationTotalDefaultValueProps } from './src/components/total'
