import { nextTick } from 'vue'

const tick = async (times: number) => {
  while (times--) {
    await nextTick()
  }
}

export default tick

// 为了测试 transition，我们需要使用
// 在触发 transition 事件后 await rAF()。
export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(res)
    })
  })
}
