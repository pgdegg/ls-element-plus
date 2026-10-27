import { describe, expect, it } from 'vitest'
import * as components from '../index'
import * as hooks from '@element-plus/hooks'
import * as utils from '@element-plus/utils'

const retiredExports = [
  'affixProps',
  'alertProps',
  'anchorLinkProps',
  'anchorProps',
  'autocompleteProps',
  'avatarProps',
  'backtopProps',
  'badgeProps',
  'breadcrumbItemProps',
  'breadcrumbProps',
  'buttonGroupProps',
  'buttonProps',
  'calendarProps',
  'dateTableProps',
  'selectControllerProps',
  'cardProps',
  'carouselItemProps',
  'carouselProps',
  'cascaderPanelProps',
  'cascaderProps',
  'checkTagProps',
  'checkboxGroupProps',
  'checkboxProps',
  'colProps',
  'collapseItemProps',
  'collapseProps',
  'colorPickerPanelProps',
  'predefineProps',
  'alphaSliderProps',
  'hueSliderProps',
  'svPanelProps',
  'colorPickerProps',
  'countdownProps',
  'descriptionProps',
  'descriptionsRowProps',
  'dialogContentProps',
  'dialogProps',
  'dividerProps',
  'drawerProps',
  'emptyProps',
  'formItemProps',
  'formMetaProps',
  'formProps',
  'iconProps',
  'imageViewerProps',
  'imageProps',
  'inputNumberProps',
  'inputTagProps',
  'inputProps',
  'linkProps',
  'mentionDropdownProps',
  'mentionProps',
  'menuItemGroupProps',
  'menuItemProps',
  'messageProps',
  'notificationProps',
  'pageHeaderProps',
  'popconfirmProps',
  'popoverProps',
  'popperArrowProps',
  'usePopperArrowProps',
  'popperCoreConfigProps',
  'popperContentProps',
  'usePopperCoreConfigProps',
  'usePopperContentProps',
  'usePopperContentEmits',
  'popperProps',
  'usePopperProps',
  'popperTriggerProps',
  'usePopperTriggerProps',
  'progressProps',
  'radioButtonProps',
  'radioGroupProps',
  'radioPropsBase',
  'radioProps',
  'rateProps',
  'resultProps',
  'rowProps',
  'barProps',
  'scrollbarProps',
  'thumbProps',
  'segmentedProps',
  'skeletonItemProps',
  'skeletonProps',
  'splitterPanelProps',
  'splitterProps',
  'statisticProps',
  'stepProps',
  'stepsProps',
  'switchProps',
  'tableColumnProps',
  'tableProps',
  'tabBarProps',
  'tabPaneProps',
  'tagProps',
  'textProps',
  'timePickerRngeTriggerProps',
  'timeSelectProps',
  'timelineItemProps',
  'useTooltipContentProps',
  'useTooltipProps',
  'useTooltipTriggerProps',
  'tourContentProps',
  'maskProps',
  'tourStepProps',
  'tourProps',
  'transferPanelProps',
  'transferProps',
  'treeNodeProps',
  'uploadContentProps',
  'uploadDraggerProps',
  'uploadListProps',
  'uploadListTypes',
  'uploadBaseProps',
  'uploadProps',
  'watermarkProps',
  'ariaProps',
  'useDelayedToggleProps',
  'useEmptyValuesProps',
  'isKorean',
  'generateId',
  'getRandomInt',
  'useSize',
  'useDisabled',
  'ElInfiniteScroll',
  'ElPopoverDirective',
]

const internalDefinitions = retiredExports
  .filter(
    (name) =>
      name.endsWith('Props') ||
      name === 'radioPropsBase' ||
      name === 'uploadListTypes'
  )
  .map((name) =>
    name === 'radioPropsBase'
      ? 'radioBasePropDefs'
      : name === 'uploadListTypes'
        ? 'uploadListTypeValues'
        : name
            .replace(/^use(?=[A-Z])/, '')
            .replace(/^./, (letter) => letter.toLowerCase())
            .replace(/Props$/, 'PropDefs')
  )
internalDefinitions.push('treePropDefs')

describe('supported public exports', () => {
  it('does not re-export retired runtime definitions, aliases, utilities, or directives', () => {
    for (const name of [...retiredExports, ...internalDefinitions]) {
      expect(components).not.toHaveProperty(name)
      expect(hooks).not.toHaveProperty(name)
      expect(utils).not.toHaveProperty(name)
    }
  })

  it('keeps current component and form hook entry points', () => {
    expect(components.ElButton).toBeDefined()
    expect(components.ElScrollbar).toBeDefined()
    expect(components.ElPopover).toBeDefined()
    expect(components.ElPopover).not.toHaveProperty('directive')
    expect(components.useTooltipModelToggle).toBeTypeOf('function')
    expect(components.useTooltipModelToggleEmits).toBeDefined()
    expect(components.useTooltipModelToggleProps).toBeDefined()
    expect(components.useFormSize).toBeTypeOf('function')
    expect(components.useFormDisabled).toBeTypeOf('function')
  })
})
