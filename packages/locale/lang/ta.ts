export default {
  name: 'ta',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'உறுதி செய்',
      clear: 'தெளிவாக்கு',
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
      now: 'தற்போது',
      today: 'இன்று',
      cancel: 'ரத்து செய்',
      clear: 'சரி',
      confirm: 'உறுதி செய்',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'தேதியை தேர்வு செய்',
      selectTime: 'நேரத்தை தேர்வு செய்',
      startDate: 'தொடங்கும் நாள்',
      startTime: 'தொடங்கும் நேரம்',
      endDate: 'முடியும் தேதி',
      endTime: 'முடியும் நேரம்',
      prevYear: 'Previous Year', // 待翻译
      nextYear: 'Next Year', // 待翻译
      prevMonth: 'Previous Month', // 待翻译
      nextMonth: 'Next Month', // 待翻译
      year: 'வருடம்',
      month1: 'ஜனவரி',
      month2: 'பிப்ரவரி',
      month3: 'மார்ச்',
      month4: 'ஏப்ரல்',
      month5: 'மே',
      month6: 'ஜூன்',
      month7: 'ஜூலை',
      month8: 'ஆகஸ்ட்',
      month9: 'செப்டம்பர்',
      month10: 'அக்டோபர்',
      month11: 'நவம்பர்',
      month12: 'டிசம்பர்',
      weeks: {
        sun: 'ஞாயிறு',
        mon: 'திங்கள்',
        tue: 'செவ்வாய்',
        wed: 'புதன்',
        thu: 'வியாழன்',
        fri: 'வெள்ளி',
        sat: 'சனி',
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
        jan: 'ஜனவரி',
        feb: 'பிப்ரவரி',
        mar: 'மார்ச்',
        apr: 'ஏப்ரல்',
        may: 'மே',
        jun: 'ஜூன்',
        jul: 'ஜூலை',
        aug: 'ஆகஸ்ட்',
        sep: 'செப்டம்பர்',
        oct: 'அக்டோபர்',
        nov: 'நவம்பர்',
        dec: 'டிசம்பர்',
      },
    },
    input: {
      characters: '{count} / {max} எழுத்துகள்',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'தயாராகிக்கொண்டிருக்கிறது',
      noMatch: 'பொருத்தமான தரவு கிடைக்கவில்லை',
      noData: 'தரவு இல்லை',
      placeholder: 'தேர்வு செய்',
    },
    mention: {
      loading: 'தயாராகிக்கொண்டிருக்கிறது',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'பொருத்தமான தரவு கிடைக்கவில்லை',
      loading: 'தயாராகிக்கொண்டிருக்கிறது',
      placeholder: 'தேர்வு செய்',
      noData: 'தரவு இல்லை',
    },
    pagination: {
      goto: 'தேவையான் பகுதிக்கு செல்',
      pagesize: '/page',
      total: 'மொத்தம் {total}',
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
      title: 'செய்தி',
      confirm: 'உறுதி செய்',
      cancel: 'ரத்து செய்',
      error: 'பொருத்தாமில்லாத உள்ளீடு',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'press delete to remove', // 待翻译
      delete: 'நீக்கு',
      preview: 'முன்னோட்டம் பார்',
      continue: 'தொடரு',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'தரவு இல்லை',
      confirmFilter: 'உறுதி செய்',
      resetFilter: 'புதுமாற்றம் செய்',
      clearFilter: 'அனைத்தும்',
      sumText: 'கூட்டு',
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
      emptyText: 'தரவு இல்லை',
    },
    transfer: {
      noMatch: 'பொருத்தமான தரவு கிடைக்கவில்லை',
      noData: 'தரவு இல்லை',
      titles: ['பட்டியல் 1', 'பட்டியல் 2'],
      filterPlaceholder: 'சொல்லை உள்ளீடு செய்',
      noCheckedFormat: '{total} items', // 待翻译
      hasCheckedFormat: '{checked}/{total} தேர்வு செய்யப்பட்டவைகள்',
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
