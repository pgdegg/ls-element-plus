<template>
  <div
    ref="tableWrapper"
    :class="[
      {
        [ns.m('fit')]: fit,
        [ns.m('striped')]: stripe,
        [ns.m('border')]: border || isGroup,
        [ns.m('hidden')]: isHidden,
        [ns.m('group')]: isGroup,
        [ns.m('fluid-height')]: maxHeight,
        [ns.m('scrollable-x')]: layout.scrollX.value,
        [ns.m('scrollable-y')]: layout.scrollY.value,
        [ns.m('enable-row-hover')]: !store.states.isComplex.value,
        [ns.m('enable-row-transition')]:
          (store.states.data.value || []).length !== 0 &&
          (store.states.data.value || []).length < 100,
        'has-footer': showSummary,
      },
      ns.m(tableSize),
      className,
      ns.b(),
      ns.m(`layout-${tableLayout}`),
    ]"
    :style="style"
    :data-prefix="ns.namespace.value"
    @mouseleave="handleMouseLeave"
  >
    <div ref="tableInnerWrapper" :class="ns.e('inner-wrapper')">
      <div ref="hiddenColumns" class="hidden-columns">
        <slot />
      </div>
      <div
        v-if="showHeader && tableLayout === 'fixed'"
        ref="headerWrapper"
        v-mousewheel="handleHeaderFooterMousewheel"
        :class="ns.e('header-wrapper')"
      >
        <table
          ref="tableHeader"
          :class="ns.e('header')"
          :style="tableBodyStyles"
          border="0"
          cellpadding="0"
          cellspacing="0"
        >
          <hColgroup
            :columns="store.states.columns.value"
            :table-layout="tableLayout"
          />
          <table-header
            ref="tableHeaderRef"
            :border="border"
            :default-sort="defaultSort"
            :store="store"
            :append-filter-panel-to="appendFilterPanelTo"
            :allow-drag-last-column="allowDragLastColumn"
            @set-drag-visible="setDragVisible"
          />
        </table>
      </div>
      <div ref="bodyWrapper" :class="ns.e('body-wrapper')">
        <el-scrollbar
          ref="scrollBarRef"
          :view-style="scrollbarViewStyle"
          :wrap-style="scrollbarStyle"
          :always="scrollbarAlwaysOn"
          :tabindex="scrollbarTabindex"
          :native="nativeScrollbar"
          @scroll="$emit('scroll', $event)"
        >
          <table
            ref="tableBody"
            :class="ns.e('body')"
            cellspacing="0"
            cellpadding="0"
            border="0"
            :style="{
              width: bodyWidth,
              tableLayout,
            }"
          >
            <hColgroup
              :columns="store.states.columns.value"
              :table-layout="tableLayout"
            />
            <table-header
              v-if="showHeader && tableLayout === 'auto'"
              ref="tableHeaderRef"
              :class="ns.e('body-header')"
              :border="border"
              :default-sort="defaultSort"
              :store="store"
              :append-filter-panel-to="appendFilterPanelTo"
              @set-drag-visible="setDragVisible"
            />
            <table-body
              :context="context"
              :highlight="highlightCurrentRow"
              :row-class-name="rowClassName"
              :tooltip-effect="computedTooltipEffect"
              :tooltip-options="computedTooltipOptions"
              :row-style="rowStyle"
              :store="store"
              :stripe="stripe"
            />
            <table-footer
              v-if="showSummary && tableLayout === 'auto'"
              :class="ns.e('body-footer')"
              :border="border"
              :default-sort="defaultSort"
              :store="store"
              :sum-text="computedSumText"
              :summary-method="summaryMethod"
            />
          </table>
          <div
            v-if="isEmpty"
            ref="emptyBlock"
            :style="emptyBlockStyle"
            :class="ns.e('empty-block')"
          >
            <span :class="ns.e('empty-text')">
              <slot name="empty">{{ computedEmptyText }}</slot>
            </span>
          </div>
          <div
            v-if="$slots.append"
            ref="appendWrapper"
            :class="ns.e('append-wrapper')"
          >
            <slot name="append" />
          </div>
        </el-scrollbar>
      </div>
      <div
        v-if="showSummary && tableLayout === 'fixed'"
        v-show="!isEmpty"
        ref="footerWrapper"
        v-mousewheel="handleHeaderFooterMousewheel"
        :class="ns.e('footer-wrapper')"
      >
        <table
          :class="ns.e('footer')"
          cellspacing="0"
          cellpadding="0"
          border="0"
          :style="tableBodyStyles"
        >
          <hColgroup
            :columns="store.states.columns.value"
            :table-layout="tableLayout"
          />
          <table-footer
            :border="border"
            :default-sort="defaultSort"
            :store="store"
            :sum-text="computedSumText"
            :summary-method="summaryMethod"
          />
        </table>
      </div>
      <div v-if="border || isGroup" :class="ns.e('border-left-patch')" />
    </div>
    <div
      v-show="resizeProxyVisible"
      ref="resizeProxy"
      :class="ns.e('column-resize-proxy')"
    />
  </div>
