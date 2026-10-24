export default {
  name: 'sv',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Töm',
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
      today: 'Idag',
      cancel: 'Avbryt',
      clear: 'Töm',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Välj datum',
      selectTime: 'Välj tid',
      startDate: 'Startdatum',
      startTime: 'Starttid',
      endDate: 'Slutdatum',
      endTime: 'Sluttid',
      prevYear: 'Föregående år',
      nextYear: 'Nästa år',
      prevMonth: 'Föregående månad',
      nextMonth: 'Nästa månad',
      year: '',
      month1: 'Januari',
      month2: 'Februari',
      month3: 'Mars',
      month4: 'April',
      month5: 'Maj',
      month6: 'Juni',
      month7: 'Juli',
      month8: 'Augusti',
      month9: 'September',
      month10: 'Oktober',
      month11: 'November',
      month12: 'December',
      weeks: {
        sun: 'Sön',
        mon: 'Mån',
        tue: 'Tis',
        wed: 'Ons',
        thu: 'Tor',
        fri: 'Fre',
        sat: 'Lör',
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
        may: 'Maj',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dec',
      },
    },
    input: {
      characters: '{count} / {max} tecken',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Laddar',
      noMatch: 'Hittade inget',
      noData: 'Ingen data',
      placeholder: 'Välj',
    },
    mention: {
      loading: 'Laddar',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Hittade inget',
      loading: 'Laddar',
      placeholder: 'Välj',
      noData: 'Ingen data',
    },
    pagination: {
      goto: 'Gå till',
      pagesize: '/sida',
      total: 'Totalt {total}',
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
      title: 'Meddelande',
      confirm: 'OK',
      cancel: 'Avbryt',
      error: 'Felaktig inmatning',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'press delete to remove', // 待翻译
      delete: 'Radera',
      preview: 'Förhandsvisa',
      continue: 'Fortsätt',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Inga Data',
      confirmFilter: 'Bekräfta',
      resetFilter: 'Återställ',
      clearFilter: 'Alla',
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
      next: 'Nästa',
      previous: 'Föregående',
      finish: 'Avsluta',
      close: 'Close this dialog', // 待翻译
    },
    tree: {
      emptyText: 'Ingen data',
    },
    transfer: {
      noMatch: 'Hittade inget',
      noData: 'Ingen data',
      titles: ['List 1', 'List 2'], // 待翻译
      filterPlaceholder: 'Enter keyword', // 待翻译
      noCheckedFormat: '{total} items', // 待翻译
      hasCheckedFormat: '{checked}/{total} checked', // 待翻译
    },
    image: {
      error: 'FAILED', // 待翻译
    },
    pageHeader: {
      title: 'Bakåt',
    },
    popconfirm: {
      confirmButtonText: 'Ja',
      cancelButtonText: 'Nej',
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
