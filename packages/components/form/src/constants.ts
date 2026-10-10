import type { InjectionKey, MaybeRef } from 'vue'
import type { FormContext, FormItemContext } from './types'

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext | undefined> =
  Symbol('formItemContextKey')

export const componentDisabledContextKey: InjectionKey<MaybeRef<boolean>> =
  Symbol('componentDisabledContextKey')
