import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
  watchEffect,
  withDirectives,
} from 'vue'
import { unrefElement, useResizeObserver } from '@vueuse/core'
import { isNil } from 'lodash-unified'
import ElIcon from '@element-plus/components/icon'
import { More } from '@element-plus/icons-vue'
import {
  buildProps,
  definePropType,
  flattedChildren,
  iconPropType,
  isArray,
  isObject,
  isString,
  isUndefined,
  mutable,
} from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import { ClickOutside as vClickoutside } from '@element-plus/directives'
import Menubar from './utils/menu-bar'
import ElMenuCollapseTransition from './menu-collapse-transition.vue'
import ElSubMenu from './sub-menu'
import { useMenuCssVar } from './use-menu-css-var'
import { MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from './tokens'

import type { ClassValue } from '@element-plus/utils'
import type { PopperEffect } from '@element-plus/components/popper'
import type { MenuItemClicked, MenuProvider, SubMenuProvider } from './types'
import type { NavigationFailure, Router } from 'vue-router'
import type {
  Component,
  DirectiveArguments,
  ExtractPropTypes,
  ExtractPublicPropTypes,
  StyleValue,
  VNode,
  VNodeArrayChildren,
} from 'vue'
import type { UseResizeObserverReturn } from '@vueuse/core'

export const menuProps = buildProps({
  /**
   * @description 菜单显示模式
   */
  mode: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'vertical',
  },
  /**
   * @description 页面加载时激活菜单的索引
   */
  defaultActive: {
    type: String,
    default: '',
  },
  /**
   * @description 包含当前激活子菜单索引的数组
   */
  defaultOpeneds: {
    type: definePropType<string[]>(Array),
    default: () => mutable([] as const),
  },
  /**
   * @description 是否只能激活一个子菜单
   */
  uniqueOpened: Boolean,
  /**
   * @description 是否启用 `vue-router` 模式。若为 true，index 将作为 'path' 用于激活路由动作。可配合 `default-active` 在加载时设置激活项。
   */
  router: Boolean,
  /**
   * @description 子菜单触发方式，仅在 `mode` 为 'horizontal' 时生效
   */
  menuTrigger: {
    type: String,
    values: ['hover', 'click'],
    default: 'hover',
  },
  /**
   * @description 菜单是否折叠（仅在垂直模式下可用）
   */
  collapse: Boolean,
  /**
   * @description Menu 背景色（十六进制格式）（已废弃，请改用 `--bg-color`）
   * @deprecated use `--bg-color` instead
   */
  backgroundColor: String,
  /**
   * @description Menu 文本色（十六进制格式）（已废弃，请改用 `--text-color`）
   * @deprecated use `--text-color` instead
   */
  textColor: String,
  /**
   * @description 当前激活菜单项的文本色（十六进制格式）（已废弃，请改用 `--active-color`）
   * @deprecated use `--active-color` instead
   */
  activeTextColor: String,
  /**
   * @description 可选，点击外部时菜单是否折叠
   */
  closeOnClickOutside: Boolean,
  /**
   * @description 是否启用折叠过渡动画
   */
  collapseTransition: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 菜单是否省略（仅在水平模式下可用）
   */
  ellipsis: {
    type: Boolean,
    default: true,
  },
  /**
   * @description popper 偏移量（对所有子菜单生效）
   */
  popperOffset: {
    type: Number,
    default: 6,
  },
  /**
   * @description 自定义省略图标（仅在水平模式且 ellipsis 为 true 时可用）
   */
  ellipsisIcon: {
    type: iconPropType,
    default: () => More,
  },
  /**
   * @description 菜单折叠时的 Tooltip 主题，内置主题：`dark` / `light`
   */
  popperEffect: {
    type: definePropType<PopperEffect>(String),
    default: 'dark',
  },
  /**
   * @description 所有弹出菜单的自定义类名
   */
  popperClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 所有弹出菜单的自定义样式
   */
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 所有菜单显示前的控制超时时间
   */
  showTimeout: {
    type: Number,
    default: 300,
  },
  /**
   * @description 所有菜单隐藏前的控制超时时间
   */
  hideTimeout: {
    type: Number,
    default: 300,
  },
  /**
   * @description 菜单未激活且 `persistent` 为 `false` 时，下拉菜单将被销毁
   */
  persistent: {
    type: Boolean,
    default: true,
  },
} as const)
export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuPropsPublic = ExtractPublicPropTypes<typeof menuProps>

const checkIndexPath = (indexPath: unknown): indexPath is string[] =>
  isArray(indexPath) && indexPath.every((path) => isString(path))

export const menuEmits = {
  close: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),

  open: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),

  select: (
    index: string,
    indexPath: string[],
    item: MenuItemClicked,
    routerResult?: Promise<void | NavigationFailure>
  ) =>
    isString(index) &&
    checkIndexPath(indexPath) &&
    isObject(item) &&
    (isUndefined(routerResult) || routerResult instanceof Promise),
}
export type MenuEmits = typeof menuEmits

const DEFAULT_MORE_ITEM_WIDTH = 64

