export default {
  name: 'de',
  el: {
    breadcrumb: {
      label: 'Brotkrümel',
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Leeren',
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
      now: 'Jetzt',
      today: 'Heute',
      cancel: 'Abbrechen',
      clear: 'Leeren',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Datum wählen',
      selectTime: 'Uhrzeit wählen',
      startDate: 'Startdatum',
      startTime: 'Startzeit',
      endDate: 'Enddatum',
      endTime: 'Endzeit',
      prevYear: 'Letztes Jahr',
      nextYear: 'Nächtes Jahr',
      prevMonth: 'Letzter Monat',
      nextMonth: 'Nächster Monat',
      year: '',
      month1: 'Januar',
      month2: 'Februar',
      month3: 'März',
      month4: 'April',
      month5: 'Mai',
      month6: 'Juni',
      month7: 'Juli',
      month8: 'August',
      month9: 'September',
      month10: 'Oktober',
      month11: 'November',
      month12: 'Dezember',
      weeks: {
        sun: 'So',
        mon: 'Mo',
        tue: 'Di',
        wed: 'Mi',
        thu: 'Do',
        fri: 'Fr',
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
        mar: 'Mär',
        apr: 'Apr',
        may: 'Mai',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dez',
      },
      day: 'Tag',
      month: 'Monat',
    },
    input: {
      characters: '{count} / {max} Zeichen',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Lädt.',
      noMatch: 'Nichts gefunden.',
      noData: 'Keine Daten',
      placeholder: 'Daten wählen',
    },
    mention: {
      loading: 'Lädt.',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Nichts gefunden.',
      loading: 'Lädt.',
      placeholder: 'Daten wählen',
      noData: 'Keine Daten',
    },
    pagination: {
      goto: 'Gehe zu',
      pagesize: ' pro Seite',
      total: 'Gesamt {total}',
      pageClassifier: '',
      page: 'Seite',
      prev: 'Zur vorherigen Seite gehen',
      next: 'Zur nächsten Seite gehen',
      currentPage: 'Seite {pager}',
      prevPages: 'Vorherige {pager} Seiten',
      nextPages: 'Nächste {pager} Seiten',
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
      cancel: 'Abbrechen',
      error: 'Fehler',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Klicke löschen zum entfernen',
      delete: 'Löschen',
      preview: 'Vorschau',
      continue: 'Fortsetzen',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Keine Daten',
      confirmFilter: 'Anwenden',
      resetFilter: 'Zurücksetzen',
      clearFilter: 'Alles ',
      sumText: 'Summe',
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
      next: 'Weiter',
      previous: 'Zurück',
      finish: 'Fertig',
      close: 'Close this dialog', // 待翻译
    },
    tree: {
      emptyText: 'Keine Einträge',
    },
    transfer: {
      noMatch: 'Nichts gefunden.',
      noData: 'Keine Einträge',
      titles: ['Liste 1', 'Liste 2'],
      filterPlaceholder: 'Einträge filtern',
      noCheckedFormat: '{total} Einträge',
      hasCheckedFormat: '{checked}/{total} ausgewählt',
    },
    image: {
      error: 'FEHLGESCHLAGEN',
    },
    pageHeader: {
      title: 'Zurück',
    },
    popconfirm: {
      confirmButtonText: 'Ja',
      cancelButtonText: 'Nein',
    },
    carousel: {
      leftArrow: 'Karussell-Pfeil links',
      rightArrow: 'Karussell-Pfeil rechts',
      indicator: 'Karussell zu Index {index} wechseln',
    },
    inputOTP: {
      groupLabel: 'OTP Input', // 待翻译
      defaultLabel: 'Please enter OTP character {index}', // 待翻译
    },
  },
}
