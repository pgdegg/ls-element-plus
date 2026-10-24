export default {
  name: 'cs',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Vymazat',
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
      now: 'Teď',
      today: 'Dnes',
      cancel: 'Zrušit',
      clear: 'Vymazat',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Vybrat datum',
      selectTime: 'Vybrat čas',
      startDate: 'Datum začátku',
      startTime: 'Čas začátku',
      endDate: 'Datum konce',
      endTime: 'Čas konce',
      prevYear: 'Předchozí rok',
      nextYear: 'Příští rok',
      prevMonth: 'Předchozí měsíc',
      nextMonth: 'Příští měsíc',
      year: 'Rok',
      month1: 'Leden',
      month2: 'Únor',
      month3: 'Březen',
      month4: 'Duben',
      month5: 'Květen',
      month6: 'Červen',
      month7: 'Červenec',
      month8: 'Srpen',
      month9: 'Září',
      month10: 'Říjen',
      month11: 'Listopad',
      month12: 'Prosinec',
      weeks: {
        sun: 'Ne',
        mon: 'Po',
        tue: 'Út',
        wed: 'St',
        thu: 'Čt',
        fri: 'Pá',
        sat: 'So',
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
        jan: 'Led',
        feb: 'Úno',
        mar: 'Bře',
        apr: 'Dub',
        may: 'Kvě',
        jun: 'Čer',
        jul: 'Čvc',
        aug: 'Srp',
        sep: 'Zář',
        oct: 'Říj',
        nov: 'Lis',
        dec: 'Pro',
      },
      day: 'Den',
      month: 'Měsíc',
    },
    input: {
      characters: '{count} / {max} znaků',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Načítání',
      noMatch: 'Žádná shoda',
      noData: 'Žádná data',
      placeholder: 'Vybrat',
    },
    mention: {
      loading: 'Načítání',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Žádná shoda',
      loading: 'Načítání',
      placeholder: 'Vybrat',
      noData: 'Žádná data',
    },
    pagination: {
      goto: 'Jít na',
      pagesize: 'na stranu',
      total: 'Celkem {total}',
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
      title: 'Zpráva',
      confirm: 'OK',
      cancel: 'Zrušit',
      error: 'Neplatný vstup',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Stisknout pro smazání',
      delete: 'Vymazat',
      preview: 'Náhled',
      continue: 'Pokračovat',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Žádná data',
      confirmFilter: 'Potvrdit',
      resetFilter: 'Resetovat',
      clearFilter: 'Vše',
      sumText: 'Celkem',
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
      emptyText: 'Žádná data',
    },
    transfer: {
      noMatch: 'Žádná shoda',
      noData: 'Žádná data',
      titles: ['Seznam 1', 'Seznam 2'],
      filterPlaceholder: 'Klíčové slovo',
      noCheckedFormat: '{total} položek',
      hasCheckedFormat: '{checked}/{total} vybráno',
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
