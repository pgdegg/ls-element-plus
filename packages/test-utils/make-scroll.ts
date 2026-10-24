import sleep from './sleep'

const makeScroll = (
  dom: Element,
  name: 'scrollTop' | 'scrollLeft',
  offset: number
) => {
  const eventTarget = dom === document.documentElement ? window : dom
  dom[name] = offset
  const evt = new CustomEvent('scroll', {
    detail: {
      target: {
        [name]: offset,
      },
    },
  })
  eventTarget.dispatchEvent(evt)
  // 必须使用 setTimeout 而非 nextTick 来等待 DOM 更新
  return sleep()
}

export default makeScroll
