import {
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  // useSlots,
  watch,
  watchEffect,
} from 'vue'
import { clamp, findLastIndex, get, isEqual, isNil } from 'lodash-unified'
import { useElementSize, useResizeObserver } from '@vueuse/core'
import {
  NOOP,
  ValidateComponentsMap,
  ensureArray,
  getEventCode,
  isArray,
  isClient,
  isFunction,
  isIOS,
  isNumber,
  isObject,
  isPlainObject,
  isUndefined,
  scrollIntoView,
} from '@element-plus/utils'
import {
  CHANGE_EVENT,
  EVENT_CODE,
  MINIMUM_INPUT_WIDTH,
  UPDATE_MODEL_EVENT,
} from '@element-plus/constants'
import {
  useComposition,
  useEmptyValues,
  useFocusController,
  useId,
  useLocale,
  useNamespace,
} from '@element-plus/hooks'
import {
  useFormDisabled,
  useFormItem,
  useFormItemInputId,
  useFormPlaceholder,
  useFormSize,
} from '@element-plus/components/form'

import type { Component } from 'vue'
import type { TooltipInstance } from '@element-plus/components/tooltip'
import type {
  ScrollbarDirection,
  ScrollbarInstance,
} from '@element-plus/components/scrollbar'
import type { SelectEmits, SelectProps } from './select'
import type {
  OptionBasic,
  OptionPublicInstance,
  OptionValue,
  SelectStates,
} from './type'

