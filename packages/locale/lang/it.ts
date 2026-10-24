export default {
  name: 'it',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Pulisci',
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
      now: 'Ora',
      today: 'Oggi',
      cancel: 'Cancella',
      clear: 'Pulisci',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Seleziona data',
      selectTime: 'Seleziona ora',
      startDate: 'Data inizio',
      startTime: 'Ora inizio',
      endDate: 'Data fine',
      endTime: 'Ora fine',
      prevYear: 'Anno precedente',
      nextYear: 'Anno successivo',
      prevMonth: 'Mese precedente',
      nextMonth: 'Mese successivo',
      year: '',
      month1: 'Gennaio',
      month2: 'Febbraio',
      month3: 'Marzo',
      month4: 'Aprile',
      month5: 'Maggio',
      month6: 'Giugno',
      month7: 'Luglio',
      month8: 'Agosto',
      month9: 'Settembre',
      month10: 'Ottobre',
      month11: 'Novembre',
      month12: 'Dicembre',
      weeks: {
        sun: 'Dom',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mer',
        thu: 'Gio',
        fri: 'Ven',
        sat: 'Sab',
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
        jan: 'Gen',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Mag',
        jun: 'Giu',
        jul: 'Lug',
        aug: 'Ago',
        sep: 'Set',
        oct: 'Ott',
        nov: 'Nov',
        dec: 'Dic',
      },
    },
    input: {
      characters: '{count} / {max} caratteri',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Caricamento',
      noMatch: 'Nessuna corrispondenza',
      noData: 'Nessun dato',
      placeholder: 'Seleziona',
    },
    mention: {
      loading: 'Caricamento',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Nessuna corrispondenza',
      loading: 'Caricamento',
      placeholder: 'Seleziona',
      noData: 'Nessun dato',
    },
    pagination: {
      goto: 'Vai a',
      pagesize: '/page',
      total: 'Totale {total}',
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
      title: 'Message', // 待翻译
      confirm: 'OK',
      cancel: 'Cancella',
      error: 'Input non valido',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Premi cancella per rimuovere',
      delete: 'Cancella',
      preview: 'Anteprima',
      continue: 'Continua',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Nessun dato',
      confirmFilter: 'Conferma',
      resetFilter: 'Reset',
      clearFilter: 'Tutti',
      sumText: 'Somma',
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
      emptyText: 'Nessun dato',
    },
    transfer: {
      noMatch: 'Nessuna corrispondenza',
      noData: 'Nessun dato',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Inserisci filtro',
      noCheckedFormat: '{total} elementi',
      hasCheckedFormat: '{checked}/{total} selezionati',
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
