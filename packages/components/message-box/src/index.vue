<template>
  <transition name="fade-in-linear" @after-leave="$emit('vanish')">
    <el-overlay
      v-show="visible"
      :z-index="zIndex"
      :overlay-class="[ns.is('message-box'), modalClass]"
      :mask="modal"
    >
      <div
        role="dialog"
        :aria-label="title"
        aria-modal="true"
        :aria-describedby="!showInput ? contentId : undefined"
        :class="`${ns.namespace.value}-overlay-message-box`"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <el-focus-trap
          loop
          :trapped="visible"
          :focus-trap-el="rootRef"
          :focus-start-el="focusStartRef"
          @release-requested="onCloseRequested"
        >
          <div
            ref="rootRef"
            :class="[
              ns.b(),
              customClass,
              ns.is('draggable', draggable),
              ns.is('dragging', isDragging),
              { [ns.m('center')]: center },
            ]"
            :style="customStyle"
            tabindex="-1"
            @click.stop=""
          >
            <div
              v-if="title !== null && title !== undefined"
              ref="headerRef"
              :class="[ns.e('header'), { 'show-close': showClose }]"
            >
              <div :class="ns.e('title')">
                <el-icon
                  v-if="iconComponent && center"
                  :class="[ns.e('status'), typeClass]"
                >
                  <component :is="iconComponent" />
                </el-icon>
                <span>{{ title }}</span>
              </div>
              <button
                v-if="showClose"
                type="button"
                :class="ns.e('headerbtn')"
                :aria-label="t('el.messagebox.close')"
                @click="
                  handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
                "
                @keydown.prevent.enter="
                  handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
                "
              >
                <el-icon :class="ns.e('close')">
                  <component :is="closeIcon || 'close'" />
                </el-icon>
              </button>
            </div>
            <div :id="contentId" :class="ns.e('content')">
              <div :class="ns.e('container')">
                <el-icon
                  v-if="iconComponent && !center && hasMessage"
                  :class="[ns.e('status'), typeClass]"
                >
                  <component :is="iconComponent" />
                </el-icon>
                <div v-if="hasMessage" :class="ns.e('message')">
                  <slot>
                    <component
                      :is="showInput ? 'label' : 'p'"
                      v-if="!dangerouslyUseHTMLString"
                      :for="showInput ? inputId : undefined"
                      v-text="message"
                    />
                    <component
                      :is="showInput ? 'label' : 'p'"
                      v-else
                      :for="showInput ? inputId : undefined"
                      v-html="message"
                    />
                  </slot>
                </div>
              </div>
              <div v-show="showInput" :class="ns.e('input')">
                <el-input
                  :id="inputId"
                  ref="inputRef"
                  v-model="inputValue"
                  :type="inputType"
                  :placeholder="inputPlaceholder"
                  :aria-invalid="validateError"
                  :class="{ invalid: validateError }"
                  @keydown.enter="handleInputEnter"
                />
                <div
                  :class="ns.e('errormsg')"
                  :style="{
                    visibility: !!editorErrorMessage ? 'visible' : 'hidden',
                  }"
                >
                  {{ editorErrorMessage }}
                </div>
              </div>
            </div>
            <div
              v-if="showCancelButton || showConfirmButton"
              :class="ns.e('btns')"
            >
              <el-button
                v-if="showCancelButton"
                :type="cancelButtonType === 'text' ? '' : cancelButtonType"
                :text="cancelButtonType === 'text'"
                :loading="cancelButtonLoading"
                :loading-icon="cancelButtonLoadingIcon"
                :class="[cancelButtonClass]"
                :round="roundButton"
                :size="btnSize"
                @click="handleAction('cancel')"
                @keydown.prevent.enter="handleAction('cancel')"
              >
                {{ cancelButtonText || t('el.messagebox.cancel') }}
              </el-button>
              <el-button
                v-show="showConfirmButton"
                ref="confirmRef"
                :type="confirmButtonType === 'text' ? '' : confirmButtonType"
                :text="confirmButtonType === 'text'"
                :loading="confirmButtonLoading"
                :loading-icon="confirmButtonLoadingIcon"
                :class="[confirmButtonClasses]"
                :round="roundButton"
                :disabled="confirmButtonDisabled"
                :size="btnSize"
                @click="handleAction('confirm')"
                @keydown.prevent.enter="handleAction('confirm')"
              >
                {{ confirmButtonText || t('el.messagebox.confirm') }}
              </el-button>
            </div>
          </div>
        </el-focus-trap>
      </div>
    </el-overlay>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import ElButton from '@element-plus/components/button'
