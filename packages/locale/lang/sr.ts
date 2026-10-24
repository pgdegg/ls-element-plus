export default {
  name: 'sr',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Поништи',
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
      now: 'Сада',
      today: 'Данас',
      cancel: 'Откажи',
      clear: 'Бриши',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Изабери датум',
      selectTime: 'Изабери време',
      startDate: 'Датум почетка',
      startTime: 'Време почетка',
      endDate: 'Датум завршетка',
      endTime: 'Време завршетка',
      prevYear: 'Претходна година',
      nextYear: 'Следећа година',
      prevMonth: 'Претходни месец',
      nextMonth: 'Следећи месец',
      year: 'година',
      month1: 'јануар',
      month2: 'фебруар',
      month3: 'март',
      month4: 'април',
      month5: 'мај',
      month6: 'јун',
      month7: 'јул',
      month8: 'август',
      month9: 'септембар',
      month10: 'октобар',
      month11: 'новембар',
      month12: 'децембар',
      weeks: {
        sun: 'Нед',
        mon: 'Пон',
        tue: 'Уто',
        wed: 'Сре',
        thu: 'Чет',
        fri: 'Пет',
        sat: 'Суб',
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
        jan: 'јан',
        feb: 'феб',
        mar: 'мар',
        apr: 'апр',
        may: 'мај',
        jun: 'јун',
        jul: 'јул',
        aug: 'авг',
        sep: 'сеп',
        oct: 'окт',
        nov: 'нов',
        dec: 'дец',
      },
    },
    input: {
      characters: '{count} / {max} карактера',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Учитавање',
      noMatch: 'Нема резултата',
      noData: 'Нема података',
      placeholder: 'Изабери',
    },
    mention: {
      loading: 'Учитавање',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Нема резултата',
      loading: 'Учитавање',
      placeholder: 'Изабери',
      noData: 'Нема података',
    },
    pagination: {
      goto: 'Иди на',
      pagesize: '/страни',
      total: 'Укупно {total}',
      pageClassifier: '',
      page: 'Страна',
      prev: 'Иди на претходну страну',
      next: 'Иди на следећу страну',
      currentPage: 'страна {pager}',
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
      title: 'Порука',
      confirm: 'OK',
      cancel: 'Откажи',
      error: 'Неисправан унос',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'притисни БРИШИ да обришеш',
      delete: 'Бриши',
      preview: 'Види',
      continue: 'Настави',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Нема података',
      confirmFilter: 'Потврди',
      resetFilter: 'Ресетуј',
      clearFilter: 'Све',
      sumText: 'Збир',
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
      emptyText: 'Нема података',
    },
    transfer: {
      noMatch: 'Нема резултата',
      noData: 'Нема података',
      titles: ['Листа 1', 'Листа 2'],
      filterPlaceholder: 'Унеси кључну реч',
      noCheckedFormat: '{total} ставки',
      hasCheckedFormat: '{checked}/{total} обележених',
    },
    image: {
      error: 'НЕУСПЕШНО',
    },
    pageHeader: {
      title: 'Назад',
    },
    popconfirm: {
      confirmButtonText: 'Да',
      cancelButtonText: 'Не',
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
