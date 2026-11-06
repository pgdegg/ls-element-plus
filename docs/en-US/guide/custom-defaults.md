---
title: Custom Defaults
lang: en-US
---

# Custom Defaults

The component library allows you to customize the default values of component props.

By configuring defaults in advance, you can reduce repetitive prop declarations and keep your templates cleaner and more consistent.

## Basic Usage

You can customize a component’s default props using the static `setPropsDefaults` method provided by the component.

:::tip

Note that default customization **only applies to declarative components** and **must be performed before the component is initialized**.

The configured defaults are global. Once set, they will apply to all Vue applications where the component is registered.

Once the component is rendered for the first time, the defaults become immutable and can no longer be changed.

:::

```ts [main.ts]
import { ElButton } from 'element-plus'

ElButton.setPropsDefaults({
  type: 'primary',
  size: 'small',
})
```

After applying the customization, the following two usages are equivalent:

```vue [App.vue]
<template>
  <el-button>Hello</el-button>
  <el-button type="primary" size="small">Hello</el-button>
</template>
```

::: warning

It is not recommended to set default values for components that are internally used by other components.

For example:

```ts
// This will cause the behavior of the el-autocomplete component to change.
ElInput.setPropsDefaults({ maxlength: 1 })
```

:::

## Runtime Prop Definitions ^(2.15.0)

Components export their runtime prop definitions as `<ComponentName>DefaultValueProps`, for example `ButtonDefaultValueProps` and `ButtonGroupDefaultValueProps`. These objects include prop types, validators, required flags, and defaults, and are the definitions used by the components themselves.

You can reuse the same definitions in a wrapper component:

```vue
<script setup lang="ts">
import { ButtonDefaultValueProps } from 'element-plus'

const props = defineProps(ButtonDefaultValueProps)
</script>

<template>
  <el-button v-bind="props"><slot /></el-button>
</template>
```

Replace previous `*Props`, `*PropDefs`, and `*PropsDefaults` constant imports with the corresponding `*DefaultValueProps` runtime definition. Public props interfaces such as `ButtonProps` remain available as types. A runtime definition is a Vue props options object; it is not a plain object of default values for `withDefaults`.

To customize defaults, continue to use `ElButton.setPropsDefaults()` before mounting a component.
