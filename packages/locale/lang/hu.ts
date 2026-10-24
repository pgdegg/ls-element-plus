export default {
  name: 'hu',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Törlés',
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
      now: 'Most',
      today: 'Ma',
      cancel: 'Mégse',
      clear: 'Törlés',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Dátum',
      selectTime: 'Időpont',
      startDate: 'Dátum-tól',
      startTime: 'Időpont-tól',
      endDate: 'Dátum-ig',
      endTime: 'Időpont-ig',
      prevYear: 'Előző év',
      nextYear: 'Következő év',
      prevMonth: 'Előző hónap',
      nextMonth: 'Következő hónap',
      year: '',
      month1: 'Január',
      month2: 'Február',
      month3: 'Március',
      month4: 'Április',
      month5: 'Május',
      month6: 'Június',
      month7: 'Július',
      month8: 'Augusztus',
      month9: 'Szeptember',
      month10: 'Október',
      month11: 'November',
      month12: 'December',
      weeks: {
        sun: 'Vas',
        mon: 'Hét',
        tue: 'Ked',
        wed: 'Sze',
        thu: 'Csü',
        fri: 'Pén',
        sat: 'Szo',
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
        mar: 'Már',
        apr: 'Ápr',
        may: 'Máj',
        jun: 'Jún',
        jul: 'Júl',
        aug: 'Aug',
        sep: 'Szep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dec',
      },
    },
    input: {
      characters: '{count} / {max} karakter',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Betöltés',
      noMatch: 'Nincs találat',
      noData: 'Nincs adat',
      placeholder: 'Válassz',
    },
    mention: {
      loading: 'Betöltés',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Nincs találat',
      loading: 'Betöltés',
      placeholder: 'Válassz',
      noData: 'Nincs adat',
    },
    pagination: {
      goto: 'Ugrás',
      pagesize: '/oldal',
      total: 'Össz {total}',
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
      title: 'Üzenet',
      confirm: 'OK',
      cancel: 'Mégse',
      error: 'Hibás adat',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'kattints a törléshez',
      delete: 'Törlés',
      preview: 'Előnézet',
      continue: 'Tovább',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Nincs adat',
      confirmFilter: 'Megerősít',
      resetFilter: 'Alaphelyet',
      clearFilter: 'Mind',
      sumText: 'Összeg',
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
      emptyText: 'Nincs adat',
    },
    transfer: {
      noMatch: 'Nincs találat',
      noData: 'Nincs adat',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Kulcsszó',
      noCheckedFormat: '{total} elem',
      hasCheckedFormat: '{checked}/{total} kiválasztva',
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
