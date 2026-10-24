<template>
  <el-input
    v-model="text"
    maxlength="10"
    placeholder="Please input"
    show-word-limit
    :count-graphemes="calc"
    type="text"
  />
  <div style="margin: 20px 0" />
  <el-input
    v-model="textarea"
    maxlength="20"
    placeholder="Please input"
    show-word-limit
    :count-graphemes="calc"
    type="textarea"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('😀😁')
const textarea = ref('😀😁')

/**
 * 用于字形聚类的计数函数。
 * 统计字符串中字形（可视字符）的数量。
 *
 * 注意：本示例为简单起见使用 Array.from()。
 * 生产环境建议使用 Intl.Segmenter，以更好地
 * 处理复杂 emoji 与 unicode 字符。
 */
const calc = (value: string) => {
  // 简化版本：统计码点数量（而非完整的字形簇）
  // 生产环境请像组件那样使用 Intl.Segmenter
  return Array.from(value).length
}
</script>
