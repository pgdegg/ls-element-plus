export default {
  name: 'fi',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Tyhjennä',
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
      now: 'Nyt',
      today: 'Tänään',
      cancel: 'Peruuta',
      clear: 'Tyhjennä',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Valitse päivä',
      selectTime: 'Valitse aika',
      startDate: 'Aloituspäivä',
      startTime: 'Aloitusaika',
      endDate: 'Lopetuspäivä',
      endTime: 'Lopetusaika',
      prevYear: 'Edellinen vuosi',
      nextYear: 'Seuraava vuosi',
      prevMonth: 'Edellinen kuukausi',
      nextMonth: 'Seuraava kuukausi',
      year: '',
      month1: 'tammikuu',
      month2: 'helmikuu',
      month3: 'maaliskuu',
      month4: 'huhtikuu',
      month5: 'toukokuu',
      month6: 'kesäkuu',
      month7: 'heinäkuu',
      month8: 'elokuu',
      month9: 'syyskuu',
      month10: 'lokakuu',
      month11: 'marraskuu',
      month12: 'joulukuu',
      weeks: {
        sun: 'su',
        mon: 'ma',
        tue: 'ti',
        wed: 'ke',
        thu: 'to',
        fri: 'pe',
        sat: 'la',
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
        jan: 'tammi',
        feb: 'helmi',
        mar: 'maalis',
        apr: 'huhti',
        may: 'touko',
        jun: 'kesä',
        jul: 'heinä',
        aug: 'elo',
        sep: 'syys',
        oct: 'loka',
        nov: 'marras',
        dec: 'joulu',
      },
    },
    input: {
      characters: '{count} / {max} merkkiä',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Lataa',
      noMatch: 'Ei vastaavia tietoja',
      noData: 'Ei tietoja',
      placeholder: 'Valitse',
    },
    mention: {
      loading: 'Lataa',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Ei vastaavia tietoja',
      loading: 'Lataa',
      placeholder: 'Valitse',
      noData: 'Ei tietoja',
    },
    pagination: {
      goto: 'Mene',
      pagesize: '/sivu',
      total: 'Yhteensä {total}',
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
      title: 'Viesti',
      confirm: 'OK',
      cancel: 'Peruuta',
      error: 'Virheellinen syöte',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Poista Delete-näppäimellä',
      delete: 'Poista',
      preview: 'Esikatsele',
      continue: 'Jatka',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Ei tietoja',
      confirmFilter: 'Vahvista',
      resetFilter: 'Tyhjennä',
      clearFilter: 'Kaikki',
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
      emptyText: 'Ei tietoja',
    },
    transfer: {
      noMatch: 'Ei vastaavia tietoja',
      noData: 'Ei tietoja',
      titles: ['Luettelo 1', 'Luettelo 2'],
      filterPlaceholder: 'Syötä hakusana',
      noCheckedFormat: '{total} kohdetta',
      hasCheckedFormat: '{checked}/{total} valittu',
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