export default defineComponent({
  name: 'ElMenu',

  props: menuProps,
  emits: menuEmits,

  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance()!
    const router = instance.appContext.config.globalProperties.$router as Router
    const menu = ref<HTMLUListElement>()
    const subMenu = ref<HTMLElement>()
    const nsMenu = useNamespace('menu')
    const nsSubMenu = useNamespace('sub-menu')
    let moreItemWidth = DEFAULT_MORE_ITEM_WIDTH

    // data
    const sliceIndex = ref(-1)

    const openedMenus = ref<MenuProvider['openedMenus']>(
      props.defaultOpeneds && !props.collapse
        ? props.defaultOpeneds.slice(0)
        : []
    )
    const activeIndex = ref<MenuProvider['activeIndex']>(props.defaultActive)
    const items = ref<MenuProvider['items']>({})
    const subMenus = ref<MenuProvider['subMenus']>({})

    // computed
    const isMenuPopup = computed<MenuProvider['isMenuPopup']>(
      () =>
        props.mode === 'horizontal' ||
        (props.mode === 'vertical' && props.collapse)
    )

    // methods
    const initMenu = () => {
      const activeItem = activeIndex.value && items.value[activeIndex.value]
      if (!activeItem || props.mode === 'horizontal' || props.collapse) return

      const indexPath = activeItem.indexPath

      // 展开该菜单项的路径上所有子菜单
      // 展开该菜单项的所有子菜单
      indexPath.forEach((index) => {
        const subMenu = subMenus.value[index]
        subMenu && openMenu(index, subMenu.indexPath)
      })
    }

    const openMenu: MenuProvider['openMenu'] = (index, indexPath) => {
      if (openedMenus.value.includes(index)) return
      // 将不在该菜单路径下的其余菜单收起
      // 折叠当前菜单项之外的所有菜单
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter((index: string) =>
          indexPath.includes(index)
        )
      }
      openedMenus.value.push(index)
      emit('open', index, indexPath)
    }

    const close = (index: string) => {
      const i = openedMenus.value.indexOf(index)
      if (i !== -1) {
        openedMenus.value.splice(i, 1)
      }
    }

    const closeMenu: MenuProvider['closeMenu'] = (index, indexPath) => {
      close(index)
      emit('close', index, indexPath)
    }

    const handleSubMenuClick: MenuProvider['handleSubMenuClick'] = ({
      index,
      indexPath,
    }) => {
      const isOpened = openedMenus.value.includes(index)

      isOpened ? closeMenu(index, indexPath) : openMenu(index, indexPath)
    }

    const handleMenuItemClick: MenuProvider['handleMenuItemClick'] = (
      menuItem
    ) => {
      if (props.mode === 'horizontal' || props.collapse) {
        openedMenus.value = []
      }
      const { index, indexPath } = menuItem
      if (isNil(index) || isNil(indexPath)) return

      if (props.router && router) {
        const route = menuItem.route || index
        const routerResult = router.push(route).then((res) => {
          if (!res) activeIndex.value = index
          return res
        })
        emit(
          'select',
          index,
          indexPath,
          { index, indexPath, route },
          routerResult
        )
      } else {
        activeIndex.value = index
        emit('select', index, indexPath, { index, indexPath })
      }
    }

    const updateActiveIndex = (val: string) => {
      const itemsInData = items.value
      const item =
        itemsInData[val] ||
        (activeIndex.value && itemsInData[activeIndex.value]) ||
        itemsInData[props.defaultActive]

      activeIndex.value = item?.index ?? val
    }

    const calcMenuItemWidth = (menuItem: HTMLElement) => {
      const computedStyle = getComputedStyle(menuItem)
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10)
      const marginRight = Number.parseInt(computedStyle.marginRight, 10)
      return menuItem.offsetWidth + marginLeft + marginRight || 0
    }

    const calcSliceIndex = () => {
      if (!menu.value) return -1

      const items = Array.from(menu.value.childNodes).filter(
        (item) =>
          item.nodeName !== '#comment' &&
          (item.nodeName !== '#text' || item.nodeValue)
      ) as HTMLElement[]

      const computedMenuStyle = getComputedStyle(menu.value)
      const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10)
      const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10)
      const menuWidth = menu.value.clientWidth - paddingLeft - paddingRight

      let calcWidth = 0
      let sliceIndex = 0
      items.forEach((item, index) => {
        calcWidth += calcMenuItemWidth(item)
        if (calcWidth <= menuWidth - moreItemWidth) {
          sliceIndex = index + 1
        }
      })
      return sliceIndex === items.length ? -1 : sliceIndex
    }

    const getIndexPath = (index: string) => subMenus.value[index].indexPath

    // 普通电脑显示器 FPS 为 60Hz，即每秒重绘 60 次。计算公式：1000ms/60 ≈ 16.67ms；为避免 `resize` 时偶然重复触发，将 wait 设为 16.67 * 2 = 33.34
    const debounce = (fn: () => void, wait = 33.34) => {
      let timer: ReturnType<typeof setTimeout> | null
      return () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          fn()
        }, wait)
      }
    }

    let isFirstTimeRender = true
    const handleResize = () => {
      const el = unrefElement(subMenu)
      if (el) moreItemWidth = calcMenuItemWidth(el) || DEFAULT_MORE_ITEM_WIDTH
      if (sliceIndex.value === calcSliceIndex()) return
      const callback = () => {
        sliceIndex.value = -1
        nextTick(() => {
          sliceIndex.value = calcSliceIndex()
        })
      }
      // 首次 resize 时直接执行回调以避免抖动
      isFirstTimeRender ? callback() : debounce(callback)()
      isFirstTimeRender = false
    }

    watch(
      () => props.defaultActive,
      (currentActive) => {
        if (!items.value[currentActive]) {
          activeIndex.value = ''
        }
        updateActiveIndex(currentActive)
      }
    )

    watch(
      () => props.collapse,
      (value) => {
        if (value) openedMenus.value = []
      }
    )

    watch(items.value, initMenu)

    let resizeStopper: UseResizeObserverReturn['stop']
    watchEffect(() => {
      if (props.mode === 'horizontal' && props.ellipsis)
        resizeStopper = useResizeObserver(menu, handleResize).stop
      else resizeStopper?.()
    })

    const mouseInChild = ref(false)

    // provide
    {
      const addSubMenu: MenuProvider['addSubMenu'] = (item) => {
        subMenus.value[item.index] = item
      }

      const removeSubMenu: MenuProvider['removeSubMenu'] = (item) => {
        delete subMenus.value[item.index]
      }

      const addMenuItem: MenuProvider['addMenuItem'] = (item) => {
        items.value[item.index] = item
      }

      const removeMenuItem: MenuProvider['removeMenuItem'] = (item) => {
        delete items.value[item.index]
      }

      provide<MenuProvider>(
        MENU_INJECTION_KEY,
        reactive({
          props,
          openedMenus,
          items,
          subMenus,
          activeIndex,
          isMenuPopup,

          addMenuItem,
          removeMenuItem,
          addSubMenu,
          removeSubMenu,
          openMenu,
          closeMenu,
          handleMenuItemClick,
          handleSubMenuClick,
        }) as unknown as MenuProvider // 避免 TS2589
      )

      provide<SubMenuProvider>(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        mouseInChild,
        level: 0,
      })
    }

    // lifecycle
    onMounted(() => {
      if (props.mode === 'horizontal') {
        new Menubar(instance.vnode.el!, nsMenu.namespace.value)
      }
    })

    {
      const open = (index: string) => {
        const { indexPath } = subMenus.value[index]
        indexPath.forEach((i) => openMenu(i, indexPath))
      }

      expose({
        open,
        close,
        updateActiveIndex,
        handleResize,
      })
    }

    const ulStyle = useMenuCssVar(props, 0)

    return () => {
      let slot: VNodeArrayChildren = slots.default?.() ?? []
      const vShowMore: VNode[] = []

      if (props.mode === 'horizontal' && menu.value) {
        const originalSlot = (
          flattedChildren(slot) as VNodeArrayChildren
        ).filter((vnode) => {
          // 过滤文本节点和注释节点（https://github.com/vuejs/core/blob/c875019d49b4c36a88d929ccadc31ad414747c7b/packages/shared/src/shapeFlags.ts#L5）
          return (vnode as VNode)?.shapeFlag !== 8
        })
        const slotDefault =
          sliceIndex.value === -1
            ? originalSlot
            : originalSlot.slice(0, sliceIndex.value)

        const slotMore =
          sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value)

        if (slotMore?.length && props.ellipsis) {
          slot = slotDefault
          vShowMore.push(
            h(
              ElSubMenu,
              {
                ref: subMenu,
                index: 'sub-menu-more',
                class: nsSubMenu.e('hide-arrow'),
                popperOffset: props.popperOffset,
              },
              {
                title: () =>
                  h(
                    ElIcon,
                    {
                      class: nsSubMenu.e('icon-more'),
                    },
                    {
                      default: () => h(props.ellipsisIcon as Component),
                    }
                  ),
                default: () => slotMore,
              }
            )
          )
        }
      }

      const directives: DirectiveArguments = props.closeOnClickOutside
        ? [
            [
              vClickoutside,
              () => {
                if (!openedMenus.value.length) return

                if (!mouseInChild.value) {
                  openedMenus.value.forEach((openedMenu) =>
                    emit('close', openedMenu, getIndexPath(openedMenu))
                  )

                  openedMenus.value = []
                }
              },
            ],
          ]
        : []

      const vMenu = withDirectives(
        h(
          'ul',
          {
            key: String(props.collapse),
            role: 'menubar',
            ref: menu,
            style: ulStyle.value,
            class: {
              [nsMenu.b()]: true,
              [nsMenu.m(props.mode)]: true,
              [nsMenu.m('collapse')]: props.collapse,
            },
          },
          [...slot, ...vShowMore]
        ),
        directives
      )

      if (props.collapseTransition && props.mode === 'vertical') {
        return h(ElMenuCollapseTransition, () => vMenu)
      }

      return vMenu
    }
  },
})
