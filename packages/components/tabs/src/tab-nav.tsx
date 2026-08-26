import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  onUpdated,
  ref,
  shallowRef,
  triggerRef,
  watch,
} from 'vue'
import {
  useDocumentVisibility,
  useResizeObserver,
  useWindowFocus,
} from '@vueuse/core'
import {
  buildProps,
  definePropType,
  getEventCode,
  isGreaterThan,
  mutable,
  rAF,
  throwError,
} from '@element-plus/utils'
import { EVENT_CODE } from '@element-plus/constants'
import { ElIcon } from '@element-plus/components/icon'
import { ArrowLeft, ArrowRight, Close } from '@element-plus/icons-vue'
import { useNamespace } from '@element-plus/hooks'
import useWheel from '@element-plus/components/virtual-list/src/hooks/use-wheel'
import { clamp } from 'lodash-unified'
import TabBar from './tab-bar.vue'
import { tabsRootContextKey } from './constants'
import { useTabNavTouch } from './composables/use-tab-nav-touch'

import type {
  CSSProperties,
  ComponentPublicInstance,
  ExtractPropTypes,
  ExtractPublicPropTypes,
} from 'vue'
import type { TabBarInstance } from './tab-bar'
import type { TabPaneName, TabsPaneContext } from './constants'
import type { Scrollable } from './composables/use-tab-nav-touch'

export const tabNavProps = buildProps({
  panes: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const),
  },
  currentName: {
    type: [String, Number],
    default: '',
  },
  editable: Boolean,
  type: {
    type: String,
    values: ['card', 'border-card', ''],
    default: '',
  },
  stretch: Boolean,
  /**
   * @description tab-nav tabindex
   */
  tabindex: {
    type: [String, Number],
    default: undefined,
  },
} as const)

export const tabNavEmits = {
  tabClick: (tab: TabsPaneContext, tabName: TabPaneName, ev: Event) =>
    ev instanceof Event,
  tabRemove: (tab: TabsPaneContext, ev: Event) => ev instanceof Event,
}

export type TabNavProps = ExtractPropTypes<typeof tabNavProps>
export type TabNavPropsPublic = ExtractPublicPropTypes<typeof tabNavProps>
export type TabNavEmits = typeof tabNavEmits

