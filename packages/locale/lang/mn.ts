export default {
  name: 'mn',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'Тийм',
      clear: 'Цэвэрлэх',
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
      now: 'Одоо',
      today: 'Өнөөдөр',
      cancel: 'Болих',
      clear: 'Цэвэрлэх',
      confirm: 'Тийм',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Огноог сонго',
      selectTime: 'Цагийг сонго',
      startDate: 'Эхлэх огноо',
      startTime: 'Эхлэх цаг',
      endDate: 'Дуусах огноо',
      endTime: 'Дуусах цаг',
      prevYear: 'Өмнөх жил',
      nextYear: 'Дараа жил',
      prevMonth: 'Өмнөх сар',
      nextMonth: 'Дараа сар',
      year: 'он',
      month1: '1 сар',
      month2: '2 сар',
      month3: '3 сар',
      month4: '4 сар',
      month5: '5 сар',
      month6: '6 сар',
      month7: '7 сар',
      month8: '8 сар',
      month9: '9 сар',
      month10: '10 сар',
      month11: '11 сар',
      month12: '12 сар',
      weeks: {
        sun: 'Ням',
        mon: 'Дав',
        tue: 'Мяг',
        wed: 'Лха',
        thu: 'Пүр',
        fri: 'Баа',
        sat: 'Бям',
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
        jan: '1 сар',
        feb: '2 сар',
        mar: '3 сар',
        apr: '4 сар',
        may: '5 сар',
        jun: '6 сар',
        jul: '7 сар',
        aug: '8 сар',
        sep: '9 сар',
        oct: '10 сар',
        nov: '11 сар',
        dec: '12 сар',
      },
    },
    input: {
      characters: '{count} / {max} тэмдэгт',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Ачаалж байна',
      noMatch: 'Тохирох өгөгдөл байхгүй',
      noData: 'Өгөгдөл байхгүй',
      placeholder: 'Сонгох',
    },
    mention: {
      loading: 'Ачаалж байна',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Тохирох өгөгдөл байхгүй',
      loading: 'Ачаалж байна',
      placeholder: 'Сонгох',
      noData: 'Өгөгдөл байхгүй',
    },
    pagination: {
      goto: 'Очих',
      pagesize: '/хуудас',
      total: 'Нийт {total}',
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
      title: 'Зурвас',
      confirm: 'Тийм',
      cancel: 'Болих',
      error: 'Буруу утга',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Устгахын дарж арилга',
      delete: 'Устгах',
      preview: 'Өмнөх',
      continue: 'Үргэлжлүүлэх',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Өгөгдөл байхгүй',
      confirmFilter: 'Зөвшөөрөх',
      resetFilter: 'Цэвэрлэх',
      clearFilter: 'Бүгд',
      sumText: 'Нийт',
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
      emptyText: 'Өгөгдөл байхгүй',
    },
    transfer: {
      noMatch: 'Тохирох өгөгдөл байхгүй',
      noData: 'Өгөгдөл байхгүй',
      titles: ['Жагсаалт 1', 'Жагсаалт 2'],
      filterPlaceholder: 'Утга оруул',
      noCheckedFormat: '{total} өгөгдөл',
      hasCheckedFormat: '{checked}/{total} сонгосон',
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
