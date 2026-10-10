import { computed, toValue } from 'vue'

import type { MaybeRefOrGetter } from 'vue'

export type ContentStyleTarget = 'value' | 'label' | 'placeholder'
export type ContentStyleTargets =
  ContentStyleTarget | ContentStyleTarget[] | undefined

/** Classes shared by input, selection and form controls. */
export function useContentStyle(
  highlight: MaybeRefOrGetter<ContentStyleTargets>,
  zoom: MaybeRefOrGetter<ContentStyleTargets>
) {
  const classes = (value: ContentStyleTargets, prefix: string) =>
    (Array.isArray(value) ? value : value ? [value] : [])
      .map((target) => `${prefix}__${target}`)
      .join(' ')
  return {
    highlightText: computed(() => classes(toValue(highlight), 'bold-content')),
    zoomText: computed(() => classes(toValue(zoom), 'zoom-content')),
  }
}