</template>

<script lang="ts" setup generic="T extends DefaultRow = DefaultRow">
import { computed, getCurrentInstance, onBeforeUnmount, provide } from 'vue'
import { debounce } from 'lodash-unified'
import { Mousewheel as vMousewheel } from '@element-plus/directives'
import { useLocale, useNamespace } from '@element-plus/hooks'
import { useGlobalConfig } from '@element-plus/components/config-provider'
import ElScrollbar from '@element-plus/components/scrollbar'
import { createStore } from './store/helper'
import TableLayout from './table-layout'
import TableHeader from './table-header'
import TableBody from './table-body'
import TableFooter from './table-footer'
import { createTableId } from './util'
import useUtils from './table/utils-helper'
import { convertToRows } from './table-header/utils-helper'
import useStyle from './table/style-helper'
import useKeyRender from './table/key-render-helper'
import { TABLE_INJECTION_KEY } from './tokens'
import { hColgroup } from './h-helper'
import { useScrollbar } from './composables/use-scrollbar'

import type {
  DefaultRow,
  Table,
  TableEmits,
  TableProps,
} from './table/defaults'

defineOptions({
  name: 'ElTable',
})

const props = withDefaults(defineProps<TableProps<T>>(), {
  data: () => [],
  fit: true,
  showHeader: true,
  selectOnIndeterminate: true,
  indent: 16,
  treeProps: () => ({
    hasChildren: 'hasChildren',
    children: 'children',
    checkStrictly: false,
  }),
  style: () => ({}),
  className: '',
  tableLayout: 'fixed',
  showOverflowTooltip: undefined,
  scrollbarTabindex: undefined,
  allowDragLastColumn: true,
})

defineEmits<TableEmits<T>>()

const { t } = useLocale()
const ns = useNamespace('table')
const globalConfig = useGlobalConfig('table')
const table = getCurrentInstance() as Table<T>
provide(TABLE_INJECTION_KEY, table)
const store = createStore<T>(table, props)
table.store = store
const layout = new TableLayout<T>({
  store: table.store,
  table,
  fit: props.fit,
  showHeader: props.showHeader,
})
table.layout = layout

const isEmpty = computed(() => (store.states.data.value || []).length === 0)

/**
 * 对外暴露的方法
 */
const {
  setCurrentRow,
  getSelectionRows,
  getHalfSelectionRows,
  toggleRowSelection,
  clearSelection,
  clearFilter,
  toggleAllSelection,
  toggleRowExpansion,
  clearSort,
  sort,
  updateKeyChildren,
} = useUtils<T>(store)
const {
  isHidden,
  renderExpanded,
  setDragVisible,
  isGroup,
  handleMouseLeave,
  handleHeaderFooterMousewheel,
  tableSize,
  emptyBlockStyle,
  resizeProxyVisible,
  bodyWidth,
  resizeState,
  doLayout,
  tableBodyStyles,
  tableLayout,
  scrollbarViewStyle,
  scrollbarStyle,
} = useStyle<T>(props, layout, store, table)

