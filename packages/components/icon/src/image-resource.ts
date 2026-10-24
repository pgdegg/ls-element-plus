// Symbols are shared by every icon instance. Keep one loading task per resource
// so mounting another instance after the load event does not leave it waiting.
const resources = new WeakMap<
  SVGElement,
  {
    source: string
    loaded: Promise<boolean>
  }
>()

export const loadIconImage = (resource: SVGElement) => {
  const source = resource.dataset.src
  if (!source) return Promise.resolve(true)
  const cached = resources.get(resource)
  if (cached?.source === source) return cached.loaded

  const loaded = new Promise<boolean>((resolve) => {
    const finish = (success: boolean) => {
      resource.removeEventListener('load', onLoad)
      resource.removeEventListener('error', onError)
      resolve(success)
    }
    const onLoad = () => finish(true)
    const onError = () => finish(false)
    resource.addEventListener('load', onLoad)
    resource.addEventListener('error', onError)
    resource.setAttribute('href', source)
  })
  resources.set(resource, { source, loaded })
  return loaded
}
