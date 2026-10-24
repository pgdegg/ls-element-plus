<template>
  <el-popper ref="popperRef" :role="role">
    <el-tooltip-trigger
      :disabled="disabled"
      :trigger="trigger"
      :trigger-keys="triggerKeys"
      :virtual-ref="virtualRef"
      :virtual-triggering="virtualTriggering"
      :focus-on-target="focusOnTarget"
    >
      <slot v-if="$slots.default" />
    </el-tooltip-trigger>
    <el-tooltip-content
      ref="contentRef"
      :aria-label="ariaLabel"
      :boundaries-padding="boundariesPadding"
      :content="content"
      :disabled="disabled"
      :effect="effect"
      :enterable="enterable"
      :fallback-placements="fallbackPlacements"
      :hide-after="hideAfter"
      :gpu-acceleration="gpuAcceleration"
      :offset="offset"
      :persistent="persistent"
      :popper-class="kls"
      :popper-style="popperStyle"
      :placement="placement"
      :popper-options="popperOptions"
      :arrow-offset="arrowOffset"
      :pure="pure"
      :raw-content="rawContent"
      :reference-el="referenceEl"
      :trigger-target-el="triggerTargetEl"
      :show-after="showAfter"
      :strategy="strategy"
      :teleported="teleported"
      :transition="transition"
      :virtual-triggering="virtualTriggering"
      :z-index="zIndex"
      :append-to="appendTo"
      :loop="loop"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content" />
        <span v-else>{{ content }}</span>
      </slot>
      <el-popper-arrow v-if="showArrow" />
    </el-tooltip-content>
  </el-popper>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onDeactivated,
  provide,
  readonly,
  ref,
  toRef,
  unref,
  watch,
} from 'vue'
import {
  ElPopper,
  ElPopperArrow,
  popperArrowPropsDefaults,
} from '@element-plus/components/popper'
import { isBoolean } from '@element-plus/utils'
import {
  useDelayedToggle,
  useId,
  useNamespace,
  usePopperContainer,
} from '@element-plus/hooks'
import { TOOLTIP_INJECTION_KEY } from './constants'
import { tooltipEmits, useTooltipModelToggle } from './tooltip'
import ElTooltipTrigger from './trigger.vue'
import ElTooltipContent from './content.vue'
import { useTooltipContentPropsDefaults } from './content'
import { useTooltipTriggerPropsDefaults } from './trigger'

import type { Mutable } from '@element-plus/utils'
import type { TooltipContentInstance } from './content'
import type { UseTooltipProps } from './tooltip'
import type { PopperInstance } from '@element-plus/components/popper'

defineOptions({
  name: 'ElTooltip',
})

const props = withDefaults(defineProps<UseTooltipProps>(), {
  role: 'tooltip',
  ...useTooltipContentPropsDefaults,
  ...useTooltipTriggerPropsDefaults,
  ...popperArrowPropsDefaults,
  showArrow: true,
})
const emit = defineEmits(tooltipEmits as Mutable<typeof tooltipEmits>)

usePopperContainer()

const ns = useNamespace('tooltip')
const id = useId()
const popperRef = ref<PopperInstance>()
const contentRef = ref<TooltipContentInstance>()

const updatePopper = () => {
  const popperComponent = unref(popperRef)
  if (popperComponent) {
    popperComponent.popperInstanceRef?.update()
  }
}
const open = ref(false)
const toggleReason = ref<Event>()

const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
  indicator: open,
  toggleReason,
})

const { onOpen, onClose } = useDelayedToggle({
  showAfter: toRef(props, 'showAfter'),
  hideAfter: toRef(props, 'hideAfter'),
  autoClose: toRef(props, 'autoClose'),
  open: show,
  close: hide,
})

const controlled = computed(
  () => isBoolean(props.visible) && !hasUpdateHandler.value
)

const kls = computed(() => {
  return [ns.b(), props.popperClass!]
})

provide(TOOLTIP_INJECTION_KEY, {
  controlled,
  id,
  open: readonly(open),
  trigger: toRef(props, 'trigger'),
  onOpen,
  onClose,
  onToggle: (event?: Event) => {
    if (unref(open)) {
      onClose(event)
    } else {
      onOpen(event)
    }
  },
  onShow: () => {
    emit('show', toggleReason.value)
  },
  onHide: () => {
    emit('hide', toggleReason.value)
  },
  onBeforeShow: () => {
    emit('before-show', toggleReason.value)
  },
  onBeforeHide: () => {
    emit('before-hide', toggleReason.value)
  },
  updatePopper,
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled && open.value) {
      open.value = false
    }
    if (!disabled && isBoolean(props.visible)) {
      open.value = props.visible
    }
  }
)

const isFocusInsideContent = (event?: FocusEvent) => {
  return contentRef.value?.isFocusInsideContent(event)
}

onDeactivated(() => open.value && hide())

onBeforeUnmount(() => {
  toggleReason.value = undefined
})

defineExpose({
  /**
   * @description el-popper 组件实例
   */
  popperRef,
  /**
   * @description el-tooltip-content 组件实例
   */
  contentRef,
  /**
   * @description 校验当前焦点事件是否在 el-tooltip-content 内部触发
   */
  isFocusInsideContent,
  /**
   * @description 更新 el-popper 组件实例
   */
  updatePopper,
  /**
   * @description 暴露 onOpen 函数以管理 el-tooltip 的打开状态
   */
  onOpen,
  /**
   * @description 暴露 onClose 函数以管理 el-tooltip 的关闭状态
   */
  onClose,
  /**
   * @description 暴露 hide 函数
   */
  hide,
})
</script>