const { scrollBarRef, scrollTo, setScrollLeft, setScrollTop } = useScrollbar()

const debouncedUpdateLayout = debounce(doLayout, 50)

const tableId = createTableId(ns.namespace.value)
const context = table
table.tableId = tableId
table.state = {
  isGroup,
  resizeState,
  doLayout,
  debouncedUpdateLayout,
}
const computedSumText = computed(() => props.sumText ?? t('el.table.sumText'))

const computedEmptyText = computed(() => {
  return props.emptyText ?? t('el.table.emptyText')
})

const computedTooltipEffect = computed(
  () => props.tooltipEffect ?? globalConfig.value?.tooltipEffect
)

const computedTooltipOptions = computed(
  () => props.tooltipOptions ?? globalConfig.value?.tooltipOptions
)

const columns = computed(() => {
  return convertToRows(store.states.originColumns.value)[0]
})

useKeyRender(table)

onBeforeUnmount(() => {
  debouncedUpdateLayout.cancel()
})

defineExpose({
  ns,
  layout,
  store,
  columns,
  handleHeaderFooterMousewheel,
  handleMouseLeave,
  tableId,
  tableSize,
  isHidden,
  isEmpty,
  renderExpanded,
  resizeProxyVisible,
  resizeState,
  isGroup,
  bodyWidth,
  tableBodyStyles,
  emptyBlockStyle,
  debouncedUpdateLayout,
  /**
   * @description 用于单选 Table，选中指定的某一行。不带参数调用时将清除选中
   */
  setCurrentRow,
  /**
   * @description 返回当前选中的行
   */
  getSelectionRows,
  /**
   * @description 返回当前半选的行
   */
  getHalfSelectionRows,
  /**
   * @description 用于多选 Table，切换某一行的选中状态。通过第二个参数可以直接设置该行是否被选中
   */
  toggleRowSelection,
  /**
   * @description 用于多选 Table，清除用户的选中
   */
  clearSelection,
  /**
   * @description 清除传入 `columnKey` 的列的过滤。若无参数，则清除所有过滤
   */
  clearFilter,
  /**
   * @description 用于多选 Table，切换全选与取消全选
   */
  toggleAllSelection,
  /**
   * @description 用于可展开 Table 或树形 Table，切换某一行的展开状态。通过第二个参数可以直接设置该行是展开还是折叠
   */
  toggleRowExpansion,
  /**
   * @description 清除排序，将数据恢复为原始顺序
   */
  clearSort,
  /**
   * @description 刷新 Table 的布局。当 Table 的可见性发生变化时，可能需要调用此方法以获得正确布局
   */
  doLayout,
  /**
   * @description 手动对 Table 排序。`prop` 属性用于设置排序列，`order` 属性用于设置排序方向
   */
  sort,
  /**
   * @description 用于懒加载 Table，必须设置 `rowKey`，更新 key 对应的子项
   */
  updateKeyChildren,
  t,
  setDragVisible,
  context,
  computedSumText,
  computedEmptyText,
  computedTooltipEffect,
  computedTooltipOptions,
  tableLayout,
  scrollbarViewStyle,
  scrollbarStyle,
  scrollBarRef,
  /**
   * @description 滚动到指定的坐标位置
   */
  scrollTo,
  /**
   * @description 设置水平滚动位置
   */
  setScrollLeft,
  /**
   * @description 设置垂直滚动位置
   */
  setScrollTop,
  /**
   * @description 是否允许拖动最后一列
   */
  allowDragLastColumn: props.allowDragLastColumn,
})
</script>
