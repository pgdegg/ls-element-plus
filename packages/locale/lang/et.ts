export default {
  name: 'et',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Tühjenda',
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
      now: 'Praegu',
      today: 'Täna',
      cancel: 'Tühista',
      clear: 'Tühjenda',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Vali kuupäev',
      selectTime: 'Vali kellaaeg',
      startDate: 'Alguskuupäev',
      startTime: 'Algusaeg',
      endDate: 'Lõpukuupäev',
      endTime: 'Lõpuaeg',
      prevYear: 'Eelmine aasta',
      nextYear: 'Järgmine aasta',
      prevMonth: 'Eelmine kuu',
      nextMonth: 'Järgmine kuu',
      year: '',
      month1: 'Jaanuar',
      month2: 'Veebruar',
      month3: 'Märts',
      month4: 'Aprill',
      month5: 'Mai',
      month6: 'Juuni',
      month7: 'Juuli',
      month8: 'August',
      month9: 'September',
      month10: 'Oktoober',
      month11: 'November',
      month12: 'Detsember',
      weeks: {
        sun: 'P',
        mon: 'E',
        tue: 'T',
        wed: 'K',
        thu: 'N',
        fri: 'R',
        sat: 'L',
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
        jan: 'Jaan',
        feb: 'Veeb',
        mar: 'Mär',
        apr: 'Apr',
        may: 'Mai',
        jun: 'Juun',
        jul: 'Juul',
        aug: 'Aug',
        sep: 'Sept',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dets',
      },
    },
    input: {
      characters: '{count} / {max} märki',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Laadimine',
      noMatch: 'Sobivad andmed puuduvad',
      noData: 'Andmed puuduvad',
      placeholder: 'Vali',
    },
    mention: {
      loading: 'Laadimine',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Sobivad andmed puuduvad',
      loading: 'Laadimine',
      placeholder: 'Vali',
      noData: 'Andmed puuduvad',
    },
    pagination: {
      goto: 'Mine lehele',
      pagesize: '/page',
      total: 'Kokku {total}',
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
      title: 'Teade',
      confirm: 'OK',
      cancel: 'Tühista',
      error: 'Vigane sisend',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Vajuta "Kustuta", et eemaldada',
      delete: 'Kustuta',
      preview: 'Eelvaate',
      continue: 'Jätka',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Andmed puuduvad',
      confirmFilter: 'Kinnita',
      resetFilter: 'Taasta',
      clearFilter: 'Kõik',
      sumText: 'Summa',
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
      emptyText: 'Andmed puuduvad',
    },
    transfer: {
      noMatch: 'Sobivad andmed puuduvad',
      noData: 'Andmed puuduvad',
      titles: ['Loend 1', 'Loend 2'],
      filterPlaceholder: 'Sisesta märksõna',
      noCheckedFormat: '{total} objekti',
      hasCheckedFormat: '{checked}/{total} valitud',
    },
    image: {
      error: 'Ebaõnnestus',
    },
    pageHeader: {
      title: 'Tagasi',
    },
    popconfirm: {
      confirmButtonText: 'Jah',
      cancelButtonText: 'Ei',
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
