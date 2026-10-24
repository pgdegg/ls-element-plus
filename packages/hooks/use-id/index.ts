import { getCurrentInstance, inject, unref } from 'vue'
import { computedEager } from '@vueuse/core'
import { debugWarn, isClient } from '@element-plus/utils'
import { useGetDerivedNamespace } from '../use-namespace'

import type { InjectionKey, MaybeRef, Ref } from 'vue'

export type ElIdInjectionContext = {
  prefix: number
  current: number
}

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
}

export const ID_INJECTION_KEY: InjectionKey<ElIdInjectionContext> =
  Symbol('elIdInjection')

export const useIdInjection = (): ElIdInjectionContext => {
  return getCurrentInstance()
    ? inject(ID_INJECTION_KEY, defaultIdInjection)
    : defaultIdInjection
}

export const useId = (deterministicId?: MaybeRef<string>): Ref<string> => {
  const idInjection = useIdInjection()
  if (!isClient && idInjection === defaultIdInjection) {
    debugWarn(
      'IdInjection',
      `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`
    )
  }

  const namespace = useGetDerivedNamespace()

  // 注意：此处使用 `computedEager` 立即计算 id 值，避免服务端渲染时因 `computed` 的惰性特性导致 id 生成不一致。
  const idRef = computedEager(
    () =>
      unref(deterministicId) ||
      `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`
  )

  return idRef
}
