export default {
  name: 'lt',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Valyti',
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
      now: 'Dabar',
      today: 'Šiandien',
      cancel: 'Atšaukti',
      clear: 'Valyti',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Pasirink datą',
      selectTime: 'Pasirink laiką',
      startDate: 'Data nuo',
      startTime: 'Laikas nuo',
      endDate: 'Data iki',
      endTime: 'Laikas iki',
      prevYear: 'Metai atgal',
      nextYear: 'Metai į priekį',
      prevMonth: 'Mėn. atgal',
      nextMonth: 'Mėn. į priekį',
      year: '',
      month1: 'Sausis',
      month2: 'Vasaris',
      month3: 'Kovas',
      month4: 'Balandis',
      month5: 'Gegužė',
      month6: 'Birželis',
      month7: 'Liepa',
      month8: 'Rugpjūtis',
      month9: 'Rugsėjis',
      month10: 'Spalis',
      month11: 'Lapkritis',
      month12: 'Gruodis',
      weeks: {
        sun: 'S.',
        mon: 'Pr.',
        tue: 'A.',
        wed: 'T.',
        thu: 'K.',
        fri: 'Pn.',
        sat: 'Š.',
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
        jan: 'Sau',
        feb: 'Vas',
        mar: 'Kov',
        apr: 'Bal',
        may: 'Geg',
        jun: 'Bir',
        jul: 'Lie',
        aug: 'Rugp',
        sep: 'Rugs',
        oct: 'Spa',
        nov: 'Lap',
        dec: 'Gruo',
      },
    },
    input: {
      characters: '{count} / {max} simbolių',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Kraunasi',
      noMatch: 'Duomenų nerasta',
      noData: 'Nėra duomenų',
      placeholder: 'Pasirink',
    },
    mention: {
      loading: 'Kraunasi',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Duomenų nerasta',
      loading: 'Kraunasi',
      placeholder: 'Pasirink',
      noData: 'Nėra duomenų',
    },
    pagination: {
      goto: 'Eiti į',
      pagesize: '/p',
      total: 'Viso {total}',
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
      title: 'Žinutė',
      confirm: 'OK',
      cancel: 'Atšaukti',
      error: 'Klaida įvestuose duomenyse',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'spauskite "Trinti" norėdami pašalinti',
      delete: 'Trinti',
      preview: 'Peržiūrėti',
      continue: 'Toliau',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Duomenų nerasta',
      confirmFilter: 'Patvirtinti',
      resetFilter: 'Atstatyti',
      clearFilter: 'Išvalyti',
      sumText: 'Suma',
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
      next: 'Kitas',
      previous: 'Ankstesnis',
      finish: 'Baigti',
      close: 'Close this dialog', // 待翻译
    },
    tree: {
      emptyText: 'Nėra duomenų',
    },
    transfer: {
      noMatch: 'Duomenų nerasta',
      noData: 'Nėra duomenų',
      titles: ['Sąrašas 1', 'Sąrašas 2'],
      filterPlaceholder: 'Įvesk raktažodį',
      noCheckedFormat: 'Viso: {total}',
      hasCheckedFormat: 'Pažymėta {checked} iš {total}',
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
