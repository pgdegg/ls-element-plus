export const SplitterBarDefaultValueProps = {
  index: {
    type: Number,
    required: true,
  },
  layout: {
    type: String,
    values: ['horizontal', 'vertical'] as const,
    default: 'horizontal',
  },
  resizable: {
    type: Boolean,
    default: true,
  },
  lazy: Boolean,
  startCollapsible: Boolean,
  endCollapsible: Boolean,
} as const