const COMPONENT_NAME = 'ElTabNav'
const TabNav = defineComponent({
  name: COMPONENT_NAME,
  props: tabNavProps,
  emits: tabNavEmits,
  setup(props, { expose, emit }) {
    const rootTabs = inject(tabsRootContextKey)
    if (!rootTabs) throwError(COMPONENT_NAME, `<el-tabs><tab-nav /></el-tabs>`)

    const ns = useNamespace('tabs')
    const visibility = useDocumentVisibility()
    const focused = useWindowFocus()

    const navScroll$ = ref<HTMLDivElement>()
    const nav$ = ref<HTMLDivElement>()
    const el$ = ref<HTMLDivElement>()
    const tabRefsMap = ref<{ [key: TabPaneName]: HTMLDivElement }>({})

    const tabBarRef = ref<TabBarInstance>()

    const scrollable = ref<false | Scrollable>(false)
    const navOffset = ref(0)
    const maxOffset = ref(0)
    const isFocus = ref(false)
    const focusable = ref(true)
    const isWheelScrolling = ref(false)
    const tracker = shallowRef()

    const isHorizontal = computed(() =>
      ['top', 'bottom'].includes(rootTabs.props.tabPosition)
    )

    const sizeName = computed(() => (isHorizontal.value ? 'width' : 'height'))
    const navStyle = computed<CSSProperties>(() => {
      const dir = sizeName.value === 'width' ? 'X' : 'Y'
      return {
        transition:
          isWheelScrolling.value || isTouchScrolling.value ? 'none' : undefined,
        transform: `translate${dir}(-${navOffset.value}px)`,
      }
    })

    const getMaxOffset = () => {
      if (!nav$.value || !navScroll$.value) return 0

      const navSize = nav$.value.getBoundingClientRect()[sizeName.value]
      const containerSize =
        navScroll$.value.getBoundingClientRect()[sizeName.value]
      return Math.max(navSize - containerSize, 0)
    }

    const { onWheel } = useWheel(
      {
        atStartEdge: computed(() => navOffset.value <= 0),
        atEndEdge: computed(() => navOffset.value >= maxOffset.value),
        layout: computed(() =>
          isHorizontal.value ? 'horizontal' : 'vertical'
        ),
      },
      (offset) => {
        maxOffset.value = getMaxOffset()
        navOffset.value = clamp(navOffset.value + offset, 0, maxOffset.value)
      }
    )

    const handleWheel = (event: WheelEvent) => {
      maxOffset.value = getMaxOffset()
      navOffset.value = clamp(navOffset.value, 0, maxOffset.value)
      isWheelScrolling.value = true
      onWheel(event)
      rAF(() => {
        isWheelScrolling.value = false
      })
    }

    const {
      isTouchScrolling,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    } = useTabNavTouch({
      scrollable,
      navOffset,
      maxOffset,
      isHorizontal,
    })

    const scrollPrev = () => {
      if (!navScroll$.value) return

      const containerSize =
        navScroll$.value.getBoundingClientRect()[sizeName.value]
      const currentOffset = navOffset.value

      if (!currentOffset) return

      maxOffset.value = getMaxOffset()
      navOffset.value = clamp(currentOffset - containerSize, 0, maxOffset.value)
    }

    const scrollNext = () => {
      if (!navScroll$.value || !nav$.value) return

      const containerSize =
        navScroll$.value.getBoundingClientRect()[sizeName.value]
      const currentOffset = navOffset.value
      maxOffset.value = getMaxOffset()

      if (!isGreaterThan(maxOffset.value, currentOffset)) return

      navOffset.value = clamp(currentOffset + containerSize, 0, maxOffset.value)
    }

    const scrollToActiveTab = async () => {
      const nav = nav$.value
      if (!scrollable.value || !el$.value || !navScroll$.value || !nav) return

      await nextTick()

      const activePane = props.panes.find((pane) => pane.active)
      if (activePane?.props.fixed) return

      const activeTab = tabRefsMap.value[props.currentName]
      if (!activeTab) return

      const navScroll = navScroll$.value

      const activeTabBounding = activeTab.getBoundingClientRect()
      const navScrollBounding = navScroll.getBoundingClientRect()
      // nav has a 1px border width
      const navScrollLeft = navScrollBounding.left + 1
      const navScrollRight = navScrollBounding.right - 1
      const navBounding = nav.getBoundingClientRect()
      maxOffset.value = Math.max(
        isHorizontal.value
          ? navBounding.width - navScrollBounding.width
          : navBounding.height - navScrollBounding.height,
        0
      )
      const currentOffset = navOffset.value
      let newOffset = currentOffset

      if (isHorizontal.value) {
        if (activeTabBounding.left < navScrollLeft) {
          newOffset = currentOffset - (navScrollLeft - activeTabBounding.left)
        }
        if (activeTabBounding.right > navScrollRight) {
          newOffset = currentOffset + activeTabBounding.right - navScrollRight
        }
      } else {
        if (activeTabBounding.top < navScrollBounding.top) {
          newOffset =
            currentOffset - (navScrollBounding.top - activeTabBounding.top)
        }
        if (activeTabBounding.bottom > navScrollBounding.bottom) {
          newOffset =
            currentOffset +
            (activeTabBounding.bottom - navScrollBounding.bottom)
        }
      }
      navOffset.value = clamp(newOffset, 0, maxOffset.value)
    }

    const update = () => {
      if (!nav$.value || !navScroll$.value) return

      props.stretch && tabBarRef.value?.update()

      const navSize = nav$.value.getBoundingClientRect()[sizeName.value]
      const containerSize =
        navScroll$.value.getBoundingClientRect()[sizeName.value]
      const fixedSize = Array.from(
        el$.value?.querySelectorAll<HTMLElement>(`.${ns.e('nav-fixed')}`) ?? []
      ).reduce(
        (size, element) =>
          size + element.getBoundingClientRect()[sizeName.value],
        0
      )
      const availableContainerSize =
        (el$.value?.getBoundingClientRect()[sizeName.value] ?? containerSize) -
        fixedSize
      const currentOffset = navOffset.value

      if (isGreaterThan(navSize, availableContainerSize)) {
        maxOffset.value = Math.max(navSize - containerSize, 0)
        const nextOffset = clamp(currentOffset, 0, maxOffset.value)
        navOffset.value = nextOffset
        scrollable.value = scrollable.value || {}
        scrollable.value.prev = nextOffset
        scrollable.value.next = isGreaterThan(maxOffset.value, nextOffset)
      } else {
        maxOffset.value = 0
        scrollable.value = false
        if (currentOffset !== 0) {
          navOffset.value = 0
        }
      }
    }

    const changeTab = (event: KeyboardEvent) => {
      const code = getEventCode(event)
      let step = 0

      switch (code) {
        case EVENT_CODE.left:
        case EVENT_CODE.up:
          step = -1
          break
        case EVENT_CODE.right:
        case EVENT_CODE.down:
          step = 1
          break
        default:
          return
      }

      const tabList = Array.from(
        el$.value?.querySelectorAll<HTMLDivElement>(
          '[role=tab]:not(.is-disabled)'
        ) ?? []
      )
      const currentIndex = tabList.indexOf(event.target as HTMLDivElement)
      let nextIndex = currentIndex + step

      if (nextIndex < 0) {
        nextIndex = tabList.length - 1
      } else if (nextIndex >= tabList.length) {
        nextIndex = 0
      }

      tabList[nextIndex].focus({ preventScroll: true }) // 改变焦点元素
      tabList[nextIndex].click() // 选中下一个tab
      setFocus()
    }

    const setFocus = () => {
      if (focusable.value) isFocus.value = true
    }
    const removeFocus = () => (isFocus.value = false)

    const setRefs = (
      el: Element | ComponentPublicInstance | null,
      key: TabPaneName
    ) => {
      tabRefsMap.value[key] = el as HTMLDivElement
    }

    const focusActiveTab = async () => {
      await nextTick()

      const activeTab = tabRefsMap.value[props.currentName]
      activeTab?.focus({ preventScroll: true })
    }

    watch(visibility, (visibility) => {
      if (visibility === 'hidden') {
        focusable.value = false
      } else if (visibility === 'visible') {
        setTimeout(() => (focusable.value = true), 50)
      }
    })
    watch(focused, (focused) => {
      if (focused) {
        setTimeout(() => (focusable.value = true), 50)
      } else {
        focusable.value = false
      }
    })

    useResizeObserver(el$, () => {
      rAF(update)
    })
    useResizeObserver(navScroll$, () => {
      rAF(update)
    })

    onMounted(() => setTimeout(() => scrollToActiveTab(), 0))
    onUpdated(() => update())

    expose({
      scrollToActiveTab,
      removeFocus,
      focusActiveTab,
      tabListRef: nav$,
      tabBarRef,
      scheduleRender: () => triggerRef(tracker),
    })

    return () => {
      const scrollBtn = scrollable.value
        ? [
            <span
              class={[
                ns.e('nav-prev'),
                ns.is('disabled', !scrollable.value.prev),
              ]}
              onClick={scrollPrev}
            >
              <ElIcon>
                <ArrowLeft />
              </ElIcon>
            </span>,
            <span
              class={[
                ns.e('nav-next'),
                ns.is('disabled', !scrollable.value.next),
              ]}
              onClick={scrollNext}
            >
              <ElIcon>
                <ArrowRight />
              </ElIcon>
            </span>,
          ]
        : null

      const paneEntries = props.panes.map((pane, index) => {
        pane.index = `${index}`
        return { pane, index }
      })
      const fixedLeftPanes = paneEntries.filter(
        ({ pane }) => pane.props.fixed === 'left'
      )
      const fixedRightPanes = paneEntries.filter(
        ({ pane }) => pane.props.fixed === 'right'
      )
      const scrollPanes = paneEntries.filter(
        ({ pane }) =>
          pane.props.fixed !== 'left' && pane.props.fixed !== 'right'
      )
      const hasFixedPanes = fixedLeftPanes.length + fixedRightPanes.length > 0
      const isScrollEmpty = scrollPanes.length === 0
      const hasFixedBorderCard =
        (fixedLeftPanes.length > 0 &&
          (rootTabs.props.leftType || props.type) === 'border-card') ||
        (fixedRightPanes.length > 0 &&
          (rootTabs.props.rightType || props.type) === 'border-card')

      const renderTab = ({ pane, index }: (typeof paneEntries)[number]) => {
        const uid = pane.uid
        const disabled = pane.props.disabled
        const tabName = pane.props.name ?? pane.index ?? `${index}`
        const closable =
          !disabled &&
          (pane.isClosable || (pane.props.closable !== false && props.editable))

        const btnClose = closable ? (
          <ElIcon
            class="is-icon-close"
            // `onClick` not exist when generate dts

            // @ts-ignore
            onClick={(ev: MouseEvent) => emit('tabRemove', pane, ev)}
          >
            <Close />
          </ElIcon>
        ) : null

        const tabLabelContent = pane.slots.label?.() || pane.props.label
        const tabindex =
          !disabled && pane.active
            ? (props.tabindex ?? rootTabs.props.tabindex)
            : -1

        return (
          <div
            ref={(el) => setRefs(el, tabName)}
            class={[
              ns.e('item'),
              ns.is(rootTabs.props.tabPosition),
              ns.is('active', pane.active),
              ns.is('disabled', disabled),
              ns.is('closable', closable),
              ns.is('focus', isFocus.value),
            ]}
            id={`tab-${tabName}`}
            key={`tab-${uid}`}
            aria-controls={`pane-${tabName}`}
            role="tab"
            aria-selected={pane.active}
            tabindex={tabindex}
            onFocus={() => setFocus()}
            onBlur={() => removeFocus()}
            onClick={(ev: MouseEvent) => {
              removeFocus()
              emit('tabClick', pane, tabName, ev)
            }}
            onKeydown={(ev: KeyboardEvent) => {
              const code = getEventCode(ev)
              if (
                closable &&
                (code === EVENT_CODE.delete || code === EVENT_CODE.backspace)
              ) {
                emit('tabRemove', pane, ev)
              }
            }}
          >
            {...[tabLabelContent, btnClose]}
          </div>
        )
      }

      const renderFixedNav = (
        panes: typeof paneEntries,
        position: 'left' | 'right'
      ) => {
        const fixedType =
          rootTabs.props[position === 'left' ? 'leftType' : 'rightType'] ||
          props.type

        return panes.length ? (
          <div
            class={[
              ns.e('nav'),
              ns.e('nav-fixed'),
              ns.e(`nav-fixed-${position}`),
              ns.is(rootTabs.props.tabPosition),
              ns.is(fixedType, !!fixedType),
            ]}
          >
            {!fixedType ? (
              <TabBar
                active={panes.some(({ pane }) => pane.active)}
                ref={
                  panes.some(({ pane }) => pane.active) ? tabBarRef : undefined
                }
                tabs={panes.map(({ pane }) => pane)}
                tabRefs={tabRefsMap.value}
              />
            ) : null}
            {panes.map(renderTab)}
          </div>
        ) : null
      }

      // By tracking the value property, we can schedule a job to re-render `TabNav` when needed.
      // Unlike `instance.update`, the scheduler ensures the job is queued only once even if we trigger it multiple times.
      tracker.value

      return (
        <div
          ref={el$}
          class={[
            ns.e('nav-wrap'),
            ns.is('scrollable', !!scrollable.value),
            ns.is('fixed', hasFixedPanes),
            ns.is('fixed-left', fixedLeftPanes.length > 0),
            ns.is('fixed-right', fixedRightPanes.length > 0),
            ns.is('fixed-border-card', hasFixedBorderCard),
            ns.is('scroll-empty', isScrollEmpty),
            ns.is(rootTabs.props.tabPosition),
          ]}
          role="tablist"
          onKeydown={changeTab}
        >
          {renderFixedNav(fixedLeftPanes, 'left')}
          <div
            class={[
              ns.e('nav-scroll-wrap'),
              ns.is('scrollable', !!scrollable.value),
            ]}
          >
            {scrollBtn?.[0]}
            <div class={ns.e('nav-scroll')} ref={navScroll$}>
              <div
                class={[
                  ns.e('nav'),
                  ns.is(rootTabs.props.tabPosition),
                  ns.is(
                    'stretch',
                    props.stretch &&
                      ['top', 'bottom'].includes(rootTabs.props.tabPosition)
                  ),
                ]}
                ref={nav$}
                style={navStyle.value}
                onWheel={handleWheel}
                onTouchstart={handleTouchStart}
                onTouchmove={handleTouchMove}
                onTouchend={handleTouchEnd}
                onTouchcancel={handleTouchEnd}
              >
                {...[
                  !props.type ? (
                    <TabBar
                      active={
                        scrollPanes.some(({ pane }) => pane.active) ||
                        !paneEntries.some(({ pane }) => pane.active)
                      }
                      ref={
                        scrollPanes.some(({ pane }) => pane.active)
                          ? tabBarRef
                          : undefined
                      }
                      tabs={scrollPanes.map(({ pane }) => pane)}
                      tabRefs={tabRefsMap.value}
                    />
                  ) : null,
                  scrollPanes.map(renderTab),
                ]}
              </div>
            </div>
            {scrollBtn?.[1]}
          </div>
          {renderFixedNav(fixedRightPanes, 'right')}
        </div>
      )
    }
  },
})

export type TabNavInstance = InstanceType<typeof TabNav> & {
  scrollToActiveTab: () => Promise<void>
  removeFocus: () => void
  focusActiveTab: () => void
  scheduleRender: () => void
  tabListRef: HTMLDivElement | undefined
  tabBarRef: TabBarInstance | undefined
}

export default TabNav
