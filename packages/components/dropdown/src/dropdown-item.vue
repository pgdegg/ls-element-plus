<template>
  <el-roving-focus-item :focusable="!disabled">
    <el-dropdown-item-impl
      v-bind="propsAndAttrs"
      @pointerleave="handlePointerLeave"
      @pointermove="handlePointerMove"
      @clickimpl="handleClick"
    >
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>

      <slot />
    </el-dropdown-item-impl>
  </el-roving-focus-item>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject } from 'vue'
import { ElRovingFocusItem } from '@element-plus/components/roving-focus-group'
import { composeEventHandlers, whenMouse } from '@element-plus/utils'
import ElDropdownItemImpl from './dropdown-item-impl.vue'
import { useDropdown } from './useDropdown'
import { dropdownItemProps } from './dropdown'
import { DROPDOWN_INJECTION_KEY } from './tokens'

export default defineComponent({
  name: 'ElDropdownItem',
  components: {
    ElRovingFocusItem,
    ElDropdownItemImpl,
  },
  inheritAttrs: false,
  props: dropdownItemProps,
  emits: ['pointermove', 'pointerleave', 'click'],
  setup(props, { emit, attrs }) {
    const { elDropdown } = useDropdown()
    const _instance = getCurrentInstance()
    const { onItemEnter, onItemLeave } = inject(
      DROPDOWN_INJECTION_KEY,
      undefined
    )!

    const handlePointerMove = composeEventHandlers(
      (e: PointerEvent) => {
        emit('pointermove', e)
        return e.defaultPrevented
      },
      whenMouse((e) => {
        if (props.disabled) {
          onItemLeave(e)
          return
        }

        const target = e.currentTarget as HTMLElement
        /**
         * 处理以下场景：
         *   当菜单项包含 input 等表单元素时，
         *   鼠标悬停在菜单项内的该元素自身上时，
         *   应阻止默认的聚焦逻辑，以免产生异常行为。
         */
        if (
          target === document.activeElement ||
          target.contains(document.activeElement)
        ) {
          return
        }

        onItemEnter(e)
        if (!e.defaultPrevented) {
          target?.focus({
            preventScroll: true,
          })
        }
      })
    )

    const handlePointerLeave = composeEventHandlers((e: PointerEvent) => {
      emit('pointerleave', e)
      return e.defaultPrevented
    }, whenMouse(onItemLeave))

    const handleClick = composeEventHandlers(
      (e: PointerEvent) => {
        if (props.disabled) {
          return
        }
        emit('click', e)
        return e.type !== 'keydown' && e.defaultPrevented
      },
      (e) => {
        if (props.disabled) {
          e.stopImmediatePropagation()
          return
        }
        if (elDropdown?.hideOnClick?.value) {
          elDropdown.handleClick?.()
        }
        elDropdown.commandHandler?.(props.command, _instance, e)
      }
    )

    // 直接使用 v-bind={ ...$props, ...$attrs } 会导致类型错误
    const propsAndAttrs = computed(() => ({ ...props, ...attrs }))

    return {
      handleClick,
      handlePointerMove,
      handlePointerLeave,
      propsAndAttrs,
    }
  },
})
</script>
