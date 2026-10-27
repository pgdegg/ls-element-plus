import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  provide,
  ref,
  watch,
} from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import {
  buildProps,
  debugWarn,
  definePropType,
  iconPropType,
  isNumber,
  mutable,
} from '@element-plus/utils'
import {
  useGlobalSize,
  useLocale,
  useNamespace,
  useSizeProp,
} from '@element-plus/hooks'
import { CHANGE_EVENT } from '@element-plus/constants'
import { elPaginationKey } from './constants'
import Prev from './components/prev.vue'
import Next from './components/next.vue'
import Sizes from './components/sizes.vue'
import Jumper from './components/jumper.vue'
import Total from './components/total.vue'
import Pager from './components/pager.vue'

import type { ClassValue } from '@element-plus/utils'
import type {
  ExtractPropTypes,
  ExtractPublicPropTypes,
  StyleValue,
  VNode,
} from 'vue'
/**
 * 需要由用户保证 props.total... 的值为数字
 * （与 pageSize、defaultPageSize、currentPage、defaultCurrentPage、pageCount 相同）
 * 否则我们可以合理推断对应字段缺失
 */
const isAbsent = (v: unknown): v is undefined => typeof v !== 'number'

type LayoutKey =
  'prev' | 'pager' | 'next' | 'jumper' | '->' | 'total' | 'sizes' | 'slot'

export const paginationProps = buildProps({
  /**
   * @description 每页条数的选项
   */
  pageSize: Number,
  /**
   * @description 每页条数的默认初始值，不设置等同于设置为 10
   */
  defaultPageSize: Number,
  /**
   * @description 总条目数
   */
  total: Number,
  /**
   * @description 总页数。设置 `total` 或 `page-count` 其一即可显示分页；如果需要 `page-sizes`，则必须提供 `total`
   */
  pageCount: Number,
  /**
   * @description 页码按钮数量。当总页数超过该值时分页会折叠
   */
  pagerCount: {
    type: Number,
    validator: (value: unknown) => {
      return (
        isNumber(value) &&
        Math.trunc(value) === value &&
        value > 4 &&
        value < 22 &&
        value % 2 === 1
      )
    },
    default: 7,
  },
  /**
   * @description 当前页码
   */
  currentPage: Number,
  /**
   * @description current-page 的默认初始值，不设置等同于设置为 1
   */
  defaultCurrentPage: Number,
  /**
   * @description Pagination 的布局，各元素以逗号分隔
   */
  layout: {
    type: String,
    default: (
      ['prev', 'pager', 'next', 'jumper', '->', 'total'] as LayoutKey[]
    ).join(', '),
  },
  /**
   * @description 每页条目数
   */
  pageSizes: {
    type: definePropType<number[]>(Array),
    default: () => mutable([10, 20, 30, 40, 50, 100] as const),
  },
  /**
   * @description 每页条数 Select 下拉框的自定义类名
   */
  popperClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: '',
  },
  /**
   * @description 每页条数 Select 下拉框的自定义样式
   */
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 上一页按钮的文字
   */
  prevText: {
    type: String,
    default: '',
  },
  /**
   * @description 上一页按钮的图标，优先级高于 `prev-text`
   */
  prevIcon: {
    type: iconPropType,
    default: () => ArrowLeft,
  },
  /**
   * @description 下一页按钮的文字
   */
  nextText: {
    type: String,
    default: '',
  },
  /**
   * @description 下一页按钮的图标，优先级高于 `next-text`
   */
  nextIcon: {
    type: iconPropType,
    default: () => ArrowRight,
  },
  /**
   * @description Pagination 是否被 teleport 到 body
   */
  teleported: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 设置分页尺寸
   */
  size: useSizeProp,
  /**
   * @description 按钮是否带有背景色
   */
  background: Boolean,
  /**
   * @description Pagination 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 只有一页时是否隐藏
   */
  hideOnSinglePage: Boolean,
  /**
   * @description 尺寸下拉框挂载到哪个元素。
   */
  appendSizeTo: String,
} as const)
export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationPropsPublic = ExtractPublicPropTypes<
  typeof paginationProps
>

