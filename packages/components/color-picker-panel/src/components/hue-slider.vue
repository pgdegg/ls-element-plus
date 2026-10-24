<template>
  <div :class="rootKls">
    <div ref="bar" :class="barKls" @click="handleClick" />
    <div
      ref="thumb"
      :class="thumbKls"
      :style="thumbStyle"
      :aria-label="ariaLabel"
      :aria-valuenow="currentValue"
      :aria-valuetext="ariaValuetext"
      :aria-orientation="vertical ? 'vertical' : 'horizontal'"
      :aria-valuemin="minValue"
      :aria-valuemax="maxValue"
      role="slider"
      :tabindex="disabled ? undefined : 0"
      :aria-disabled="disabled"
      @keydown="handleKeydown"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '@element-plus/hooks'
import { useSlider, useSliderDOM } from '../composables/use-slider'

import type { HueSliderProps } from '../props/slider'

defineOptions({
  name: 'ElColorHueSlider',
})

const props = defineProps<HueSliderProps>()
const minValue = 0
const maxValue = 360

const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } =
  useSlider(props, { key: 'hue', minValue, maxValue })

const { rootKls, barKls, thumbKls, thumbStyle, thumbTop, update } =
  useSliderDOM(props, {
    namespace: 'color-hue-slider',
    maxValue,
    currentValue,
    bar,
    thumb,
    handleDrag,
  })

const { t } = useLocale()

const ariaLabel = computed(() => t('el.colorpicker.hueLabel'))
const ariaValuetext = computed(() => {
  return t('el.colorpicker.hueDescription', {
    hue: currentValue.value,
    color: props.color.value,
  })
})

defineExpose({
  /**
   * @description 条元素 ref
   */
  bar,
  /**
   * @description 滑块元素 ref
   */
  thumb,
  /**
   * @description 滑块顶部位置，仅用于垂直滑块
   */
  thumbTop,
  /**
   * @description 手动更新色相滑块
   */
  update,
})
</script>
