export default {
  name: 'pl',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Wyczyść',
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
      now: 'Teraz',
      today: 'Dzisiaj',
      cancel: 'Anuluj',
      clear: 'Wyczyść',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Wybierz datę',
      selectTime: 'Wybierz godzinę',
      startDate: 'Data początkowa',
      startTime: 'Godzina początkowa',
      endDate: 'Data końcowa',
      endTime: 'Czas końcowa',
      prevYear: 'Poprzedni rok',
      nextYear: 'Następny rok',
      prevMonth: 'Poprzedni miesiąc',
      nextMonth: 'Następny miesiąc',
      year: 'rok',
      month1: 'styczeń',
      month2: 'luty',
      month3: 'marzec',
      month4: 'kwiecień',
      month5: 'maj',
      month6: 'czerwiec',
      month7: 'lipiec',
      month8: 'sierpień',
      month9: 'wrzesień',
      month10: 'październik',
      month11: 'listopad',
      month12: 'grudzień',
      weeks: {
        sun: 'niedz.',
        mon: 'pon.',
        tue: 'wt.',
        wed: 'śr.',
        thu: 'czw.',
        fri: 'pt.',
        sat: 'sob.',
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
        jan: 'STY',
        feb: 'LUT',
        mar: 'MAR',
        apr: 'KWI',
        may: 'MAJ',
        jun: 'CZE',
        jul: 'LIP',
        aug: 'SIE',
        sep: 'WRZ',
        oct: 'PAŹ',
        nov: 'LIS',
        dec: 'GRU',
      },
    },
    input: {
      characters: '{count} / {max} znaków',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Ładowanie',
      noMatch: 'Brak dopasowań',
      noData: 'Brak danych',
      placeholder: 'Wybierz',
    },
    mention: {
      loading: 'Ładowanie',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Brak dopasowań',
      loading: 'Ładowanie',
      placeholder: 'Wybierz',
      noData: 'Brak danych',
    },
    pagination: {
      goto: 'Idź do',
      pagesize: '/stronę',
      total: 'Wszystkich {total}',
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
      title: 'Wiadomość',
      confirm: 'OK',
      cancel: 'Anuluj',
      error: 'Wiadomość zawiera niedozwolone znaki',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'kliknij kasuj aby usunąć',
      delete: 'Kasuj',
      preview: 'Podgląd',
      continue: 'Kontynuuj',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Brak danych',
      confirmFilter: 'Potwierdź',
      resetFilter: 'Resetuj',
      clearFilter: 'Wszystko',
      sumText: 'Razem',
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
      next: 'Dalej',
      previous: 'Wróć',
      finish: 'Zakończ',
      close: 'Close this dialog', // 待翻译
    },
    tree: {
      emptyText: 'Brak danych',
    },
    transfer: {
      noMatch: 'Brak dopasowań',
      noData: 'Brak danych',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Wpisz szukaną frazę',
      noCheckedFormat: 'razem: {total}',
      hasCheckedFormat: 'wybranych: {checked}/{total}',
    },
    image: {
      error: 'BŁĄD',
    },
    pageHeader: {
      title: 'Wstecz',
    },
    popconfirm: {
      confirmButtonText: 'Tak',
      cancelButtonText: 'Nie',
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
