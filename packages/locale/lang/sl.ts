export default {
  name: 'sl',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'V redu',
      clear: 'Počisti',
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
      now: 'Zdaj',
      today: 'Danes',
      cancel: 'Prekliči',
      clear: 'Počisti',
      confirm: 'Potrdi',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Izberi datum',
      selectTime: 'Izberi čas',
      startDate: 'Začetni datum',
      startTime: 'Začetni čas',
      endDate: 'Končni datum',
      endTime: 'Končni čas',
      prevYear: 'Prejšnje leto',
      nextYear: 'Naslednje leto',
      prevMonth: 'Prejšnji mesec',
      nextMonth: 'Naslednji mesec',
      year: '',
      month1: 'Jan',
      month2: 'Feb',
      month3: 'Mar',
      month4: 'Apr',
      month5: 'Maj',
      month6: 'Jun',
      month7: 'Jul',
      month8: 'Avg',
      month9: 'Sep',
      month10: 'Okt',
      month11: 'Nov',
      month12: 'Dec',
      weeks: {
        sun: 'Ned',
        mon: 'Pon',
        tue: 'Tor',
        wed: 'Sre',
        thu: 'Čet',
        fri: 'Pet',
        sat: 'Sob',
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
        aug: 'Avg',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dec',
      },
    },
    input: {
      characters: '{count} / {max} znakov',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Nalaganje',
      noMatch: 'Ni ustreznih podatkov',
      noData: 'Ni podatkov',
      placeholder: 'Izberi',
    },
    mention: {
      loading: 'Nalaganje',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Ni ustreznih podatkov',
      loading: 'Nalaganje',
      placeholder: 'Izberi',
      noData: 'Ni podatkov',
    },
    pagination: {
      goto: 'Pojdi na',
      pagesize: '/stran',
      total: 'Skupno {total}',
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
      title: 'Sporočilo',
      confirm: 'V redu',
      cancel: 'Prekliči',
      error: 'Nedovoljen vnos',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'press delete to remove', // 待翻译
      delete: 'Izbriši',
      preview: 'Predogled',
      continue: 'Nadaljuj',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Ni podatkov',
      confirmFilter: 'Potrdi',
      resetFilter: 'Ponastavi',
      clearFilter: 'Vse',
      sumText: 'Skupno',
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
      emptyText: 'Ni podatkov',
    },
    transfer: {
      noMatch: 'Ni ustreznih podatkov',
      noData: 'Ni podatkov',
      titles: ['Seznam 1', 'Seznam 2'],
      filterPlaceholder: 'Vnesi ključno besedo',
      noCheckedFormat: '{total} elementov',
      hasCheckedFormat: '{checked}/{total} izbranih',
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