export const paginationEmits = {
  'update:current-page': (val: number) => isNumber(val),
  'update:page-size': (val: number) => isNumber(val),
  'size-change': (val: number) => isNumber(val),
  change: (currentPage: number, pageSize: number) =>
    isNumber(currentPage) && isNumber(pageSize),
  'current-change': (val: number) => isNumber(val),
  'prev-click': (val: number) => isNumber(val),
  'next-click': (val: number) => isNumber(val),
}
export type PaginationEmits = typeof paginationEmits & {
  sizeChange: (typeof paginationEmits)['size-change']
  currentChange: (typeof paginationEmits)['current-change']
  prevClick: (typeof paginationEmits)['prev-click']
  nextClick: (typeof paginationEmits)['next-click']
}

const componentName = 'ElPagination'
export default defineComponent({
  name: componentName,

  props: paginationProps,
  emits: paginationEmits,

  setup(props, { emit, slots }) {
    const { t } = useLocale()
    const ns = useNamespace('pagination')
    const vnodeProps = getCurrentInstance()!.vnode.props || {}
    const _globalSize = useGlobalSize()
    const _size = computed(() => props.size ?? _globalSize.value)
    // 我们可以在 `vnodeProps` 上找到 @xxx="xxx" 形式的 props，以检查用户是否绑定了对应的事件
    const hasCurrentPageListener =
      'onUpdate:currentPage' in vnodeProps ||
      'onUpdate:current-page' in vnodeProps ||
      'onCurrentChange' in vnodeProps
    const hasPageSizeListener =
      'onUpdate:pageSize' in vnodeProps ||
      'onUpdate:page-size' in vnodeProps ||
      'onSizeChange' in vnodeProps
    const assertValidUsage = computed(() => {
      // 用户必须设置二者之一，否则无法确定页数
      if (isAbsent(props.total) && isAbsent(props.pageCount)) return false
      // 现在禁止使用没有对应监听器的 <el-pagination ...otherProps :current-page="xxx" />
      // 用户必须使用 `currentPage` 的双向绑定
      // 如果用户只想提供默认值，可以使用 `defaultCurrentPage`
      if (!isAbsent(props.currentPage) && !hasCurrentPageListener) return false
      // 当需要改变每页条数时，情况会更复杂，详见下文
      // 基本上我们最需要的关键值是页数
      // 要么直接取自 props.pageCount
      // 要么由 props.total 计算得出
      // 我们优先使用 props.pageCount，而非 props.total
      if (props.layout.includes('sizes')) {
        if (!isAbsent(props.pageCount)) {
          // 如果 props.pageCount 由用户赋值，那么用户必须 watch pageSize 的变化
          // 并重新计算 pageCount
          if (!hasPageSizeListener) return false
        } else if (!isAbsent(props.total)) {
          // 否则，我们检查用户是否定义了 props.pageSize
          // 如果是，意味着用户希望在组件外部自行控制 pageSize
          // 因此需要提供 page size 监听器
          // 由用户负责处理 page size 的变化
          if (!isAbsent(props.pageSize)) {
            if (!hasPageSizeListener) {
              return false
            }
          } else {
            // （else 块仅用于说明）
            // 否则 page size 由 el-pagination 内部控制
          }
        }
      }
      return true
    })

    const innerPageSize = ref(
      isAbsent(props.defaultPageSize) ? 10 : props.defaultPageSize
    )
    const innerCurrentPage = ref(
      isAbsent(props.defaultCurrentPage) ? 1 : props.defaultCurrentPage
    )

    const pageSizeBridge = computed({
      get() {
        return isAbsent(props.pageSize) ? innerPageSize.value : props.pageSize
      },
      set(v: number) {
        if (isAbsent(props.pageSize)) {
          innerPageSize.value = v
        }
        if (hasPageSizeListener) {
          emit('update:page-size', v)
          emit('size-change', v)
        }
      },
    })

    const pageCountBridge = computed<number>(() => {
      let pageCount = 0
      if (!isAbsent(props.pageCount)) {
        pageCount = props.pageCount
      } else if (!isAbsent(props.total)) {
        pageCount = Math.max(1, Math.ceil(props.total / pageSizeBridge.value))
      }
      return pageCount
    })

    const currentPageBridge = computed<number>({
      get() {
        return isAbsent(props.currentPage)
          ? innerCurrentPage.value
          : props.currentPage
      },
      set(v) {
        let newCurrentPage = v
        if (v < 1) {
          newCurrentPage = 1
        } else if (v > pageCountBridge.value) {
          newCurrentPage = pageCountBridge.value
        }
        if (isAbsent(props.currentPage)) {
          innerCurrentPage.value = newCurrentPage
        }
        if (hasCurrentPageListener) {
          emit('update:current-page', newCurrentPage)
          emit('current-change', newCurrentPage)
        }
      },
    })

    watch(pageCountBridge, (val) => {
      if (currentPageBridge.value > val) currentPageBridge.value = val
    })

    watch(
      [currentPageBridge, pageSizeBridge],
      (value) => {
        emit(CHANGE_EVENT, ...value)
      },
      { flush: 'post' }
    )

    function handleCurrentChange(val: number) {
      currentPageBridge.value = val
    }

    function handleSizeChange(val: number) {
      pageSizeBridge.value = val
      const newPageCount = pageCountBridge.value
      if (currentPageBridge.value > newPageCount) {
        currentPageBridge.value = newPageCount
      }
    }

    function prev() {
      if (props.disabled) return
      currentPageBridge.value -= 1
      emit('prev-click', currentPageBridge.value)
    }

    function next() {
      if (props.disabled) return
      currentPageBridge.value += 1
      emit('next-click', currentPageBridge.value)
    }

    function addClass(element: any, cls: string) {
      if (element) {
        if (!element.props) {
          element.props = {}
        }
        element.props.class = [element.props.class, cls].join(' ')
      }
    }

    provide(elPaginationKey, {
      pageCount: pageCountBridge,
      disabled: computed(() => props.disabled),
      currentPage: currentPageBridge,
      changeEvent: handleCurrentChange,
      handleSizeChange,
    })

    return () => {
      if (!assertValidUsage.value) {
        debugWarn(componentName, t('el.pagination.deprecationWarning'))
        return null
      }
      if (!props.layout) return null
      if (props.hideOnSinglePage && pageCountBridge.value <= 1) return null
      const rootChildren: Array<VNode | VNode[] | null> = []
      const rightWrapperChildren: Array<VNode | VNode[] | null> = []
      const rightWrapperRoot = h(
        'div',
        { class: ns.e('rightwrapper') },
        rightWrapperChildren
      )
      const TEMPLATE_MAP: Record<
        Exclude<LayoutKey, '->'>,
        VNode | VNode[] | null
      > = {
        prev: h(Prev, {
          disabled: props.disabled,
          currentPage: currentPageBridge.value,
          prevText: props.prevText,
          prevIcon: props.prevIcon,
          onClick: prev,
        }),
        jumper: h(Jumper, {
          size: _size.value,
        }),
        pager: h(Pager, {
          currentPage: currentPageBridge.value,
          pageCount: pageCountBridge.value,
          pagerCount: props.pagerCount,
          onChange: handleCurrentChange,
          disabled: props.disabled,
        }),
        next: h(Next, {
          disabled: props.disabled,
          currentPage: currentPageBridge.value,
          pageCount: pageCountBridge.value,
          nextText: props.nextText,
          nextIcon: props.nextIcon,
          onClick: next,
        }),
        sizes: h(Sizes, {
          pageSize: pageSizeBridge.value,
          pageSizes: props.pageSizes,
          popperClass: props.popperClass,
          popperStyle: props.popperStyle,
          disabled: props.disabled,
          teleported: props.teleported,
          size: _size.value,
          appendSizeTo: props.appendSizeTo,
        }),
        slot: slots?.default?.() ?? null,
        total: h(Total, { total: isAbsent(props.total) ? 0 : props.total }),
      }

      const components = props.layout
        .split(',')
        .map((item: string) => item.trim()) as LayoutKey[]

      let haveRightWrapper = false

      components.forEach((c) => {
        if (c === '->') {
          haveRightWrapper = true
          return
        }
        if (!haveRightWrapper) {
          rootChildren.push(TEMPLATE_MAP[c])
        } else {
          rightWrapperChildren.push(TEMPLATE_MAP[c])
        }
      })

      addClass(rootChildren[0], ns.is('first'))
      addClass(rootChildren[rootChildren.length - 1], ns.is('last'))

      if (haveRightWrapper && rightWrapperChildren.length > 0) {
        addClass(rightWrapperChildren[0], ns.is('first'))
        addClass(
          rightWrapperChildren[rightWrapperChildren.length - 1],
          ns.is('last')
        )
        rootChildren.push(rightWrapperRoot)
      }
      return h(
        'div',
        {
          class: [
            ns.b(),
            ns.is('background', props.background),
            ns.m(_size.value),
          ],
        },
        rootChildren
      )
    }
  },
})
