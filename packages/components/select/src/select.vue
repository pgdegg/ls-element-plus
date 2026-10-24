<template>
  <div
    ref="selectRef"
    v-click-outside:[popperRef]="handleClickOutside"
    :class="[nsSelect.b(), nsSelect.m(selectSize)]"
    @[mouseEnterEventName]="states.inputHovering = true"
    @mouseleave="states.inputHovering = false"
  >
    <el-tooltip
      ref="tooltipRef"
      :visible="dropdownMenuVisible"
      :placement="placement"
      :teleported="teleported"
      :popper-class="[nsSelect.e('popper'), popperClass]"
      :popper-style="popperStyle"
      :popper-options="popperOptions"
      :fallback-placements="fallbackPlacements"
      :effect="effect"
      pure
      trigger="click"
      :transition="`${nsSelect.namespace.value}-zoom-in-top`"
      :stop-popper-mouse-event="false"
      :gpu-acceleration="false"
      :persistent="persistent"
      :append-to="appendTo"
      :show-arrow="showArrow"
      :offset="offset"
      @before-show="handleMenuEnter"
      @hide="states.isBeforeHide = false"
    >
      <template #default>
        <div
          ref="wrapperRef"
          :class="[
            nsSelect.e('wrapper'),
            nsSelect.is('focused', isFocused),
            nsSelect.is('hovering', states.inputHovering),
            nsSelect.is('filterable', filterable),
            nsSelect.is('disabled', selectDisabled),
          ]"
          @click.prevent="toggleMenu"
        >
          <div
            v-if="$slots.prefix"
            ref="prefixRef"
            :class="nsSelect.e('prefix')"
          >
            <slot name="prefix" />
          </div>
          <div
            ref="selectionRef"
            :class="[
              nsSelect.e('selection'),
              nsSelect.is(
                'near',
                multiple && !$slots.prefix && !!states.selected.length
              ),
            ]"
          >
            <slot
              v-if="multiple"
              name="tag"
              :data="states.selected"
              :delete-tag="deleteTag"
              :select-disabled="selectDisabled"
            >
              <div
                v-for="(item, index) in showTagList"
                :key="getValueKey(item)"
                :class="nsSelect.e('selected-item')"
                :style="tagStyle"
              >
                <el-tag
                  :closable="!selectDisabled && !item.isDisabled"
                  :size="collapseTagSize"
                  :type="tagType"
                  :effect="tagEffect"
                  disable-transitions
                  @close="deleteTag($event, item)"
                >
                  <span :class="nsSelect.e('tags-text')">
                    <slot
                      name="label"
                      :raw-index="index"
                      :index="item.index"
                      :label="item.currentLabel"
                      :value="item.value"
                    >
                      {{ item.currentLabel }}
                    </slot>
                  </span>
                </el-tag>
              </div>

              <el-tooltip
                v-if="collapseTags && states.selected.length > maxCollapseTags"
                ref="tagTooltipRef"
                :disabled="dropdownMenuVisible || !collapseTagsTooltip"
                :fallback-placements="
                  tagTooltip?.fallbackPlacements ?? [
                    'bottom',
                    'top',
                    'right',
                    'left',
                  ]
                "
                :effect="tagTooltip?.effect ?? effect"
                :placement="tagTooltip?.placement ?? 'bottom'"
                :popper-class="tagTooltip?.popperClass ?? popperClass"
                :popper-style="tagTooltip?.popperStyle ?? popperStyle"
                :teleported="tagTooltip?.teleported ?? teleported"
                :append-to="tagTooltip?.appendTo ?? appendTo"
                :popper-options="tagTooltip?.popperOptions ?? popperOptions"
                :transition="tagTooltip?.transition"
                :show-after="tagTooltip?.showAfter"
                :hide-after="tagTooltip?.hideAfter"
                :auto-close="tagTooltip?.autoClose"
                :offset="tagTooltip?.offset"
              >
                <template #default>
                  <div
                    ref="collapseItemRef"
                    :class="[
                      nsSelect.e('selected-item'),
                      nsSelect.e('collapse-item'),
                    ]"
                  >
                    <el-tag
                      :closable="false"
                      :size="collapseTagSize"
                      :type="tagType"
                      :effect="tagEffect"
                      disable-transitions
                    >
                      <span :class="nsSelect.e('tags-text')">
                        + {{ states.selected.length - maxCollapseTags }}
                      </span>
                    </el-tag>
                  </div>
                </template>
                <template #content>
                  <div
                    ref="tagMenuRef"
                    :class="nsSelect.e('selection')"
                    :style="tagMenuStyle"
                  >
                    <div
                      v-for="(item, index) in collapseTagList"
                      :key="getValueKey(item)"
                      :class="nsSelect.e('selected-item')"
                      style="max-width: 100%"
                    >
                      <el-tag
                        class="in-tooltip"
                        :closable="!selectDisabled && !item.isDisabled"
                        :size="collapseTagSize"
                        :type="tagType"
                        :effect="tagEffect"
                        disable-transitions
                        @close="deleteTag($event, item)"
                      >
                        <span :class="nsSelect.e('tags-text')">
                          <slot
                            name="label"
                            :raw-index="index"
                            :index="item.index"
                            :label="item.currentLabel"
                            :value="item.value"
                          >
                            {{ item.currentLabel }}
                          </slot>
                        </span>
                      </el-tag>
                    </div>
                  </div>
                </template>
              </el-tooltip>
            </slot>
            <div
              :class="[
                nsSelect.e('selected-item'),
                nsSelect.e('input-wrapper'),
                nsSelect.is(
                  'hidden',
                  !filterable ||
                    selectDisabled ||
                    (multiple && !states.inputValue && !isFocused)
                ),
              ]"
            >
              <input
                :id="inputId"
                ref="inputRef"
                :value="states.inputValue"
                type="text"
                :name="name"
                :class="[nsSelect.e('input'), nsSelect.is(selectSize)]"
                :disabled="selectDisabled"
                :autocomplete="autocomplete"
                :style="inputStyle"
                :tabindex="tabindex"
                role="combobox"
                :readonly="!filterable"
                spellcheck="false"
                :aria-activedescendant="hoverOption?.id || ''"
                :aria-controls="contentId"
                :aria-expanded="dropdownMenuVisible"
                :aria-label="ariaLabel"
                aria-autocomplete="none"
                aria-haspopup="listbox"
                @keydown="handleKeydown"
                @compositionstart="handleCompositionStart"
                @compositionupdate="handleCompositionUpdate"
                @compositionend="handleCompositionEnd"
                @input="onInput"
                @change.stop
                @click.stop="toggleMenu"
              />
              <span
                v-if="filterable"
                ref="calculatorRef"
                aria-hidden="true"
                :class="nsSelect.e('input-calculator')"
                v-text="states.inputValue"
              />
            </div>
            <div
              v-if="shouldShowPlaceholder"
              :class="[
                nsSelect.e('selected-item'),
                nsSelect.e('placeholder'),
                nsSelect.is(
                  'transparent',
                  !hasModelValue || (expanded && !states.inputValue)
                ),
              ]"
            >
              <slot
                v-if="hasModelValue"
                name="label"
                :raw-index="-1"
                :index="getOption(modelValue!).index"
                :label="currentPlaceholder"
                :value="modelValue"
              >
                <span>{{ currentPlaceholder }}</span>
              </slot>
              <span v-else>{{ currentPlaceholder }}</span>
            </div>
          </div>
          <div ref="suffixRef" :class="nsSelect.e('suffix')">
            <el-icon
              v-if="iconComponent && !showClearBtn"
              :class="[nsSelect.e('caret'), nsSelect.e('icon'), iconReverse]"
            >
              <component :is="iconComponent" />
            </el-icon>
            <el-icon
              v-if="showClearBtn && clearIcon"
              :class="[
                nsSelect.e('caret'),
                nsSelect.e('icon'),
                nsSelect.e('clear'),
              ]"
              @click="handleClearClick"
            >
              <component :is="clearIcon" />
            </el-icon>
            <el-icon
              v-if="validateState && validateIcon && needStatusIcon"
              :class="[
                nsInput.e('icon'),
                nsInput.e('validateIcon'),
                nsInput.is('loading', validateState === 'validating'),
              ]"
            >
              <component :is="validateIcon" />
            </el-icon>
          </div>
        </div>
      </template>
      <template #content>
        <el-select-menu ref="menuRef">
          <div
            v-if="$slots.header"
            :class="nsSelect.be('dropdown', 'header')"
            @click.stop
          >
            <slot name="header" />
          </div>
          <el-scrollbar
            v-show="states.options.size > 0 && !loading"
            :id="contentId"
            ref="scrollbarRef"
            tag="ul"
            :wrap-class="nsSelect.be('dropdown', 'wrap')"
            :view-class="nsSelect.be('dropdown', 'list')"
            :class="[nsSelect.is('empty', filteredOptionsCount === 0)]"
            role="listbox"
            :aria-label="ariaLabel"
            aria-orientation="vertical"
            @scroll="popupScroll"
            @end-reached="endReached"
          >
            <el-option
              v-if="showNewOption"
              :value="states.inputValue"
              :created="true"
            />
            <el-options>
              <slot>
                <template v-for="(option, index) in options" :key="index">
                  <el-option-group
                    v-if="getOptions(option)?.length"
                    :label="getLabel(option)"
                    :disabled="getDisabled(option)"
                  >
                    <el-option
                      v-for="item in getOptions(option)"
                      :key="getValue(item)"
                      v-bind="getOptionProps(item)"
                    />
                  </el-option-group>
                  <el-option v-else v-bind="getOptionProps(option)" />
                </template>
              </slot>
            </el-options>
          </el-scrollbar>
          <div
            v-if="$slots.loading && loading"
            :class="nsSelect.be('dropdown', 'loading')"
          >
            <slot name="loading" />
          </div>
          <div
            v-else-if="loading || filteredOptionsCount === 0"
            :class="nsSelect.be('dropdown', 'empty')"
          >
            <slot name="empty">
              <span>{{ emptyText }}</span>
            </slot>
          </div>
          <div
            v-if="$slots.footer"
            :class="nsSelect.be('dropdown', 'footer')"
            @click.stop
          >
            <slot name="footer" />
          </div>
        </el-select-menu>
      </template>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  provide,
  reactive,
  toRefs,
  watch,
} from 'vue'
import { useInputElement } from '@element-plus/hooks/use-input-element'
import { ClickOutside } from '@element-plus/directives'
import ElTooltip from '@element-plus/components/tooltip'
import ElScrollbar from '@element-plus/components/scrollbar'
import ElTag from '@element-plus/components/tag'
import ElIcon from '@element-plus/components/icon'
import { flattedChildren, isArray, isObject } from '@element-plus/utils'
import { useCalcInputWidth } from '@element-plus/hooks'
import { useProps } from '@element-plus/components/select-v2/src/useProps'
import ElOption from './option.vue'
import ElSelectMenu from './select-dropdown.vue'
import { useSelect } from './useSelect'
import { selectKey } from './token'
import ElOptions from './options'
import { selectEmits, selectProps } from './select'
import ElOptionGroup from './option-group.vue'

