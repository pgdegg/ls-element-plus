export default {
  name: 'bn',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'ঠিক আছে',
      clear: 'ক্লিয়ার',
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
      now: 'এখন',
      today: 'আজ',
      cancel: 'বাতিল',
      clear: 'ক্লিয়ার',
      confirm: 'ঠিক আছে',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'তারিখ নির্বাচন করুন',
      selectTime: 'সময় নির্বাচন করুন',
      startDate: 'যে তারিখ থেকে',
      startTime: 'যে সময় থেকে',
      endDate: 'যে তারিখ পর্যন্ত',
      endTime: 'যে সময় পর্যন্ত',
      prevYear: 'পূর্ববর্তী বছর',
      nextYear: 'পরবর্তী বছর',
      prevMonth: 'পূর্ববর্তী মাস',
      nextMonth: 'পরবর্তী মাস',
      year: 'সাল',
      month1: 'জানুয়ারি',
      month2: 'ফেব্রুয়ারী',
      month3: 'মার্চ',
      month4: 'এপ্রিল',
      month5: 'মে',
      month6: 'জুন',
      month7: 'জুলাই',
      month8: 'আগষ্ট',
      month9: 'সেপ্টেম্বর',
      month10: 'অক্টোবর',
      month11: 'নভেম্বর',
      month12: 'ডিসেম্বর',
      weeks: {
        sun: 'রবি',
        mon: 'সোম',
        tue: 'মঙ্গল',
        wed: 'বুধ',
        thu: 'বৃহঃ',
        fri: 'শুক্র',
        sat: 'শনি',
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
        jan: 'জানু',
        feb: 'ফেব্রু',
        mar: 'মার্চ',
        apr: 'এপ্রি',
        may: 'মে',
        jun: 'জুন',
        jul: 'জুলা',
        aug: 'আগ',
        sep: 'সেপ্টে',
        oct: 'আক্টো',
        nov: 'নভে',
        dec: 'ডিসে',
      },
    },
    input: {
      characters: '{count} / {max} অক্ষর',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'লোড হচ্ছে',
      noMatch: 'কোন মিল পওয়া যায়নি',
      noData: 'কোন ডাটা নেই',
      placeholder: 'নির্বাচন করুন',
    },
    mention: {
      loading: 'লোড হচ্ছে',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'কোন মিল পওয়া যায়নি',
      loading: 'লোড হচ্ছে',
      placeholder: 'নির্বাচন করুন',
      noData: 'কোন ডাটা নেই',
    },
    pagination: {
      goto: 'যান',
      pagesize: '/পেজ',
      total: 'মোট {total}',
      pageClassifier: '',
      page: 'Page', // 待翻译
      prev: 'Go to previous page', // 待翻译
      next: 'Go to next page', // 待翻译
      currentPage: 'page {pager}', // 待翻译
      prevPages: 'Previous {pager} pages', // 待翻译
      nextPages: 'Next {pager} pages', // 待翻译
      deprecationWarning:
        'অপ্রচলিত (Deprecated) ব্যাবহার পওয়া গেছে, আরও জানতে চাইলে, দয়া করে el-pagination এর ডকুমেন্টেশন দেখুন',
    },
    dialog: {
      close: 'Close this dialog', // 待翻译
    },
    drawer: {
      close: 'Close this dialog', // 待翻译
    },
    messagebox: {
      title: 'বার্তা',
      confirm: 'ঠিক আছে',
      cancel: 'বাতিল',
      error: 'ইনপুট ডাটা গ্রহনযোগ্য নয়',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'অপসারণ করতে "ডিলিট" এ ক্লিক করুন',
      delete: 'ডিলিট',
      preview: 'প্রিভিউ',
      continue: 'চালিয়ে যান',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'কোন ডাটা নেই',
      confirmFilter: 'নিশ্চিত করুন',
      resetFilter: 'রিসেট',
      clearFilter: 'সব',
      sumText: 'সারাংশ',
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
      emptyText: 'কোন ডাটা নেই',
    },
    transfer: {
      noMatch: 'কোন মিল পওয়া যায়নি',
      noData: 'কোন ডাটা নেই',
      titles: ['লিস্ট ১', 'লিস্ট ২'],
      filterPlaceholder: 'সার্চ করুন',
      noCheckedFormat: '{total} আইটেম',
      hasCheckedFormat: '{checked}/{total} টিক করা হয়েছে',
    },
    image: {
      error: 'ব্যর্থ হয়েছে',
    },
    pageHeader: {
      title: 'পিছনে',
    },
    popconfirm: {
      confirmButtonText: 'হ্যা',
      cancelButtonText: 'না',
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
