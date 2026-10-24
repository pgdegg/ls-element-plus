import type { CSSProperties } from 'vue'

/** 将驼峰字符串转为小写并用 Separator 连接*/
export function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function getStyleStr(style: CSSProperties): string {
  return Object.keys(style)
    .map(
      (key) =>
        `${toLowercaseSeparator(key)}: ${style[key as keyof CSSProperties]};`
    )
    .join(' ')
}

/** 返回设备物理像素分辨率与 css 像素分辨率的比值*/
export function getPixelRatio() {
  return window.devicePixelRatio || 1
}

/** 是否重新渲染水印*/
export const reRendering = (
  mutation: MutationRecord,
  watermarkElement?: HTMLElement
) => {
  let flag = false
  // 是否删除水印节点
  if (mutation.removedNodes.length && watermarkElement) {
    flag = Array.from(mutation.removedNodes).includes(watermarkElement)
  }
  // 水印 dom 属性值是否已被修改
  if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
    flag = true
  }
  return flag
}
