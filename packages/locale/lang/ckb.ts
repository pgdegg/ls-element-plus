export default {
  name: 'ckb',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'باشە',
      clear: 'پاککردنەوە',
      defaultLabel: 'هەڵبژاردنی ڕەنگ',
      description:
        'ڕەنگی ئێستا {color}. ئینتەر دابگرە بۆ هەڵبژاردنی ڕەنگی نوێ.',
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
      now: 'ئێستا',
      today: 'ئەمڕۆ',
      cancel: 'پەشیمانبوونەوە',
      clear: 'پاککردنەوە',
      confirm: 'باشە',
      dateTablePrompt:
        'کلیلی ئاراستەکان بەکاربهێنەر بۆ هەڵبژاردنی ڕۆژی مانگەکە',
      monthTablePrompt: 'کلیلی ئاراستەکان بەکاربهێنەر بۆ هەڵبژاردنی مانگ',
      quarterTablePrompt:
        'کلیلی ئاراستەکان بەکاربهێنەر بۆ هەڵبژاردنی چارەکی ساڵ',
      yearTablePrompt: 'کلیلی ئاراستەکان بەکاربهێنەر بۆ هەڵبژاردنی ساڵ',
      selectedDate: 'بەرواری هەڵبژێردراو',
      selectDate: 'هەڵبژاردنی بەروار',
      selectTime: 'هەڵبژاردنی کات',
      startDate: 'بەرواری دەستپێک',
      startTime: 'کاتی دەستپێک',
      endDate: 'بەرواری کۆتایی',
      endTime: 'کاتی کۆتایی',
      prevYear: 'ساڵی پێشوو',
      nextYear: 'ساڵ داهاتوو',
      prevMonth: 'مانگی پێشوو',
      nextMonth: 'مانگی داهاتوو',
      year: '',
      month1: 'ڕێبەندان',
      month2: 'ڕەشەمە',
      month3: 'نەورۆز',
      month4: 'گوڵان',
      month5: 'جۆزەردان',
      month6: 'پووشپەڕ',
      month7: 'گەلاوێژ',
      month8: 'خەرمانان',
      month9: 'ڕەزبەر',
      month10: 'گەڵاڕێزان',
      month11: 'سەرماوەز',
      month12: 'بەفرانبار',
      weeks: {
        sun: 'یەکشەممە',
        mon: 'دووشەممە',
        tue: 'سێشەممە',
        wed: 'چوارشەممە',
        thu: 'پێنجشەممە',
        fri: 'هەینی',
        sat: 'شەممە',
      },
      weeksFull: {
        sun: 'یەکشەممە',
        mon: 'دووشەممە',
        tue: 'سێشەممە',
        wed: 'چوارشەممە',
        thu: 'پێنجشەممە',
        fri: 'هەینی',
        sat: 'شەممە',
      },
      months: {
        jan: 'ڕێبەندان',
        feb: 'ڕەشەمە',
        mar: 'نەورۆز',
        apr: 'گوڵان',
        may: 'جۆزەردان',
        jun: 'پووشپەڕ',
        jul: 'گەلاوێژ',
        aug: 'خەرمانان',
        sep: 'ڕەزبەر',
        oct: 'گەڵاڕێزان',
        nov: 'سەرماوەز',
        dec: 'بەفرانبار',
      },
    },
    input: {
      characters: '{count} / {max} پیت',
    },
    inputNumber: {
      decrease: 'کەمکردنەوەی ژمارە',
      increase: 'زیادکردنی ژمارە',
    },
    select: {
      loading: 'بارکردن',
      noMatch: 'هیچ داتایەکی هاوتا نیە',
      noData: 'هیچ داتایەک نیە',
      placeholder: 'هەڵبژاردن',
    },
    mention: {
      loading: 'بارکردن',
    },
    dropdown: {
      toggleDropdown: 'کردنەوەو داخستنی کشاو',
    },
    cascader: {
      noMatch: 'هیچ داتایەکی هاوتا نیە',
      loading: 'بارکردن',
      placeholder: 'هەڵبژاردن',
      noData: 'هیچ داتایەک نیە',
    },
    pagination: {
      goto: 'بڕۆ بۆ',
      pagesize: '/لاپەڕە',
      total: 'کۆی گشتیی {total}',
      pageClassifier: '',
      page: 'Page', // 待翻译
      prev: 'Go to previous page', // 待翻译
      next: 'Go to next page', // 待翻译
      currentPage: 'page {pager}', // 待翻译
      prevPages: 'Previous {pager} pages', // 待翻译
      nextPages: 'Next {pager} pages', // 待翻译
      deprecationWarning:
        'بەکارهێنانی بەکارنەهێنراو دۆزراوەتەوە، تکایە بۆ وردەکاری زیاتر سەردانی بەڵگەنامەکانی el-pagination بکە',
    },
    dialog: {
      close: 'داخستنی ئەم دیالۆگە',
    },
    drawer: {
      close: 'داخستنی ئەم دیالۆگە',
    },
    messagebox: {
      title: 'پەیام',
      confirm: 'باشە',
      cancel: 'پەشایمانبوونەوە',
      error: 'داخلکردنی نایاسایی',
      close: 'داخستنی ئەم دیالۆگە',
    },
    upload: {
      deleteTip: 'فشار لەسەر سڕینەوە بکە بۆ لابردن',
      delete: 'سڕینەوە',
      preview: 'بینینەوە',
      continue: 'بەردەوامبوون',
    },
    slider: {
      defaultLabel: 'سلاید لە نێوان {min} و {max}',
      defaultRangeStartLabel: 'بەهای دەستپێک هەلبژێرە',
      defaultRangeEndLabel: 'بەهای کۆتایی هەلبژێرە',
    },
    table: {
      emptyText: 'هیچ داتا نیە',
      confirmFilter: 'دووپاتکردنەوە',
      resetFilter: 'جێگیرکردنەوە',
      clearFilter: 'هەموو',
      sumText: 'کۆ',
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
      emptyText: 'هیچ داتا نیە',
    },
    transfer: {
      noMatch: 'هیچ داتای هاوتا نیە',
      noData: 'هیچ داتا نیە',
      titles: ['لیستی 1', 'لیستی 2'],
      filterPlaceholder: 'کلیلەوشە داخڵ بکە',
      noCheckedFormat: '{total} دانە',
      hasCheckedFormat: '{checked}/{total} هەڵبژێردراوە',
    },
    image: {
      error: 'شکستی هێنا',
    },
    pageHeader: {
      title: 'گەڕانەوە',
    },
    popconfirm: {
      confirmButtonText: 'بەڵێ',
      cancelButtonText: 'نەخێر',
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
