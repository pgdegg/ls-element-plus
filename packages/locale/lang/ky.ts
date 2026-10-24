export default {
  name: 'ky',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'Мурунку',
      clear: 'ачык',
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
      now: 'азыр',
      today: 'бүгүн',
      cancel: 'жокко чыгарылды',
      clear: 'ачык',
      confirm: 'белгилөө',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'дата',
      selectTime: 'тандоо убактысы',
      startDate: 'Башталган датасы',
      startTime: 'Start убакыт',
      endDate: 'Бүткөн датасы',
      endTime: 'End убакыт',
      prevYear: 'өткөн жылы',
      nextYear: 'бир жылдан кийин',
      prevMonth: 'Өткөн айда',
      nextMonth: 'Кийинки ай',
      year: 'жыл',
      month1: 'биринчи ай',
      month2: 'Экинчи айда',
      month3: 'Үчүнчү айда',
      month4: 'Төртүнчү айда',
      month5: 'бешинчи айда',
      month6: 'Алгачкы алты ай',
      month7: 'жетинчи айда',
      month8: 'сегизинчи ай',
      month9: 'Алгачкы тогуз ай',
      month10: 'онунчу айда',
      month11: 'он биринчи ай',
      month12: 'он экинчи айда',
      weeks: {
        sun: 'жети жума',
        mon: 'дүйшөмбү',
        tue: 'шейшемби',
        wed: 'шаршемби',
        thu: 'бейшемби',
        fri: 'жума',
        sat: 'ишемби',
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
        jan: 'биринчи ай',
        feb: 'Экинчи айда',
        mar: 'Үчүнчү айда',
        apr: 'Төртүнчү айда',
        may: 'бешинчи айда',
        jun: 'Алгачкы алты ай',
        jul: 'жетинчи айда',
        aug: 'сегизинчи ай',
        sep: 'Алгачкы тогуз ай',
        oct: 'онунчу айда',
        nov: 'он биринчи ай',
        dec: 'он экинчи айда',
      },
    },
    input: {
      characters: '{count} / {max} белги',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Жүктөлүүдө',
      noMatch: 'Дал келген маалыматтар',
      noData: 'маалымат жок',
      placeholder: 'тандоо',
    },
    mention: {
      loading: 'Жүктөлүүдө',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Дал келген маалыматтар',
      loading: 'Жүктөлүүдө',
      placeholder: 'тандоо',
      noData: 'маалымат жок',
    },
    pagination: {
      goto: 'Мурунку',
      pagesize: 'бир',
      total: 'бүтүндөй {total} сан ',
      pageClassifier: 'бет',
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
      title: 'тез',
      confirm: 'белгилөө',
      cancel: 'жокко чыгарылды',
      error: 'Маалыматтарды киргизүү мыйзамдуу эмес!',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Жок кылуу баскычын басуу жок',
      delete: 'жок кылуу',
      preview: 'ЖМКнын картинки',
      continue: 'жүктөп бер',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'маалымат жок',
      confirmFilter: 'чыпка',
      resetFilter: 'кайра орнотуу',
      clearFilter: 'бүткөн',
      sumText: 'Бардыгы болуп',
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
      emptyText: 'маалымат жок',
    },
    transfer: {
      noMatch: 'Дал келген маалыматтар',
      noData: 'маалымат жок',
      titles: ['1 тизмеси', '2 тизмеси'],
      filterPlaceholder: 'Сураныч, издөө кирет',
      noCheckedFormat: 'бүтүндөй {total} сан',
      hasCheckedFormat: 'Тандалган {checked}/{total} сан',
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
