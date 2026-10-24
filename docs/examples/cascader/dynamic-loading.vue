<template>
  <el-cascader :props="props" />
</template>

<script lang="ts" setup>
import type { CascaderProps } from 'element-plus'

let id = 0
const props: CascaderProps = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node
    setTimeout(() => {
      const nodes = Array.from({ length: level + 1 }).map((item) => ({
        value: ++id,
        label: `Option - ${id}`,
        leaf: level >= 2,
      }))
      // 调用 `resolve` 回调以返回子节点数据，并表示加载已完成。
      resolve(nodes)
    }, 1000)
  },
}
</script>
