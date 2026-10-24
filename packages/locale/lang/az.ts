export default {
  name: 'az',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'Təsdiqlə',
      clear: 'Təmizlə',
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
      now: 'İndi',
      today: 'Bugün',
      cancel: 'İmtina',
      clear: 'Təmizlə',
      confirm: 'Təsdiqlə',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Tarix seç',
      selectTime: 'Saat seç',
      startDate: 'Başlanğıc Tarixi',
      startTime: 'Başlanğıc Saatı',
      endDate: 'Bitmə Tarixi',
      endTime: 'Bitmə Saatı',
      prevYear: 'Öncəki il',
      nextYear: 'Sonrakı il',
      prevMonth: 'Öncəki ay',
      nextMonth: 'Sonrakı ay',
      year: '',
      month1: 'Yanvar',
      month2: 'Fevral',
      month3: 'Mart',
      month4: 'Aprel',
      month5: 'May',
      month6: 'İyun',
      month7: 'İyul',
      month8: 'Avqust',
      month9: 'Sentyabr',
      month10: 'Oktyabr',
      month11: 'Noyabr',
      month12: 'Dekabr',
      weeks: {
        sun: 'Baz',
        mon: 'B.e',
        tue: 'Ç.a',
        wed: 'Çər',
        thu: 'C.a',
        fri: 'Cüm',
        sat: 'Şən',
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
        jan: 'Yan',
        feb: 'Fev',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'İyn',
        jul: 'İyl',
        aug: 'Avq',
        sep: 'Sen',
        oct: 'Okt',
        nov: 'Noy',
        dec: 'Dek',
      },
    },
    input: {
      characters: '{count} / {max} simvol',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Yüklənir',
      noMatch: 'Nəticə tapılmadı',
      noData: 'Məlumat yoxdur',
      placeholder: 'Seç',
    },
    mention: {
      loading: 'Yüklənir',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Nəticə tapılmadı',
      loading: 'Yüklənir',
      placeholder: 'Seç',
      noData: 'Məlumat yoxdur',
    },
    pagination: {
      goto: 'Get',
      pagesize: '/səhifə',
      total: 'Toplam {total}',
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
      title: 'Mesaj',
      confirm: 'Təsdiqlə',
      cancel: 'İmtina',
      error: 'Səhv',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Sürüşdürmədən sonra sil',
      delete: 'Sil',
      preview: 'Ön izlə',
      continue: 'Davam et',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Məlumat yoxdur',
      confirmFilter: 'Təsdiqlə',
      resetFilter: 'Sıfırla',
      clearFilter: 'Bütün',
      sumText: 'Cəmi',
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
      emptyText: 'Məlumat yoxdur',
    },
    transfer: {
      noMatch: 'Nəticə tapılmadı',
      noData: 'Məlumat yoxdur',
      titles: ['Siyahı 1', 'Siyahı 2'],
      filterPlaceholder: 'Kəlimələri daxil et',
      noCheckedFormat: '{total} ədəd',
      hasCheckedFormat: '{checked}/{total} seçildi',
    },
    image: {
      error: 'SƏHV',
    },
    pageHeader: {
      title: 'Geri',
    },
    popconfirm: {
      confirmButtonText: 'Bəli',
      cancelButtonText: 'Xeyr',
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
    empty: {
      description: 'Məlumat yoxdur',
    },
  },
}
