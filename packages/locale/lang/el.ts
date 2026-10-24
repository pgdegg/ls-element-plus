export default {
  name: 'el',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'Εντάξει',
      clear: 'Καθαρισμός',
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
      now: 'Τώρα',
      today: 'Σήμερα',
      cancel: 'Ακύρωση',
      clear: 'Καθαρισμός',
      confirm: 'Εντάξει',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Επιλέξτε ημέρα',
      selectTime: 'Επιλέξτε ώρα',
      startDate: 'Ημερομηνία Έναρξης',
      startTime: 'Ωρα Έναρξης',
      endDate: 'Ημερομηνία Λήξης',
      endTime: 'Ωρα Λήξης',
      prevYear: 'Προηγούμενο Έτος',
      nextYear: 'Επόμενο Έτος',
      prevMonth: 'Προηγούμενος Μήνας',
      nextMonth: 'Επόμενος Μήνας',
      year: 'Έτος',
      month1: 'Ιανουάριος',
      month2: 'Φεβρουάριος',
      month3: 'Μάρτιος',
      month4: 'Απρίλιος',
      month5: 'Μάιος',
      month6: 'Ιούνιος',
      month7: 'Ιούλιος',
      month8: 'Αύγουστος',
      month9: 'Σεπτέμβριος',
      month10: 'Οκτώβριος',
      month11: 'Νοέμβριος',
      month12: 'Δεκέμβριος',
      weeks: {
        sun: 'Κυρ',
        mon: 'Δευ',
        tue: 'Τρι',
        wed: 'Τετ',
        thu: 'Πεμ',
        fri: 'Παρ',
        sat: 'Σαβ',
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
        jan: 'Ιαν',
        feb: 'Φεβ',
        mar: 'Μαρ',
        apr: 'Απρ',
        may: 'Μαϊ',
        jun: 'Ιουν',
        jul: 'Ιουλ',
        aug: 'Αυγ',
        sep: 'Σεπ',
        oct: 'Οκτ',
        nov: 'Νοε',
        dec: 'Δεκ',
      },
    },
    input: {
      characters: '{count} / {max} χαρακτήρες',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Φόρτωση',
      noMatch: 'Δεν βρέθηκαν αποτελέσματα',
      noData: 'Χωρίς δεδομένα',
      placeholder: 'Επιλογή',
    },
    mention: {
      loading: 'Φόρτωση',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Δεν βρέθηκαν αποτελέσματα',
      loading: 'Φόρτωση',
      placeholder: 'Επιλογή',
      noData: 'Χωρίς δεδομένα',
    },
    pagination: {
      goto: 'Μετάβαση σε',
      pagesize: '/σελίδα',
      total: 'Σύνολο {total}',
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
      title: 'Μήνυμα',
      confirm: 'Εντάξει',
      cancel: 'Ακύρωση',
      error: 'Άκυρη εισαγωγή',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Πάτησε Διαγραφή για αφαίρεση',
      delete: 'Διαγραφή',
      preview: 'Προεπισκόπηση',
      continue: 'Συνέχεια',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Χωρίς Δεδομένα',
      confirmFilter: 'Επιβεβαίωση',
      resetFilter: 'Επαναφορά',
      clearFilter: 'Όλα',
      sumText: 'Σύνολο',
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
      emptyText: 'Χωρίς Δεδομένα',
    },
    transfer: {
      noMatch: 'Δεν βρέθηκαν αποτελέσματα',
      noData: 'Χωρίς δεδομένα',
      titles: ['Λίστα 1', 'Λίστα 2'],
      filterPlaceholder: 'Αναζήτηση',
      noCheckedFormat: '{total} Αντικείμενα',
      hasCheckedFormat: '{checked}/{total} επιλεγμένα',
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
