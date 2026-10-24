import { computed, onBeforeMount } from 'vue'
import { isClient } from '@element-plus/utils'
import { useGetDerivedNamespace } from '../use-namespace'
import { useIdInjection } from '../use-id'

export const usePopperContainerId = () => {
  const namespace = useGetDerivedNamespace()
  const idInjection = useIdInjection()

  const id = computed(() => {
    return `${namespace.value}-popper-container-${idInjection.prefix}`
  })
  const selector = computed(() => `#${id.value}`)

  return {
    id,
    selector,
  }
}

const createContainer = (id: string) => {
  const container = document.createElement('div')
  container.id = id
  document.body.appendChild(container)
  return container
}

export const usePopperContainer = () => {
  const { id, selector } = usePopperContainerId()
  onBeforeMount(() => {
    if (!isClient) return

    // 这是为了绕过测试环境下经常遇到的错误
    // 即 document.body.innerHTML = '' 的场景
    // 因此我们需要禁用缓存，因为它并非真正必需
    if (
      process.env.NODE_ENV === 'test' ||
      !document.body.querySelector(selector.value)
    ) {
      createContainer(id.value)
    }
  })

  return {
    id,
    selector,
  }
}
