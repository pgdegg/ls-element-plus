---
title: Link
lang: en-US
---

# Link

Text hyperlink

:::warning Security Warning
The `href` prop will be rendered directly to an `<a>` tag. If you pass a value such as `javascript:alert(1)` or a malicious URL, it may cause **XSS** or **open redirect vulnerabilities**.

Always validate and sanitize the URL before use. For example:

<details>
<summary>Show code example</summary>

```js
function sanitizeUrl(url) {
  const allowedProtocols = ['http:', 'https:']
  try {
    const parsed = new URL(url, window.location.origin)
    return allowedProtocols.includes(parsed.protocol) ? parsed.href : '#'
  } catch {
    return '#'
  }
}
```

</details>

:::

## Basic

Basic text link

:::demo

link/basic

:::

## Disabled

Disabled state of link

:::demo

link/disabled

:::

## Underline

Controlling when underlines should appear

Use `'always'`, `'hover'`, or `'never'` to control when underlines appear.

:::demo

link/underline

:::

## Icon

Link with icon

:::tip

Use the `icon` attribute to add icon. You can pass either string for the component name (registered in advance) or the component itself which is a SVG Vue component. Element Plus has provided a set of icon that you can find at [icon](./icon.md)

:::

:::demo

link/with-icon

:::

## API

### Attributes

| Name      | Description                         | Type                                                                            | Default |
| --------- | ----------------------------------- | ------------------------------------------------------------------------------- | ------- |
| type      | type                                | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | default |
| underline | when underlines should appear       | ^[enum]`'always' \| 'hover' \| 'never'`                                         | hover   |
| disabled  | whether the component is disabled   | ^[boolean]                                                                      | false   |
| href      | same as native hyperlink's `href`   | ^[string]                                                                       | —       |
| target    | same as native hyperlink's `target` | ^[enum]`'_blank' \| '_parent' \| '_self' \| '_top'`                             | \_self  |
| icon      | icon component                      | ^[string] / ^[Component]                                                        | —       |

### Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |
| icon    | customize icon component  |