import { TrapFocus } from '@element-plus/directives'
import {
  useDraggable,
  useId,
  useLockscreen,
  useSameTarget,
} from '@element-plus/hooks'
import ElInput from '@element-plus/components/input'
import { ElOverlay } from '@element-plus/components/overlay'
import {
  TypeComponents,
  TypeComponentsMap,
  isFunction,
  isString,
  isValidComponentSize,
} from '@element-plus/utils'
import { ElIcon } from '@element-plus/components/icon'
import { Loading } from '@element-plus/icons-vue'
import ElFocusTrap from '@element-plus/components/focus-trap'
import { useGlobalComponentSettings } from '@element-plus/components/config-provider'

import type { ComponentPublicInstance, PropType } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type {
  Action,
  MessageBoxState,
  MessageBoxType,
} from './message-box.type'
import type { InputInstance } from '@element-plus/components/input'

export default defineComponent({
  name: 'ElMessageBox',
  directives: {
    TrapFocus,
  },
  components: {
    ElButton,
    ElFocusTrap,
    ElInput,
    ElOverlay,
    ElIcon,
    ...TypeComponents,
  },
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    closeOnHashChange: {
      type: Boolean,
      default: true,
    },
    center: Boolean,
    draggable: Boolean,
    overflow: Boolean,
    roundButton: Boolean,
    container: {
      type: String, // 默认追加到 body
      default: 'body',
    },
    boxType: {
      type: String as PropType<MessageBoxType>,
      default: '',
    },
  },
  emits: ['vanish', 'action'],
  setup(props, { emit }) {
    // const popup = usePopup(props, doClose)
    const {
      locale,
      zIndex,
      ns,
      size: btnSize,
    } = useGlobalComponentSettings(
      'message-box',
      computed(() => props.buttonSize)
    )

    const { t } = locale
    const { nextZIndex } = zIndex

    const visible = ref(false)
    // s 表示 state
    const state = reactive<MessageBoxState>({
      // 打开 message-box 时自动聚焦元素
      autofocus: true,
      beforeClose: null,
      callback: null,
      cancelButtonText: '',
      cancelButtonClass: '',
      confirmButtonText: '',
      confirmButtonClass: '',
      cancelButtonType: '',
      confirmButtonType: 'primary',
      customClass: '',
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      icon: '',
      closeIcon: '',
      inputPattern: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputValue: '',
      inputValidator: undefined,
      inputErrorMessage: '',
      message: '',
      modalFade: true,
      modalClass: '',
      showCancelButton: false,
      showConfirmButton: true,
      type: '',
      title: undefined,
      showInput: false,
      action: '' as Action,
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonLoadingIcon: markRaw(Loading),
      cancelButtonLoadingIcon: markRaw(Loading),
      confirmButtonDisabled: false,
      editorErrorMessage: '',
      // 参见：https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
      // 目前没有此状态似乎也可以。
      // isOnComposition: false, // temporary remove
      validateError: false,
      zIndex: nextZIndex(),
    })

    const typeClass = computed(() => {
      const type = state.type
      return { [ns.bm('icon', type)]: type && TypeComponentsMap[type] }
    })

    const contentId = useId()
    const inputId = useId()

    const iconComponent = computed(() => {
      const type = state.type
      return state.icon || (type && TypeComponentsMap[type]) || ''
    })
    const hasMessage = computed(() => !!state.message)
    const rootRef = ref<HTMLElement>()
    const headerRef = ref<HTMLElement>()
    const focusStartRef = ref<HTMLElement>()
    const inputRef = ref<InputInstance>()
    const confirmRef = ref<ComponentPublicInstance>()

    const confirmButtonClasses = computed(() => state.confirmButtonClass)

    watch(
      () => state.inputValue,
      async (val) => {
        await nextTick()
        if (props.boxType === 'prompt' && val) {
          validate()
        }
      },
      { immediate: true }
    )

    watch(
      () => visible.value,
      (val) => {
        if (val) {
          if (props.boxType !== 'prompt') {
            if (state.autofocus) {
              focusStartRef.value = confirmRef.value?.$el ?? rootRef.value
            } else {
              focusStartRef.value = rootRef.value
            }
          }
          state.zIndex = nextZIndex()
        }
        if (props.boxType !== 'prompt') return
        if (val) {
          nextTick().then(() => {
            if (inputRef.value && inputRef.value.$el) {
              if (state.autofocus) {
                focusStartRef.value = getInputElement() ?? rootRef.value
              } else {
                focusStartRef.value = rootRef.value
              }
            }
          })
        } else {
          state.editorErrorMessage = ''
          state.validateError = false
        }
      }
    )

    const draggable = computed(() => props.draggable)
    const overflow = computed(() => props.overflow)
    const { isDragging } = useDraggable(rootRef, headerRef, draggable, overflow)

    onMounted(async () => {
      await nextTick()
      if (props.closeOnHashChange) {
        window.addEventListener('hashchange', doClose)
      }
    })

    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        window.removeEventListener('hashchange', doClose)
      }
    })

    function doClose() {
      if (!visible.value) return
      visible.value = false
      nextTick(() => {
        if (state.action) emit('action', state.action)
      })
    }

    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? 'close' : 'cancel')
      }
    }

    const overlayEvent = useSameTarget(handleWrapperClick)

    const handleInputEnter = (e: KeyboardEvent | Event) => {
      if (state.inputType !== 'textarea' && !inputRef.value?.isComposing) {
        e.preventDefault()
        return handleAction('confirm')
      }
    }

    const handleAction = (action: Action) => {
      if (props.boxType === 'prompt' && action === 'confirm' && !validate()) {
        return
      }

      state.action = action

      if (state.beforeClose) {
        state.beforeClose?.(action, state, doClose)
      } else {
        doClose()
      }
    }

    const validate = () => {
      if (props.boxType === 'prompt') {
        const inputPattern = state.inputPattern
        if (inputPattern && !inputPattern.test(state.inputValue || '')) {
          state.editorErrorMessage =
            state.inputErrorMessage || t('el.messagebox.error')
          state.validateError = true
          return false
        }
        const inputValidator = state.inputValidator
        if (isFunction(inputValidator)) {
          const validateResult = inputValidator(state.inputValue)
          if (validateResult === false) {
            state.editorErrorMessage =
              state.inputErrorMessage || t('el.messagebox.error')
            state.validateError = true
            return false
          }
          if (isString(validateResult)) {
            state.editorErrorMessage = validateResult
            state.validateError = true
            return false
          }
        }
      }
      state.editorErrorMessage = ''
      state.validateError = false
      return true
    }

    const getInputElement = () => {
      const inputRefs = inputRef.value?.$refs
      return (inputRefs?.input ?? inputRefs?.textarea) as HTMLElement
    }

    const handleClose = () => {
      handleAction('close')
    }

    // 当按 ESC 关闭被禁用时，按 ESC 不应唤起
    // 任何其他 message box，并关闭其他对话框类元素
    // 例如 Dialog 有按 ESC 关闭的功能，关闭时会调用
    // props.beforeClose 方法，通过唤起 message box 形成中间状态
    // 用于某些校验或提醒。那么如果我们允许此类全局事件
    // 派发，就可能唤起另一个 message box。
    const onCloseRequested = () => {
      if (props.closeOnPressEscape) {
        handleClose()
      }
    }

    // 锁定屏幕以防止滚动
    if (props.lockScroll) {
      useLockscreen(visible, { ns })
    }

    return {
      ...toRefs(state),
      ns,
      overlayEvent,
      visible,
      hasMessage,
      typeClass,
      contentId,
      inputId,
      btnSize,
      iconComponent,
      confirmButtonClasses,
      rootRef,
      focusStartRef,
      headerRef,
      inputRef,
      isDragging,
      confirmRef,
      doClose, // 供外部使用
      handleClose, // 供外部使用
      onCloseRequested,
      handleWrapperClick,
      handleInputEnter,
      handleAction,
      t,
    }
  },
})
</script>
