---
title: HIS customization
lang: en-US
---

# HIS customization

The HIS fork includes shared input, form and selection behavior. Application wrappers can keep business data, permission checks and localized messages while using these library implementations.

## Component extensions

| Component                           | API                                                          | Version   | Behavior                                                                                                                                                              |
| ----------------------------------- | ------------------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input                               | `keeps`, `ignorekeeps`                                       | ^(2.14.8) | Retain selected character sets or regular-expression matches during input. Additional literal characters are retained with `ignorekeeps`. Composition remains intact. |
| InputNumber                         | `maxPrecision`, `precision-exceed`                           | ^(2.14.8) | Cap decimal places without padding trailing zeroes. The event receives the original value and precision limit.                                                        |
| InputNumber, DatePicker, TimePicker | `prepend`, `append` slots                                    | ^(2.14.8) | Render connected input groups using the component's own layout.                                                                                                       |
| DatePicker, TimePicker              | `quickInput`                                                 | ^(2.14.8) | Opt in to compact or partial date/time entry. Existing disabled-date/time and range validation still applies.                                                         |
| Form                                | `readonly`, `readonlyRaw`, `hidePlaceholder`, `contentWidth` | ^(2.14.8) | Provide reactive readonly and placeholder state to editable controls and set inline content width. Selection wrappers can use the same form context.                  |
| ButtonGroup                         | `disabled`, `plain`, `text`, `link`                          | ^(2.14.8) | Provide disabled state and appearance to descendants. Group appearance takes precedence when specified.                                                               |
| Select, SelectV2                    | `filterKeys`                                                 | ^(2.14.8) | Search additional fields of object-valued options with the default local filter. Defaults to an empty array.                                                          |
| Checkbox                            | `hideCircle`, `cancelDisabled`                               | ^(2.14.8) | Hide the visual indicator or retain selected-state colors while disabled. The native input and disabled behavior are preserved.                                       |
| Radio                               | `hideCircle`                                                 | ^(2.14.8) | Hide the visual indicator while retaining the native input.                                                                                                           |
| MessageBox                          | `resolveOnCancel`                                            | ^(2.14.8) | Resolve known cancellation actions when enabled. Defaults to false. `distinguishCancelAndClose` controls whether closing yields `close` or `cancel`.                  |
| MessageBox                          | `setConfirmDefaults(options)`                                | ^(2.14.8) | Configure confirm defaults without replacing its implementation. Explicit per-call options override defaults.                                                         |

| Select, SelectV2 | `separator`, `label`, `update:label` | ^(2.14.8) | Bind delimited multiple values and synchronize selected labels. Object values use `valueKey`. |
| CheckboxGroup | `allChecked`, `isIndeterminate`, `toggleAll(checked)` exposes | ^(2.14.8) | Toggle enabled, visible options while preserving disabled selections and respecting min/max. Requires `options`. |
| Dialog | `height`, `resetOnResize` | ^(2.14.8) | Set body height and opt in to resetting the drag position after resize. |
| Switch | `square` | ^(2.14.8) | Apply the square switch appearance. |
| Upload | `maxSize`, `validateAccept`, `onValidationError` | ^(2.14.8) | Validate byte size and optionally file types before upload, including manual submissions. Validation callback receives `size` or `type` and the raw file. |

`createCascaderModelAdapter(() => options)` ^(2.14.8) provides `decode`, `encode`, `labels` and `placeholder` for object values, bound paths and intermediate fields. Configure `valueKey`, `childrenKey`, `labelKey`, `multiple`, `bindPath`, `labelPath`, `middleFields`, `inlinePlaceholder` and `separator` as needed. Empty selections clear the model; zero-valued path nodes remain valid.

Icon `symbol`, `prefix`, `symbolResolver`, and `symbolVersion` ^(2.14.8) render sprite symbols and activate `data-src` resources when visible. Applications supply their registry resolver and version after asynchronous sprite loading. The default resolver uses document IDs, with `*` matching any prefix.

`createOptionModelAdapter(() => options)` ^(2.14.8) provides primitive/object selection conversion, labels and enabled default options for radio and checkbox application adapters. Configure `options`, `valueKey`, `valueField`, `labelField` and `multiple`. Falsy option values are preserved.

Input `hidePlaceholder`, `ignoreParentHidePlaceholder`, `ignoreParentReadonly`, and `focusDelay` ^(2.14.8) allow explicit placeholder/readonly inheritance overrides and cancellable delayed autofocus. `ignoreParentHidePlaceholder` accepts `form` to retain a placeholder inside a form that hides them. Explicit `hidePlaceholder: false` also overrides the form setting. Date/time controls support `hidePlaceholder` for both range inputs.

Card `disabled` ^(2.14.8) displays the existing disabled overlay inside the component theme.

`componentDisabledContextKey` ^(2.14.8) accepts a boolean or reactive boolean provided by a container. It disables descendant form controls even when their local `disabled` prop is false. Containers can combine their own state with the inherited state before providing it to nested descendants.

Scrollbar `overflowWidth` and `overflowHeight` ^(2.14.8) set vertical/horizontal bar thickness in pixels. Button `ignoreGroupDisabled` ^(2.14.8) retains an explicit exception to inherited group disabling.

## Quick entry

`parseQuickInput(input, { type, defaultToExtreme })` ^(2.14.8) returns a Day.js value or `undefined`. `type` is `date`, `time` or `date-time`; the default extreme is `min`.

Examples include `20261009`, `2026/2`, `1230` and `202610091230`. Missing fields use their minimum for range starts and maximum for range ends. Invalid calendar dates are rejected. Time-only parsing keeps the current calendar day. Input matching the configured display format is also accepted.

With `quickInput`, Enter in the start input focuses the end input without committing an incomplete range. A complete valid range uses the normal component model update and `valueFormat` conversion. Readonly, disabled and composition input do not trigger quick entry.

## Native element registration

`inputElementRegistrationKey` and `useInputElement` ^(2.14.8) let application containers register the real native input, independently of component roots or fragment siblings. The registrar receives an input or textarea and may return a cleanup callback. Registrations are released on replacement, deactivation and unmount. Composite controls register their outer input once.

```ts
import { provide } from 'vue'
import { inputElementRegistrationKey } from 'element-plus'

provide(inputElementRegistrationKey, (element) => {
  registerControl(element)
  return () => unregisterControl(element)
})
```

Input, InputNumber, Autocomplete, Select, SelectV2, Cascader, DatePicker, TimePicker, TimeSelect, ColorPickerPanel and option groups expose `inputElement` ^(2.14.8). Use this interface instead of looking for a sibling of `$el`.

`tabPaneActiveContextKey` ^(2.14.8) provides `selfActive`, ancestor-aware `active` and the nested pane `path`. `useContentStyle(highlight, zoom)` ^(2.14.8) supplies shared value, label and placeholder emphasis classes for application adapters.

## Styles

HIS styles live in the corresponding theme-chalk component sources and are included in both the complete theme and component styles. Application compositions such as VXE table selectors and medical-card forms keep their own styles beside their owning components. Import the library theme before application page styles.
