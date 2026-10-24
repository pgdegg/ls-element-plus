export default {
  name: 'bg',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Изчисти',
      defaultLabel: 'color picker', // 待翻译
      description:
        'current color is {color}. press enter to select a new color.', // 待翻译
      alphaLabel: 'pick alpha value', // 待翻译
      alphaDescription: 'alpha {alpha}, current color is {color}', // 待翻译
      hueLabel: 'pick hue value', // 待翻译
      hueDescription: 'hue {hue}, current color is {color}', // 待翻译
      svLabel: 'pick saturation and brightness value', // 待翻译
      svDescription:
        'saturation {saturation}, brightness {brightness}, current color is {color}', // 待翻译
      predefineDescription: 'select {value} as the color', // 待翻译
    },
    datepicker: {
      now: 'Сега',
      today: 'Днес',
      cancel: 'Откажи',
      clear: 'Изчисти',
      confirm: 'ОК',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Избери дата',
      selectTime: 'Избери час',
      startDate: 'Начална дата',
      startTime: 'Начален час',
      endDate: 'Крайна дата',
      endTime: 'Краен час',
      prevYear: 'Previous Year', // 待翻译
      nextYear: 'Next Year', // 待翻译
      prevMonth: 'Previous Month', // 待翻译
      nextMonth: 'Next Month', // 待翻译
      year: '',
      month1: 'Януари',
      month2: 'Февруари',
      month3: 'Март',
      month4: 'Април',
      month5: 'Май',
      month6: 'Юни',
      month7: 'Юли',
      month8: 'Август',
      month9: 'Септември',
      month10: 'Октомври',
      month11: 'Ноември',
      month12: 'Декември',
      weeks: {
        sun: 'Нед',
        mon: 'Пон',
        tue: 'Вто',
        wed: 'Сря',
        thu: 'Чет',
        fri: 'Пет',
        sat: 'Съб',
      },
      weeksFull: {
        sun: 'Sunday', // 待翻译
        mon: 'Monday', // 待翻译
        tue: 'Tuesday', // 待翻译
        wed: 'Wednesday', // 待翻译
        thu: 'Thursday', // 待翻译
        fri: 'Friday', // 待翻译
        sat: 'Saturday', // 待翻译
      },
      months: {
        jan: 'Яну',
        feb: 'Фев',
        mar: 'Мар',
        apr: 'Апр',
        may: 'Май',
        jun: 'Юни',
        jul: 'Юли',
        aug: 'Авг',
        sep: 'Сеп',
        oct: 'Окт',
        nov: 'Ное',
        dec: 'Дек',
      },
    },
    input: {
      characters: '{count} / {max} символа',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Зареждане',
      noMatch: 'Няма намерени',
      noData: 'Няма данни',
      placeholder: 'Избери',
    },
    mention: {
      loading: 'Зареждане',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Няма намерени',
      loading: 'Зареждане',
      placeholder: 'Избери',
      noData: 'Няма данни',
    },
    pagination: {
      goto: 'Иди на',
      pagesize: '/страница',
      total: 'Общо {total}',
      pageClassifier: '',
      page: 'Page', // 待翻译
      prev: 'Go to previous page', // 待翻译
      next: 'Go to next page', // 待翻译
      currentPage: 'page {pager}', // 待翻译
      prevPages: 'Previous {pager} pages', // 待翻译
      nextPages: 'Next {pager} pages', // 待翻译
      deprecationWarning:
        'Deprecated usages detected, please refer to the el-pagination documentation for more details', // 待翻译
    },
    dialog: {
      close: 'Close this dialog', // 待翻译
    },
    drawer: {
      close: 'Close this dialog', // 待翻译
    },
    messagebox: {
      title: 'Съобщение',
      confirm: 'ОК',
      cancel: 'Откажи',
      error: 'Невалидни данни',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'press delete to remove', // 待翻译
      delete: 'Изтрий',
      preview: 'Прегледай',
      continue: 'Продължи',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Няма данни',
      confirmFilter: 'Потвърди',
      resetFilter: 'Изчисти',
      clearFilter: 'Всички',
      sumText: 'Sum', // 待翻译
      selectAllLabel: 'Select all rows', // 待翻译
      selectRowLabel: 'Select this row', // 待翻译
      expandRowLabel: 'Expand this row', // 待翻译
      collapseRowLabel: 'Collapse this row', // 待翻译
      sortLabel: 'Sort by {column}', // 待翻译
      filterLabel: 'Filter by {column}', // 待翻译
    },
    tag: {
      close: 'Close this tag', // 待翻译
    },
    tour: {
      next: 'Next', // 待翻译
      previous: 'Previous', // 待翻译
      finish: 'Finish', // 待翻译
      close: 'Close this dialog', // 待翻译
    },
    tree: {
      emptyText: 'Няма данни',
    },
    transfer: {
      noMatch: 'Няма намерени',
      noData: 'Няма данни',
      titles: ['List 1', 'List 2'], // 待翻译
      filterPlaceholder: 'Enter keyword', // 待翻译
      noCheckedFormat: '{total} items', // 待翻译
      hasCheckedFormat: '{checked}/{total} checked', // 待翻译
    },
    image: {
      error: 'FAILED', // 待翻译
    },
    pageHeader: {
      title: 'Back', // 待翻译
    },
    popconfirm: {
      confirmButtonText: 'Yes', // 待翻译
      cancelButtonText: 'No', // 待翻译
    },
    carousel: {
      leftArrow: 'Carousel arrow left', // 待翻译
      rightArrow: 'Carousel arrow right', // 待翻译
      indicator: 'Carousel switch to index {index}', // 待翻译
    },
    inputOTP: {
      groupLabel: 'OTP Input', // 待翻译
      defaultLabel: 'Please enter OTP character {index}', // 待翻译
    },
  },
}
