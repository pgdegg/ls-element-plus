export default {
  name: 'hr',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Očisti',
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
      now: 'Sada',
      today: 'Danas',
      cancel: 'Otkaži',
      clear: 'Očisti',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Odaberi datum',
      selectTime: 'Odaberi vrijeme',
      startDate: 'Datum početka',
      startTime: 'Vrijeme početka',
      endDate: 'Datum završetka',
      endTime: 'Vrijeme završetka',
      prevYear: 'Prethodna godina',
      nextYear: 'Sljedeća godina',
      prevMonth: 'Prethodni mjesec',
      nextMonth: 'Sljedeći mjesec',
      year: '',
      month1: 'Siječanj',
      month2: 'Veljača',
      month3: 'Ožujak',
      month4: 'Travanj',
      month5: 'Svibanj',
      month6: 'Lipanj',
      month7: 'Srpanj',
      month8: 'Kolovoz',
      month9: 'Rujan',
      month10: 'Listopad',
      month11: 'Studeni',
      month12: 'Prosinac',
      weeks: {
        sun: 'Ned',
        mon: 'Pon',
        tue: 'Uto',
        wed: 'Sri',
        thu: 'Čet',
        fri: 'Pet',
        sat: 'Sub',
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
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Dec',
      },
    },
    input: {
      characters: '{count} / {max} znakova',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Učitavanje',
      noMatch: 'Nema pronađenih podataka',
      noData: 'Nema podataka',
      placeholder: 'Izaberi',
    },
    mention: {
      loading: 'Učitavanje',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Nema pronađenih podataka',
      loading: 'Učitavanje',
      placeholder: 'Izaberi',
      noData: 'Nema podataka',
    },
    pagination: {
      goto: 'Idi na',
      pagesize: '/stranica',
      total: 'Ukupno {total}',
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
      title: 'Poruka',
      confirm: 'OK',
      cancel: 'Otkaži',
      error: 'Pogrešan unos',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'pritisnite izbriši za brisanje',
      delete: 'Izbriši',
      preview: 'Pregled',
      continue: 'Nastavak',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Nema podataka',
      confirmFilter: 'Potvrdi',
      resetFilter: 'Resetiraj',
      clearFilter: 'Sve',
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
      next: 'Next', // 待翻译
      previous: 'Previous', // 待翻译
      finish: 'Finish', // 待翻译
      close: 'Close this dialog', // 待翻译
    },
    tree: {
      emptyText: 'Nema podataka',
    },
    transfer: {
      noMatch: 'Nema pronađenih podataka',
      noData: 'Nema podataka',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Unesite ključnu riječ',
      noCheckedFormat: '{total} stavki',
      hasCheckedFormat: '{checked}/{total} checked',
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