export const useSelect = (props: SelectProps, emit: SelectEmits) => {
  const { t } = useLocale()
  // const slots = useSlots()
  const contentId = useId()
  const nsSelect = useNamespace('select')
  const nsInput = useNamespace('input')

  const states = reactive<SelectStates>({
    inputValue: '',
    options: new Map(),
    cachedOptions: new Map(),
    optionValues: [], // 选项的排序值
    selected: [],
    collapseItemWidth: 0,
    selectedLabel: '',
    hoveringIndex: -1,
    previousQuery: null,
    inputHovering: false,
    menuVisibleOnFocus: false,
    isBeforeHide: false,
  })

  // 模板 ref
  const selectRef = ref<HTMLElement>()
  const selectionRef = ref<HTMLElement>()
  const tooltipRef = ref<TooltipInstance>()
  const tagTooltipRef = ref<TooltipInstance>()
  const inputRef = ref<HTMLInputElement>()
  const prefixRef = ref<HTMLElement>()
  const suffixRef = ref<HTMLElement>()
  const menuRef = ref<HTMLElement>()
  const tagMenuRef = ref<HTMLElement>()
  const collapseItemRef = ref<HTMLElement>()
  const scrollbarRef = ref<ScrollbarInstance>()
  // 弹出层展开状态的控制器
  const expanded = ref(false)
  const hoverOption = ref()
  const isFilterValueControlled = computed(
    () => !isUndefined(props.filterValue)
  )

  const { form, formItem } = useFormItem()
  const { inputId } = useFormItemInputId(props, {
    formItemContext: formItem,
  })
  const { valueOnClear, isEmptyValue } = useEmptyValues(props)

  const {
    isComposing,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd,
  } = useComposition({
    afterComposition: (e) => onInput(e),
  })

  const selectDisabled = useFormDisabled()

  const { wrapperRef, isFocused, handleBlur } = useFocusController(inputRef, {
    disabled: selectDisabled,
    afterFocus() {
      if (props.automaticDropdown && !expanded.value) {
        expanded.value = true
        states.menuVisibleOnFocus = true
      }
    },
    beforeBlur(event) {
      return (
        tooltipRef.value?.isFocusInsideContent(event) ||
        tagTooltipRef.value?.isFocusInsideContent(event)
      )
    },
    afterBlur() {
      expanded.value = false
      states.menuVisibleOnFocus = false
      if (props.validateEvent) {
        formItem?.validate?.('blur').catch(NOOP)
      }
    },
  })

  const hasModelValue = computed(() => {
    return isArray(props.modelValue)
      ? props.modelValue.length > 0
      : !isEmptyValue(props.modelValue)
  })

  const needStatusIcon = computed(() => form?.statusIcon ?? false)

  const showClearBtn = computed(() => {
    return (
      props.clearable &&
      !selectDisabled.value &&
      hasModelValue.value &&
      (isFocused.value || states.inputHovering)
    )
  })
  const iconComponent = computed(() => props.suffixIcon)
  const iconReverse = computed(() =>
    nsSelect.is('reverse', !!(iconComponent.value && expanded.value))
  )

  const validateState = computed(() => formItem?.validateState || '')
  const validateIcon = computed(
    () =>
      validateState.value &&
      (ValidateComponentsMap[validateState.value] as Component)
  )

  const emptyText = computed(() => {
    if (props.loading) {
      return props.loadingText || t('el.select.loading')
    } else {
      if (
        props.filterable &&
        states.inputValue &&
        states.options.size > 0 &&
        filteredOptionsCount.value === 0
      ) {
        return props.noMatchText || t('el.select.noMatch')
      }
      if (states.options.size === 0) {
        return props.noDataText || t('el.select.noData')
      }
    }
    return null
  })

  const filteredOptionsCount = computed(
    () => optionsArray.value.filter((option) => option.visible).length
  )

  const optionsArray = computed(() => {
    const list = Array.from(states.options.values())
    const newList: OptionPublicInstance[] = []
    states.optionValues.forEach((item) => {
      const index = list.findIndex((i) => i.value === item)
      if (index > -1) {
        newList.push(list[index])
      }
    })
    return newList.length >= list.length ? newList : list
  })

  const cachedOptionsArray = computed(() =>
    Array.from(states.cachedOptions.values())
  )

  const showNewOption = computed(() => {
    const hasExistingOption = optionsArray.value
      .filter((option) => {
        return !option.created
      })
      .some((option) => {
        return option.currentLabel === states.inputValue
      })
    return (
      props.filterable &&
      props.allowCreate &&
      states.inputValue !== '' &&
      !hasExistingOption
    )
  })

  const updateOptions = () => {
    if (props.remote || (props.filterable && isFunction(props.filterMethod)))
      return
    optionsArray.value.forEach((option) => {
      option.updateOption?.(states.inputValue)
    })
  }

  const selectSize = useFormSize()

  const collapseTagSize = computed(() =>
    ['small'].includes(selectSize.value) ? 'small' : 'default'
  )

  const dropdownMenuVisible = computed({
    get() {
      if (!expanded.value) return false
      // 当启用远程模式且开启 remoteShowOnInput 时，
      // 仅在有输入内容时才显示下拉框
      if (props.remote && props.remoteShowOnInput && !states.inputValue.length)
        return false
      return true
    },
    set(val: boolean) {
      expanded.value = val
    },
  })

  const shouldShowPlaceholder = computed(() => {
    if (props.multiple && !isUndefined(props.modelValue)) {
      return ensureArray(props.modelValue).length === 0 && !states.inputValue
    }
    const value = isArray(props.modelValue)
      ? props.modelValue[0]
      : props.modelValue
    return props.filterable || isUndefined(value) ? !states.inputValue : true
  })

  const placeholder = useFormPlaceholder(
    computed(() => t('el.select.placeholder'))
  )
  const currentPlaceholder = computed(() => {
    const _placeholder = placeholder.value
    return props.multiple || !hasModelValue.value
      ? _placeholder
      : states.selectedLabel
  })

  // 当注册了 mouseenter 事件且子节点发生 DOM 变化时，iOS Safari 不会处理 click 事件
  // 我们使用 Vue 自定义事件绑定，仅在非 iOS 设备上注册该事件
  // 参考：https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html
  // GitHub Issue：https://github.com/vuejs/vue/issues/9859
  const mouseEnterEventName = isIOS ? null : 'mouseenter'

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (props.multiple) {
        if (props.filterable && !props.reserveKeyword) {
          states.inputValue = ''
          emit('update:filterValue', '')
          handleQueryChange('')
        }
      }
      setSelected()
      if (!isEqual(val, oldVal) && props.validateEvent) {
        formItem?.validate('change').catch(NOOP)
      }
    },
    {
      flush: 'post',
      deep: true,
    }
  )

  watch(
    () => expanded.value,
    (val) => {
      if (val) {
        if (isFilterValueControlled.value) {
          states.inputValue = props.filterValue!
        }
        handleQueryChange(states.inputValue)
      } else {
        states.inputValue = ''
        states.previousQuery = null
        states.isBeforeHide = true
        states.menuVisibleOnFocus = false
      }
    }
  )

  watch(
    () => props.filterValue,
    (val) => {
      if (
        !props.filterable ||
        !expanded.value ||
        isUndefined(val) ||
        val === states.inputValue
      )
        return

      states.inputValue = val
      states.previousQuery = null
      handleQueryChange(val)
    }
  )

  watch(
    // 修复 `Array.prototype.push/splice/..` 无法触发非深度 watcher 的问题
    // https://github.com/vuejs/vue-next/issues/2116
    () => states.options.entries(),
    () => {
      if (!isClient) return
      // tooltipRef.value?.updatePopper?.()
      setSelected()
      if (shouldDefaultFirstOption()) {
        checkDefaultFirstOption()
        // 选项变化且下拉框打开时，将悬停的
        // 选项（如有选中项则为选中项，否则为第一个选项）滚动到
        // 视野中。用户搜索时忽略此行为。
        if (expanded.value && !states.inputValue.length) {
          scrollToHoveredOption()
        }
      } else if (expanded.value) {
        const firstAvailable = optionsArray.value.findIndex(
          (item) =>
            item.visible && !item.isDisabled && !item.states?.groupDisabled
        )
        if (firstAvailable !== -1) {
          states.hoveringIndex = firstAvailable
        }
      }
    },
    {
      flush: 'post',
    }
  )

  watch([() => states.hoveringIndex, optionsArray], ([val]) => {
    if (isNumber(val) && val > -1) {
      hoverOption.value = optionsArray.value[val] || {}
    } else {
      hoverOption.value = {}
    }
    optionsArray.value.forEach((option) => {
      option.hover = hoverOption.value === option
    })
  })

  watchEffect(() => {
    // 任何因素都可能导致选项变化，随后更新选项
    // 如果想按条件控制，在此处编写
    if (states.isBeforeHide) return
    updateOptions()
  })

  const filterOptionsByMethod = (query: string) => {
    optionsArray.value.forEach((option) => {
      option.visible = props.filterMethod?.(query, option) !== false
    })
  }

  const handleQueryChange = (val: string) => {
    if (states.previousQuery === val || isComposing.value) {
      return
    }
    states.previousQuery = val
    emit('query-change', val)
    if (props.filterable && isFunction(props.filterMethod)) {
      filterOptionsByMethod(val)
    } else if (
      props.filterable &&
      props.remote &&
      isFunction(props.remoteMethod)
    ) {
      props.remoteMethod(val)
    }

    if (props.defaultFirstOption) {
      nextTick(() => {
        if (shouldDefaultFirstOption()) {
          checkDefaultFirstOption()
        } else {
          states.hoveringIndex = -1
        }
      })
    } else {
      nextTick(updateHoveringIndex)
    }
  }

  /**
   * 查找并高亮第一个选项作为默认选中项
   * @remark
   * - 如果下拉列表中的第一个选项是用户创建的，
   *   它会位于 optionsArray 末尾，
   *   因此找到它并设置为悬停。
   *   （注意：带查询词的下拉列表中只能有一个用户创建的选项）
   * - 如果列表中没有用户创建的选项，照常找到第一个即可
   *   （注意：排除禁用选项或禁用分组中的选项）
   */
  const isAvailableOption = (option?: OptionPublicInstance) => {
    return (
      !!option &&
      option.visible &&
      !option.isDisabled &&
      !option.states?.groupDisabled
    )
  }

  const hasAvailableOption = () => {
    return optionsArray.value.some((option) => isAvailableOption(option))
  }

  const shouldDefaultFirstOption = () => {
    return props.defaultFirstOption && hasAvailableOption()
  }

  const getSelectedOptionIndex = () => {
    const length = states.selected.length
    if (length > 0) {
      const lastOption = states.selected[length - 1]
      return optionsArray.value.findIndex(
        (item) => getValueKey(lastOption) === getValueKey(item)
      )
    }
    return -1
  }

  const checkDefaultFirstOption = () => {
    // 当已有选中值时，悬停在选中项上
    // 而不是第一个选项，这样下拉框打开时不会滚动到
    // 第一个选项并聚焦它。
    // 用户搜索时忽略此行为，以便第一个匹配
    // 选项保持悬停状态，等待按 Enter 键选中。
    if (!states.inputValue.length) {
      const selectedIndex = getSelectedOptionIndex()
      if (isAvailableOption(optionsArray.value[selectedIndex])) {
        states.hoveringIndex = selectedIndex
        return
      }
    }

    const optionsInDropdown = optionsArray.value.filter((n) =>
      isAvailableOption(n)
    )
    const userCreatedOption = optionsInDropdown.find((n) => n.created)
    const firstOriginOption = optionsInDropdown[0]
    const targetOption = userCreatedOption || firstOriginOption

    if (!targetOption) {
      states.hoveringIndex = -1
      return
    }

    const valueList = optionsArray.value.map((item) => item.value)
    states.hoveringIndex = getValueIndex(valueList, targetOption)
  }

  const scrollToHoveredOption = () => {
    nextTick(() => scrollToOption(hoverOption.value))
  }

  const setSelected = () => {
    if (!props.multiple) {
      const value = isArray(props.modelValue)
        ? props.modelValue[0]
        : props.modelValue
      const option = getOption(value)
      states.selectedLabel = option.currentLabel
      states.selected = [option]
      return
    } else {
      states.selectedLabel = ''
    }
    const result: SelectStates['selected'] = []
    if (!isUndefined(props.modelValue)) {
      ensureArray(props.modelValue).forEach((value) => {
        result.push(getOption(value))
      })
    }
    states.selected = result
  }

  const getOption = (value: OptionValue) => {
    let option
    const isObjectValue = isPlainObject(value)

    for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
      const cachedOption = cachedOptionsArray.value[i]
      const isEqualValue = isObjectValue
        ? get(cachedOption.value, props.valueKey) === get(value, props.valueKey)
        : cachedOption.value === value
      if (isEqualValue) {
        option = {
          index: optionsArray.value
            .filter((opt) => !opt.created)
            .indexOf(cachedOption),
          value,
          currentLabel: cachedOption.currentLabel,
          get isDisabled() {
            return cachedOption.isDisabled
          },
        }
        break
      }
    }
    if (option) return option

    const existingSelected = states.selected.find((item) =>
      isObjectValue
        ? get(item.value, props.valueKey) === get(value, props.valueKey)
        : item.value === value
    )
    const label = isObjectValue
      ? value.label
      : existingSelected
        ? existingSelected.currentLabel
        : (value ?? '')
    const newOption = {
      index: -1,
      value,
      currentLabel: label,
    }
    return newOption
  }

  const updateHoveringIndex = () => {
    states.hoveringIndex = getSelectedOptionIndex()
  }

  const resetCollapseItemWidth = () => {
    states.collapseItemWidth =
      collapseItemRef.value!.getBoundingClientRect().width
  }

  const updateTooltip = () => {
    tooltipRef.value?.updatePopper?.()
  }

  const { width: tagMenuWidth } = useElementSize(wrapperRef)

  const tagMenuStyle = computed(() => ({
    maxWidth: tagMenuWidth.value > 0 ? `${tagMenuWidth.value}px` : undefined,
  }))

  const updateTagTooltip = () => {
    tagTooltipRef.value?.updatePopper?.()
  }

  const onInputChange = () => {
    if (states.inputValue.length > 0 && !expanded.value) {
      expanded.value = true
    }
    handleQueryChange(states.inputValue)
  }

  const onInput = (event: Event) => {
    states.inputValue = (event.target as HTMLInputElement).value
    emit('update:filterValue', states.inputValue)
    return onInputChange()
  }

  const emitChange = (val: OptionValue | OptionValue[]) => {
    if (!isEqual(props.modelValue, val)) {
      emit(CHANGE_EVENT, val)
    }
  }

  const getLastNotDisabledIndex = (value: OptionValue[]) =>
    findLastIndex(value, (it) => {
      const option = states.cachedOptions.get(it)
      return !option?.disabled && !option?.states.groupDisabled
    })

  const deletePrevTag = (e: KeyboardEvent) => {
    const code = getEventCode(e)
    if (!props.multiple) return
    if (code === EVENT_CODE.delete) return
    if ((e.target as HTMLInputElement).value.length <= 0) {
      const value = ensureArray(props.modelValue).slice()
      const lastNotDisabledIndex = getLastNotDisabledIndex(value)
      if (lastNotDisabledIndex < 0) return
      const removeTagValue = value[lastNotDisabledIndex]
      value.splice(lastNotDisabledIndex, 1)
      emit(UPDATE_MODEL_EVENT, value)
      emitChange(value)
      emit('remove-tag', removeTagValue)
    }
  }

  const deleteTag = (event: MouseEvent, tag: OptionBasic) => {
    const index = states.selected.indexOf(tag)
    if (index > -1 && !selectDisabled.value) {
      const value = ensureArray(props.modelValue).slice()
      value.splice(index, 1)
      emit(UPDATE_MODEL_EVENT, value)
      emitChange(value)
      emit('remove-tag', tag.value)
    }
    event.stopPropagation()
    focus()
  }

  const deleteSelected = (event: Event) => {
    event.stopPropagation()
    const value = props.multiple ? [] : valueOnClear.value
    if (props.multiple) {
      for (const item of states.selected) {
        if (item.isDisabled) value.push(item.value)
      }
    }
    emit(UPDATE_MODEL_EVENT, value)
    emitChange(value)
    states.hoveringIndex = -1
    expanded.value = false
    emit('clear')
    focus()
  }

  const handleOptionSelect = (option: OptionPublicInstance) => {
    if (props.multiple) {
      const value = ensureArray(props.modelValue ?? []).slice()
      const optionIndex = getValueIndex(value, option)
      if (optionIndex > -1) {
        value.splice(optionIndex, 1)
      } else if (
        props.multipleLimit <= 0 ||
        value.length < props.multipleLimit
      ) {
        value.push(option.value)
      }
      emit(UPDATE_MODEL_EVENT, value)
      emitChange(value)
      if (option.created) {
        handleQueryChange('')
      }
      if (props.filterable && (option.created || !props.reserveKeyword)) {
        states.inputValue = ''
        emit('update:filterValue', '')
      }
    } else {
      !isEqual(props.modelValue, option.value) &&
        emit(UPDATE_MODEL_EVENT, option.value)
      emitChange(option.value)
      expanded.value = false
    }
    focus()
    if (expanded.value) return
    nextTick(() => {
      scrollToOption(option)
    })
  }

  const getValueIndex = (arr: OptionValue[], option: OptionPublicInstance) => {
    if (isUndefined(option)) return -1
    if (!isObject(option.value)) return arr.indexOf(option.value)

    return arr.findIndex((item) => {
      return isEqual(get(item, props.valueKey), getValueKey(option))
    })
  }

  const scrollToOption = (
    option:
      OptionPublicInstance | OptionPublicInstance[] | SelectStates['selected']
  ) => {
    const targetOption = isArray(option) ? option[option.length - 1] : option
    let target = null

    if (!isNil(targetOption?.value)) {
      const options = optionsArray.value.filter(
        (item) => item.value === targetOption.value
      )
      if (options.length > 0) {
        target = options[0].$el
      }
    }

    if (tooltipRef.value && target) {
      const menu = tooltipRef.value?.popperRef?.contentRef?.querySelector?.(
        `.${nsSelect.be('dropdown', 'wrap')}`
      )
      if (menu) {
        scrollIntoView(menu as HTMLElement, target)
      }
    }
    scrollbarRef.value?.handleScroll()
  }

  const onOptionCreate = (vm: OptionPublicInstance) => {
    states.options.set(vm.value, vm)
    states.cachedOptions.set(vm.value, vm)
  }

  const onOptionDestroy = (key: OptionValue, vm: OptionPublicInstance) => {
    if (states.options.get(key) === vm) {
      states.options.delete(key)
    }
  }

  const popperRef = computed(() => {
    return tooltipRef.value?.popperRef?.contentRef
  })

  const handleMenuEnter = () => {
    states.isBeforeHide = false
    nextTick(() => {
      scrollbarRef.value?.update()

      if (shouldDefaultFirstOption()) {
        checkDefaultFirstOption()
        scrollToHoveredOption()
        return
      }

      scrollToOption(states.selected)
    })
  }

  const focus = () => {
    inputRef.value?.focus()
  }

  const blur = () => {
    if (expanded.value) {
      expanded.value = false
      nextTick(() => inputRef.value?.blur())
      return
    }
    inputRef.value?.blur()
  }

  const handleClearClick = (event: Event) => {
    deleteSelected(event)
  }

  const handleClickOutside = (event: Event) => {
    expanded.value = false

    if (isFocused.value) {
      const _event = new FocusEvent('blur', event)
      nextTick(() => handleBlur(_event))
    }
  }

  const handleEsc = () => {
    if (states.inputValue.length > 0) {
      states.inputValue = ''
      emit('update:filterValue', '')
    } else {
      expanded.value = false
    }
  }

  const toggleMenu = (event?: Event) => {
    if (
      selectDisabled.value ||
      (props.filterable &&
        expanded.value &&
        event &&
        !suffixRef.value?.contains(event.target as Node))
    )
      return

    // If remote mode is enabled and remoteShowOnInput is true,
    // only allow expanding the dropdown when there is input content
    if (
      props.remote &&
      props.remoteShowOnInput &&
      !(isFilterValueControlled.value ? props.filterValue : states.inputValue)
        ?.length &&
      !expanded.value
    )
      return

    // We only set the inputHovering state to true on mouseenter event on iOS devices
    // To keep the state updated we set it here to true
    if (isIOS) states.inputHovering = true

    if (states.menuVisibleOnFocus) {
      // controlled by automaticDropdown
      states.menuVisibleOnFocus = false
    } else {
      expanded.value = !expanded.value
    }
  }

  const selectOption = () => {
    if (!expanded.value) {
      toggleMenu()
    } else {
      const option = optionsArray.value[states.hoveringIndex]
      if (option && !option.isDisabled) {
        handleOptionSelect(option)
      }
    }
  }

  const getValueKey = (
    item: OptionPublicInstance | SelectStates['selected'][0]
  ) => {
    return isObject(item.value) ? get(item.value, props.valueKey) : item.value
  }

  const optionsAllDisabled = computed(() =>
    optionsArray.value
      .filter((option) => option.visible)
      .every((option) => option.isDisabled)
  )

  const showTagList = computed(() => {
    if (!props.multiple) {
      return []
    }
    return props.collapseTags
      ? states.selected.slice(0, props.maxCollapseTags)
      : states.selected
  })

  const collapseTagList = computed(() => {
    if (!props.multiple) {
      return []
    }
    return props.collapseTags
      ? states.selected.slice(props.maxCollapseTags)
      : []
  })

  const navigateOptions = (direction: 'prev' | 'next') => {
    if (!expanded.value) {
      expanded.value = true
      return
    }
    if (
      states.options.size === 0 ||
      filteredOptionsCount.value === 0 ||
      isComposing.value
    )
      return

    if (!optionsAllDisabled.value) {
      if (direction === 'next') {
        states.hoveringIndex++
        if (states.hoveringIndex === states.options.size) {
          states.hoveringIndex = 0
        }
      } else if (direction === 'prev') {
        states.hoveringIndex--
        if (states.hoveringIndex < 0) {
          states.hoveringIndex = states.options.size - 1
        }
      }
      const option = optionsArray.value[states.hoveringIndex]
      if (option.isDisabled || !option.visible) {
        navigateOptions(direction)
      }
      nextTick(() => scrollToOption(hoverOption.value))
    }
  }

  const findFocusableIndex = (
    arr: any[],
    start: number,
    step: number,
    len: number
  ) => {
    for (let i = start; i >= 0 && i < len; i += step) {
      const obj = arr[i]
      if (!obj?.isDisabled && obj?.visible) {
        return i
      }
    }
    return null
  }

  const focusOption = (targetIndex: number, mode: 'up' | 'down') => {
    const len = states.options.size
    if (len === 0) return
    const start = clamp(targetIndex, 0, len - 1)
    const options = optionsArray.value
    const direction = mode === 'up' ? -1 : 1
    const newIndex =
      findFocusableIndex(options, start, direction, len) ??
      findFocusableIndex(options, start - direction, -direction, len)

    if (newIndex != null) {
      states.hoveringIndex = newIndex
      nextTick(() => scrollToOption(hoverOption.value))
    }
  }

  const handleKeydown = (e: KeyboardEvent) => {
    const code = getEventCode(e)
    let isPreventDefault = true
    switch (code) {
      case EVENT_CODE.up:
        navigateOptions('prev')
        break
      case EVENT_CODE.down:
        navigateOptions('next')
        break
      case EVENT_CODE.enter:
      case EVENT_CODE.numpadEnter:
        if (!isComposing.value) {
          selectOption()
        }
        break
      case EVENT_CODE.esc:
        handleEsc()
        break
      case EVENT_CODE.backspace:
        isPreventDefault = false
        deletePrevTag(e)
        return
      case EVENT_CODE.home:
        if (!expanded.value) return
        focusOption(0, 'down')
        break
      case EVENT_CODE.end:
        if (!expanded.value) return
        focusOption(states.options.size - 1, 'up')
        break
      case EVENT_CODE.pageUp:
        if (!expanded.value) return
        focusOption(states.hoveringIndex - 10, 'up')
        break
      case EVENT_CODE.pageDown:
        if (!expanded.value) return
        focusOption(states.hoveringIndex + 10, 'down')
        break
      default:
        isPreventDefault = false
        break
    }
    if (isPreventDefault) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const getGapWidth = () => {
    if (!selectionRef.value) return 0
    const style = window.getComputedStyle(selectionRef.value)
    return Number.parseFloat(style.gap || '6px')
  }

  // computed style
  const tagStyle = computed(() => {
    const gapWidth = getGapWidth()
    const inputSlotWidth =
      props.filterable && !selectDisabled.value
        ? gapWidth + MINIMUM_INPUT_WIDTH
        : 0
    const collapseSlotWidth =
      collapseItemRef.value && props.maxCollapseTags === 1
        ? states.collapseItemWidth + gapWidth
        : 0
    const reservedWidth = inputSlotWidth + collapseSlotWidth
    return { maxWidth: `calc(100% - ${reservedWidth}px)` }
  })

  const popupScroll = (data: { scrollTop: number; scrollLeft: number }) => {
    emit('popup-scroll', data)
  }

  const endReached = (direction: ScrollbarDirection) => {
    emit('end-reached', direction)
  }

  useResizeObserver(wrapperRef, updateTooltip)
  useResizeObserver(tagMenuRef, updateTagTooltip)
  useResizeObserver(collapseItemRef, resetCollapseItemWidth)

  // #21498
  let stop: (() => void) | undefined
  watch(
    () => dropdownMenuVisible.value,
    (newVal) => {
      if (newVal) {
        stop = useResizeObserver(menuRef, updateTooltip).stop
      } else {
        stop?.()
        stop = undefined
      }
      emit('visible-change', newVal)
    }
  )

  onMounted(() => {
    setSelected()
  })

  return {
    inputId,
    contentId,
    nsSelect,
    nsInput,
    states,
    isFocused,
    expanded,
    optionsArray,
    hoverOption,
    selectSize,
    filteredOptionsCount,
    updateTooltip,
    updateTagTooltip,
    onInput,
    deletePrevTag,
    deleteTag,
    deleteSelected,
    handleOptionSelect,
    scrollToOption,
    hasModelValue,
    shouldShowPlaceholder,
    currentPlaceholder,
    mouseEnterEventName,
    needStatusIcon,
    showClearBtn,
    iconComponent,
    iconReverse,
    validateState,
    validateIcon,
    showNewOption,
    updateOptions,
    collapseTagSize,
    setSelected,
    selectDisabled,
    emptyText,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd,
    handleKeydown,
    onOptionCreate,
    onOptionDestroy,
    handleMenuEnter,
    focus,
    blur,
    handleClearClick,
    handleClickOutside,
    handleEsc,
    toggleMenu,
    selectOption,
    getValueKey,
    navigateOptions,
    dropdownMenuVisible,
    showTagList,
    collapseTagList,
    popupScroll,
    getOption,
    endReached,

    // computed style
    tagStyle,

    // DOM ref
    popperRef,
    inputRef,
    tooltipRef,
    tagTooltipRef,
    prefixRef,
    suffixRef,
    selectRef,
    wrapperRef,
    selectionRef,
    scrollbarRef,
    menuRef,
    tagMenuRef,
    tagMenuStyle,
    collapseItemRef,
  }
}