import type { AppConfig, AppContext, VNode } from 'vue'
import type { SelectContext } from './type'

const COMPONENT_NAME = 'ElSelect'

type WarnHandler = AppConfig['warnHandler']

interface WarnHandlerRecord {
  originalWarnHandler: WarnHandler
  handler: WarnHandler
  count: number
}

const warnHandlerMap = new WeakMap<AppContext, WarnHandlerRecord>()

const createSelectWarnHandler = (appContext: AppContext): WarnHandler => {
  return (...args) => {
    // 覆盖关于 slot 不能在渲染函数之外执行的警告。
    // 我们在下面调用 slot 只是为了在 persist 为 false 时模拟数据，此警告信息应被忽略
    const message = args[0]
    if (
      !message ||
      (message.includes(
        'Slot "default" invoked outside of the render function'
      ) &&
        args[2]?.includes('ElTreeSelect'))
    )
      return
    const original = warnHandlerMap.get(appContext)?.originalWarnHandler
    if (original) {
      original(...args)
      return
    }
    // eslint-disable-next-line no-console
    console.warn(...args)
  }
}

const getWarnHandlerRecord = (appContext: AppContext): WarnHandlerRecord => {
  let record = warnHandlerMap.get(appContext)
  if (!record) {
    record = {
      originalWarnHandler: appContext.config.warnHandler,
      handler: createSelectWarnHandler(appContext),
      count: 0,
    }
    warnHandlerMap.set(appContext, record)
  }
  return record
}
export default defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    ElSelectMenu,
    ElOption,
    ElOptions,
    ElOptionGroup,
    ElTag,
    ElScrollbar,
    ElTooltip,
    ElIcon,
  },
  directives: { ClickOutside },
  props: selectProps,
  emits: selectEmits,

  setup(props, { emit, slots }) {
    const instance = getCurrentInstance()!
    const warnRecord = getWarnHandlerRecord(instance.appContext)
    warnRecord.count += 1
    instance.appContext.config.warnHandler = warnRecord.handler
    const modelValue = computed(() => {
      const { modelValue: rawModelValue, multiple } = props
      const fallback = multiple ? [] : undefined
      // 当它是数组时，我们判断是否为多选。
      // 根据得到的结果
      if (
        props.multiple &&
        props.separator &&
        typeof rawModelValue === 'string'
      ) {
        return rawModelValue ? rawModelValue.split(props.separator) : []
      }
      if (isArray(rawModelValue)) {
        return multiple ? rawModelValue : fallback
      }

      return multiple ? fallback : rawModelValue
    })

    const _props = reactive({
      ...toRefs(props),
      modelValue,
    })

    const selectionEmit = ((event: string, ...args: unknown[]) => {
      if (
        (event === 'update:modelValue' || event === 'change') &&
        props.multiple &&
        props.separator &&
        Array.isArray(args[0])
      ) {
        const values = args[0] as unknown[]
        args[0] = values
          .map((value) =>
            typeof value === 'object' && value !== null
              ? (value as Record<string, unknown>)[props.valueKey]
              : value
          )
          .join(props.separator)
      }
      const dispatch = emit as (event: string, ...args: unknown[]) => void
      dispatch(event, ...args)
    }) as typeof emit

    const API = useSelect(_props, selectionEmit)
    const { calculatorRef, inputStyle } = useCalcInputWidth()
    const { getLabel, getValue, getOptions, getDisabled } = useProps(props)

    const getOptionProps = (option: Record<string, any>) => ({
      label: getLabel(option),
      value: getValue(option),
      disabled: getDisabled(option),
    })

    const flatTreeSelectData = (data: any[]) => {
      return data.reduce((acc, item) => {
        acc.push(item)
        if (item.children && item.children.length > 0) {
          acc.push(...flatTreeSelectData(item.children))
        }
        return acc
      }, [])
    }

    const manuallyRenderSlots = (vnodes: VNode[] | undefined) => {
      // 选项渲染完成后，useSelect 的内部状态可以收集每个选项的值。
      // 如果 persistent 为 false，选项默认不会渲染，因此在这种情况下，
      // 在这里手动渲染并加载选项数据。
      const children = flattedChildren(vnodes || []) as VNode[]
      children.forEach((item) => {
        if (
          isObject(item) &&
          // @ts-expect-error
          (item.type.name === 'ElOption' || item.type.name === 'ElTree')
        ) {
          // @ts-expect-error
          const _name = item.type.name
          if (_name === 'ElTree') {
            // tree-select 组件是一种特殊情况。
            // 因此需要单独处理。
            const treeData = item.props?.data || []
            const flatData = flatTreeSelectData(treeData)
            flatData.forEach((treeItem: any) => {
              treeItem.currentLabel =
                treeItem.label ??
                (isObject(treeItem.value) ? '' : treeItem.value)
              API.onOptionCreate(treeItem)
            })
          } else if (_name === 'ElOption') {
            const obj = { ...item.props } as any
            obj.currentLabel =
              obj.label ?? (isObject(obj.value) ? '' : obj.value)
            API.onOptionCreate(obj)
          }
        }
      })
    }
    watch(
      () => [
        props.persistent || API.expanded.value || !slots.default
          ? undefined
          : slots.default?.(),
        modelValue.value,
      ],
      () => {
        // 当 persistent 为 false 且下拉框关闭时，菜单会被卸载。
        // 我们应始终从 slot 重新加载选项数据，以使标签保持同步
        // 跟随动态选项列表更新。仅当 persistent 为 true 或
        // 下拉框当前展开时才跳过（已挂载的选项会自行管理）。
        if (props.persistent || API.expanded.value) {
          // 如果 persistent 为 true，就不需要手动渲染 slot。
          return
        }
        // 使用 :options prop（无 slot 内容）时，el-option 组件通过
        // onOptionCreate/onOptionDestroy 生命周期钩子自行注册和注销。
        // 在此调用 options.clear() 会过早清除仍在
        // 挂载的选项，在快速切换开/关时造成 "No Data" 闪烁。
        if (!slots.default) {
          return
        }
        // 在重新从 slot 收集之前重置当前选项快照。
        API.states.options.clear()
        manuallyRenderSlots(slots.default?.())
      },
      {
        immediate: true,
      }
    )

    provide(
      selectKey,
      reactive({
        props: _props,
        states: API.states,
        selectRef: API.selectRef,
        optionsArray: API.optionsArray,
        setSelected: API.setSelected,
        handleOptionSelect: API.handleOptionSelect,
        onOptionCreate: API.onOptionCreate,
        onOptionDestroy: API.onOptionDestroy,
      }) as unknown as SelectContext // 避免 TS2589
    )

    const selectedLabel = computed(() => {
      if (!props.multiple) {
        return API.states.selectedLabel
      }
      return API.states.selected.map((i) => i.currentLabel as string)
    })

    onBeforeUnmount(() => {
      // https://github.com/element-plus/element-plus/issues/21279
      const record = warnHandlerMap.get(instance.appContext)
      if (!record) return
      record.count -= 1
      if (record.count <= 0) {
        instance.appContext.config.warnHandler = record.originalWarnHandler
        warnHandlerMap.delete(instance.appContext)
      }
    })

    watch(
      selectedLabel,
      (value) => {
        const label = Array.isArray(value)
          ? value.map((item) => String(item ?? ''))
          : String(value ?? '')
        emit(
          'update:label',
          props.separator && Array.isArray(label)
            ? label.join(props.separator)
            : label
        )
      },
      { immediate: true }
    )

    const inputElement = useInputElement(() => API.inputRef.value)

    return {
      ...API,
      inputElement,
      modelValue,
      selectedLabel,
      calculatorRef,
      inputStyle,
      getLabel,
      getValue,
      getOptions,
      getDisabled,
      getOptionProps,
    }
  },
})
</script>
