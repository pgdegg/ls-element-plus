import {
  computed,
  createVNode,
  defineComponent,
  getCurrentInstance,
  nextTick,
  provide,
  ref,
  renderSlot,
  watch,
} from 'vue'
import { omit } from 'lodash-unified'
import {
  buildProps,
  definePropType,
  getEventCode,
  isNumber,
  isString,
  isUndefined,
} from '@element-plus/utils'
import { EVENT_CODE, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import ElIcon from '@element-plus/components/icon'
import { Plus } from '@element-plus/icons-vue'
import { useNamespace, useOrderedChildren } from '@element-plus/hooks'
import { tabsRootContextKey } from './constants'
import TabNav from './tab-nav'

import type {
  ExtractPropTypes,
  ExtractPublicPropTypes,
  SlotsType,
  VNode,
} from 'vue'
import type { Awaitable } from '@element-plus/utils'
import type { TabNavInstance } from './tab-nav'
import type { TabPaneName, TabsPaneContext } from './constants'

export const tabsProps = buildProps({
  /**
   * @description Tab 的类型
   */
  type: {
    type: String,
    values: ['card', 'border-card', ''],
    default: '',
  },
  /**
   * @description 固定在左侧的 tabs 类型；为空时继承 `type`
   */
  leftType: {
    type: String,
    values: ['card', 'border-card', ''],
    default: '',
  },
  /**
   * @description 固定在右侧的 tabs 类型；为空时继承 `type`
   */
  rightType: {
    type: String,
    values: ['card', 'border-card', ''],
    default: '',
  },
  /**
   * @description Tab 是否可关闭
   */
  closable: Boolean,
  /**
   * @description Tab 是否可添加
   */
  addable: Boolean,
  /**
   * @description 绑定值，即当前选中 tab 的名称
   */
  modelValue: {
    type: [String, Number],
  },
  /**
   * @description 未设置 `model-value` 时的初始值
   */
  defaultValue: {
    type: [String, Number],
  },
  /**
   * @description Tab 是否可添加且可关闭
   */
  editable: Boolean,
  /**
   * @description tabs 的位置
   */
  tabPosition: {
    type: String,
    values: ['top', 'right', 'bottom', 'left'],
    default: 'top',
  },
  /**
   * @description 切换 tab 前的钩子函数。返回 `false`，或返回 `Promise` 且被 reject 时，将阻止切换
   */
  beforeLeave: {
    type: definePropType<
      (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>
    >(Function),
    default: () => true,
  },
  /**
   * @description tab 宽度是否自动适配其容器
   */
  stretch: Boolean,
  /**
   * @description tabs 的 tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0,
  },
} as const)
export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsPropsPublic = ExtractPublicPropTypes<typeof tabsProps>

const isPaneName = (value: unknown): value is string | number =>
  isString(value) || isNumber(value)

export const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (name: TabPaneName) => isPaneName(name),
  tabClick: (pane: TabsPaneContext, ev: Event) => ev instanceof Event,
  tabChange: (name: TabPaneName) => isPaneName(name),
  edit: (paneName: TabPaneName | undefined, action: 'remove' | 'add') =>
    ['remove', 'add'].includes(action),
  tabRemove: (name: TabPaneName) => isPaneName(name),
  tabAdd: () => true,
}
export type TabsEmits = typeof tabsEmits

export type TabsSlots = {
  default?: () => VNode[]
  'add-icon'?: () => VNode[]
  'header-left'?: () => VNode[]
  'fixed-top'?: () => VNode[]
  'fixed-left'?: () => VNode[]
  'fixed-right'?: () => VNode[]
  'fixed-bottom'?: () => VNode[]
}

export type TabsPanes = Record<number, TabsPaneContext>

const Tabs = defineComponent({
  name: 'ElTabs',

  props: tabsProps,
  emits: tabsEmits,
  slots: Object as SlotsType<TabsSlots>,

  setup(props, { emit, slots, expose }) {
    const ns = useNamespace('tabs')

    const isVertical = computed(() =>
      ['left', 'right'].includes(props.tabPosition)
    )

    const {
      children: panes,
      addChild: registerPane,
      removeChild: unregisterPane,
      ChildrenSorter: PanesSorter,
    } = useOrderedChildren<TabsPaneContext>(getCurrentInstance()!, 'ElTabPane')

    const nav$ = ref<TabNavInstance>()
    const currentName = ref<TabPaneName>(
      (isUndefined(props.modelValue) ? props.defaultValue : props.modelValue) ??
        '0'
    )

    const setCurrentName = async (value?: TabPaneName, trigger = false) => {
      // 什么都不做。
      if (currentName.value === value || isUndefined(value)) return

      try {
        let canLeave
        if (props.beforeLeave) {
          const result = props.beforeLeave(value, currentName.value)
          canLeave = result instanceof Promise ? await result : result
        } else {
          canLeave = true
        }

        if (canLeave !== false) {
          const isFocusInsidePane = panes.value
            .find((item) => item.paneName === currentName.value)
            ?.isFocusInsidePane()

          currentName.value = value
          if (trigger) {
            emit(UPDATE_MODEL_EVENT, value)
            emit('tabChange', value)
          }

          nav$.value?.removeFocus?.()
          if (isFocusInsidePane) {
            nav$.value?.focusActiveTab()
          }
        }
      } catch {}
    }

    const handleTabClick = (
      tab: TabsPaneContext,
      tabName: TabPaneName,
      event: Event
    ) => {
      if (tab.props.disabled) return
      emit('tabClick', tab, event)
      setCurrentName(tabName, true)
    }

    const handleTabRemove = (pane: TabsPaneContext, ev: Event) => {
      if (pane.props.disabled || isUndefined(pane.props.name)) return
      ev.stopPropagation()
      emit('edit', pane.props.name, 'remove')
      emit('tabRemove', pane.props.name)
    }

    const handleTabAdd = () => {
      emit('edit', undefined, 'add')
      emit('tabAdd')
    }

    const handleKeydown = (event: KeyboardEvent) => {
      const code = getEventCode(event)
      if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter].includes(code))
        handleTabAdd()
    }

    const swapChildren = (
      vnode: VNode & {
        el: HTMLDivElement
        children: VNode<HTMLDivElement>[]
      }
    ) => {
      const actualFirstChild = vnode.el.firstChild!
      const firstChild = ['bottom', 'right'].includes(props.tabPosition)
        ? vnode.children[0].el!
        : vnode.children[1].el!

      if (actualFirstChild !== firstChild) {
        actualFirstChild.before(firstChild)
      }
    }

    watch(
      () => props.modelValue,
      (modelValue) => setCurrentName(modelValue)
    )

    watch(currentName, async () => {
      await nextTick()
      nav$.value?.scrollToActiveTab()
    })

    provide(tabsRootContextKey, {
      props,
      currentName,
      registerPane,
      unregisterPane,
      nav$,
    })

    expose({
      currentName,
      get tabNavRef() {
        return omit(nav$.value, ['scheduleRender'])
      },
    })

    return () => {
      const addSlot = slots['add-icon']
      const newButton =
        props.editable || props.addable ? (
          <div
            class={[
              ns.e('new-tab'),
              isVertical.value && ns.e('new-tab-vertical'),
            ]}
            tabindex={props.tabindex}
            onClick={handleTabAdd}
            onKeydown={handleKeydown}
          >
            {addSlot ? (
              renderSlot(slots, 'add-icon')
            ) : (
              <ElIcon class={ns.is('icon-plus')}>
                <Plus />
              </ElIcon>
            )}
          </div>
        ) : null

      const tabNav = () => (
        <TabNav
          ref={nav$}
          currentName={currentName.value}
          editable={props.editable}
          type={props.type}
          panes={panes.value}
          stretch={props.stretch}
          onTabClick={handleTabClick}
          onTabRemove={handleTabRemove}
        />
      )

      const header = (
        <div
          class={[
            ns.e('header'),
            isVertical.value && ns.e('header-vertical'),
            ns.is(props.tabPosition),
          ]}
        >
          {slots['header-left'] ? (
            <div class={ns.e('header-left')}>
              {renderSlot(slots, 'header-left')}
            </div>
          ) : null}
          {createVNode(PanesSorter, null, {
            default: tabNav,
            $stable: true,
          })}
          {newButton}
        </div>
      )

      const content = (
        <div class={ns.e('content')}>{renderSlot(slots, 'default')}</div>
      )
      const fixedContentPositions = ['top', 'left', 'right', 'bottom'] as const
      const hasFixedContent = fixedContentPositions.some(
        (position) => slots[`fixed-${position}`]
      )
      const renderFixedContent = (
        position: (typeof fixedContentPositions)[number]
      ) => {
        const slotName = `fixed-${position}` as const
        return slots[slotName] ? (
          <div
            class={[ns.e('fixed-content'), ns.em('fixed-content', position)]}
          >
            {renderSlot(slots, slotName)}
          </div>
        ) : null
      }
      const panels = hasFixedContent ? (
        <div class={ns.e('content-wrap')}>
          {renderFixedContent('top')}
          {renderFixedContent('left')}
          {content}
          {renderFixedContent('right')}
          {renderFixedContent('bottom')}
        </div>
      ) : (
        content
      )

      return (
        <div
          class={[
            ns.b(),
            ns.m(props.tabPosition),
            {
              [ns.m('card')]: props.type === 'card',
              [ns.m('border-card')]: props.type === 'border-card',
            },
          ]}
          // @ts-ignore
          onVnodeMounted={swapChildren}
          onVnodeUpdated={swapChildren}
        >
          {panels}
          {header}
        </div>
      )
    }
  },
})

export type TabsInstance = InstanceType<typeof Tabs> & {
  currentName: TabPaneName
  tabNavRef: TabNavInstance | undefined
}

export default Tabs
