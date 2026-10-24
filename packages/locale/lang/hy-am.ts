export default {
  name: 'hy-am',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'Լաւ',
      clear: 'Մաքրել',
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
      now: 'Հիմա',
      today: 'Այսօր',
      cancel: 'Չեղարկել',
      clear: 'Մաքրել',
      confirm: 'Լաւ',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Ընտրեք ամսաթիւը',
      selectTime: 'Ընտրեք ժամանակը',
      startDate: 'Սկզբ. ամսաթիւը',
      startTime: 'Սկզբ. ժամանակը',
      endDate: 'Վերջ. ամսաթիվը',
      endTime: 'Վերջ. ժամանակը',
      prevYear: 'Նախորդ տարի',
      nextYear: 'Յաջորդ տարի',
      prevMonth: 'Նախորդ ամիս',
      nextMonth: 'Յաջորդ ամիս',
      year: 'Տարի',
      month1: 'Յունուար',
      month2: 'Փետրուար',
      month3: 'Մարտ',
      month4: 'Ապրիլ',
      month5: 'Մայիս',
      month6: 'Յունիս',
      month7: 'Յուլիս',
      month8: 'Օգոստոս',
      month9: 'Սեպտեմբեր',
      month10: 'Յոկտեմբեր',
      month11: 'Նոյեմբեր',
      month12: 'Դեկտեմբեր',
      weeks: {
        sun: 'Կիր',
        mon: 'Երկ',
        tue: 'Եր',
        wed: 'Չոր',
        thu: 'Հինգ',
        fri: 'Ուրբ',
        sat: 'Շաբ',
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
        jan: 'Յունվ',
        feb: 'Փետ',
        mar: 'Մար',
        apr: 'Ապր',
        may: 'Մայ',
        jun: 'Յուն',
        jul: 'Յուլ',
        aug: 'Օգ',
        sep: 'Սեպտ',
        oct: 'Յոկ',
        nov: 'Նոյ',
        dec: 'Դեկ',
      },
    },
    input: {
      characters: '{count} / {max} նիշ',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Բեռնում',
      noMatch: 'Համապատասխան տուեալներ չկան',
      noData: 'Տվյալներ չկան',
      placeholder: 'Ընտրել',
    },
    mention: {
      loading: 'Բեռնում',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Համապատասխան տուեալներ չկան',
      loading: 'Բեռնում',
      placeholder: 'Ընտրել',
      noData: 'Տվյալներ չկան',
    },
    pagination: {
      goto: 'Անցնել',
      pagesize: ' էջում',
      total: 'Ընդամենը {total}',
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
      title: 'Հաղորդագրութիւն',
      confirm: 'Լաւ',
      cancel: 'Չեղարկել',
      error: 'Անվաւեր տուեալների մուտք',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Սեղմեք [Ջնջել] ջնջելու համար',
      delete: 'Ջնջել',
      preview: 'Նախադիտում',
      continue: 'Շարունակել',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Տուեալներ չկան',
      confirmFilter: 'Յաստատել',
      resetFilter: 'Վերագործարկել',
      clearFilter: 'Բոլորը',
      sumText: 'Գումարը',
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
      emptyText: 'Տուեալներ չկան',
    },
    transfer: {
      noMatch: 'Համապատասխան տուեալներ չկան',
      noData: 'Տուեալներ չկան',
      titles: ['Ցուցակ 1', 'Ցուցակ 2'],
      filterPlaceholder: 'Մուտքագրեք բանալի բառ',
      noCheckedFormat: '{total} միաւոր',
      hasCheckedFormat: '{checked}/{total} ընտրուած է',
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
