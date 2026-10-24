export default {
  name: 'nl',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'Bevestig',
      clear: 'Wissen',
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
      now: 'Nu',
      today: 'Vandaag',
      cancel: 'Annuleren',
      clear: 'Legen',
      confirm: 'Bevestig',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Geselecteerde datum',
      selectDate: 'Selecteer datum',
      selectTime: 'Selecteer tijd',
      startDate: 'Startdatum',
      startTime: 'Starttijd',
      endDate: 'Einddatum',
      endTime: 'Eindtijd',
      prevYear: 'Vorig jaar',
      nextYear: 'Volgend jaar',
      prevMonth: 'Vorige maand',
      nextMonth: 'Volgende maand',
      year: '',
      month1: 'januari',
      month2: 'februari',
      month3: 'maart',
      month4: 'april',
      month5: 'mei',
      month6: 'juni',
      month7: 'juli',
      month8: 'augustus',
      month9: 'september',
      month10: 'oktober',
      month11: 'november',
      month12: 'december',
      weeks: {
        sun: 'Zo',
        mon: 'Ma',
        tue: 'Di',
        wed: 'Wo',
        thu: 'Do',
        fri: 'Vr',
        sat: 'Za',
      },
      weeksFull: {
        sun: 'zondag',
        mon: 'maandag',
        tue: 'dinsdag',
        wed: 'woensdag',
        thu: 'donderdag',
        fri: 'vrijdag',
        sat: 'zaterdag',
      },
      months: {
        jan: 'jan',
        feb: 'feb',
        mar: 'maa',
        apr: 'apr',
        may: 'mei',
        jun: 'jun',
        jul: 'jul',
        aug: 'aug',
        sep: 'sep',
        oct: 'okt',
        nov: 'nov',
        dec: 'dec',
      },
    },
    input: {
      characters: '{count} / {max} tekens',
    },
    inputNumber: {
      decrease: 'getal verlagen',
      increase: 'getal verhogen',
    },
    select: {
      loading: 'Laden',
      noMatch: 'Geen overeenkomende resultaten',
      noData: 'Geen data',
      placeholder: 'Selecteer',
    },
    mention: {
      loading: 'Laden',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Geen overeenkomende resultaten',
      loading: 'Laden',
      placeholder: 'Selecteer',
      noData: 'Geen data',
    },
    pagination: {
      goto: 'Ga naar',
      pagesize: '/pagina',
      total: 'Totaal {total}',
      pageClassifier: '',
      page: 'Pagina',
      prev: 'Ga naar de vorige pagina',
      next: 'Ga naar de volgende pagina',
      currentPage: 'pagina {pager}',
      prevPages: "Vorige {pager} pagina's",
      nextPages: "Volgende {pager} pagina's",
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
      title: 'Bericht',
      confirm: 'Bevestig',
      cancel: 'Annuleren',
      error: 'Ongeldige invoer',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Kies verwijder om te wissen',
      delete: 'Verwijder',
      preview: 'Voorbeeld',
      continue: 'Doorgaan',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Geen data',
      confirmFilter: 'Bevestigen',
      resetFilter: 'Reset',
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
      next: 'Volgende',
      previous: 'Vorige',
      finish: 'Afronden',
      close: 'Tour afsluiten',
    },
    tree: {
      emptyText: 'Geen data',
    },
    transfer: {
      noMatch: 'Geen overeenkomende resultaten',
      noData: 'Geen data',
      titles: ['Lijst 1', 'Lijst 2'],
      filterPlaceholder: 'Geef zoekwoerd',
      noCheckedFormat: '{total} items',
      hasCheckedFormat: '{checked}/{total} geselecteerd',
    },
    image: {
      error: 'MISLUKT',
    },
    pageHeader: {
      title: 'Terug',
    },
    popconfirm: {
      confirmButtonText: 'Ja',
      cancelButtonText: 'Nee',
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
