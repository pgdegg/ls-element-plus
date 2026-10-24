export default {
  name: 'af',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'Bevestig',
      clear: 'Maak skoon',
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
      now: 'Nou',
      today: 'Vandag',
      cancel: 'Kanselleer',
      clear: 'Maak skoon',
      confirm: 'Bevestig',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Kies datum',
      selectTime: 'Kies tyd',
      startDate: 'Begindatum',
      startTime: 'Begintyd',
      endDate: 'Einddatum',
      endTime: 'Eindtyd',
      prevYear: 'Previous Year', // 待翻译
      nextYear: 'Next Year', // 待翻译
      prevMonth: 'Previous Month', // 待翻译
      nextMonth: 'Next Month', // 待翻译
      year: 'Jaar',
      month1: 'Jan',
      month2: 'Feb',
      month3: 'Mrt',
      month4: 'Apr',
      month5: 'Mei',
      month6: 'Jun',
      month7: 'Jul',
      month8: 'Aug',
      month9: 'Sep',
      month10: 'Okt',
      month11: 'Nov',
      month12: 'Des',
      weeks: {
        sun: 'So',
        mon: 'Ma',
        tue: 'Di',
        wed: 'Wo',
        thu: 'Do',
        fri: 'Vr',
        sat: 'Sa',
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
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mrt',
        apr: 'Apr',
        may: 'Mei',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Des',
      },
    },
    input: {
      characters: '{count} / {max} karakters',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Laai',
      noMatch: 'Geen toepaslike data',
      noData: 'Geen data',
      placeholder: 'Kies',
    },
    mention: {
      loading: 'Laai',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Geen toepaslike data',
      loading: 'Laai',
      placeholder: 'Kies',
      noData: 'Geen data',
    },
    pagination: {
      goto: 'Gaan na',
      pagesize: '/page',
      total: 'Totaal {total}',
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
      title: 'Boodskap',
      confirm: 'Bevestig',
      cancel: 'Kanselleer',
      error: 'Ongeldige invoer',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'press delete to remove', // 待翻译
      delete: 'Verwyder',
      preview: 'Voorskou',
      continue: 'Gaan voort',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Geen Data',
      confirmFilter: 'Bevestig',
      resetFilter: 'Herstel',
      clearFilter: 'Alles',
      sumText: 'Som',
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
      emptyText: 'Geen Data',
    },
    transfer: {
      noMatch: 'Geen toepaslike data',
      noData: 'Geen data',
      titles: ['Lys 1', 'Lys 2'],
      filterPlaceholder: 'Voer sleutelwoord in',
      noCheckedFormat: '{total} items',
      hasCheckedFormat: '{checked}/{total} gekies',
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
