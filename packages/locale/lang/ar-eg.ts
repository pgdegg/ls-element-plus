export default {
  name: 'ar-eg',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'موافق',
      clear: 'إزالة',
      defaultLabel: 'إختر اللون',
      description: 'اللون الحالي هو {color}. اضفط انتر لاختيار لون جديد',
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
      now: 'الآن',
      today: 'اليوم',
      cancel: 'إلغاء',
      clear: 'إزالة',
      confirm: 'موافق',
      dateTablePrompt:
        'استخدم مفاتيح الاسهم و اضغط انتر لاختيار اليوم المراد من الشهر',
      monthTablePrompt: 'استخدم مفاتيح الاسهم واضغط انتر لاختيار الشهر',
      quarterTablePrompt: 'استخدم مفاتيح الاسهم واضغط انتر لاختيار الربع',
      yearTablePrompt: 'استخدم مفاتيح الاسهم واضغط انتر لاختيار السنة',
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'إختر التاريخ',
      selectTime: 'إختر الوقت',
      startDate: 'تاريخ البدء',
      startTime: 'وقت البدء',
      endDate: 'تاريخ الإنتهاء',
      endTime: 'وقت الإنتهاء',
      prevYear: 'السنة السابقة',
      nextYear: 'السنة التالية',
      prevMonth: 'الشهر السابق',
      nextMonth: 'الشهر التالي',
      year: 'سنة',
      month1: 'يناير',
      month2: 'فبراير',
      month3: 'مارس',
      month4: 'أبريل',
      month5: 'مايو',
      month6: 'يونيو',
      month7: 'يوليو',
      month8: 'أغسطس',
      month9: 'سبتمبر',
      month10: 'أكتوبر',
      month11: 'نوفمبر',
      month12: 'ديسمبر',
      weeks: {
        sun: 'الأحد',
        mon: 'الأثنين',
        tue: 'الثلاثاء',
        wed: 'الأربعاء',
        thu: 'الخميس',
        fri: 'الجمعة',
        sat: 'السبت',
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
        jan: 'يناير',
        feb: 'فبراير',
        mar: 'مارس',
        apr: 'أبريل',
        may: 'مايو',
        jun: 'يونيو',
        jul: 'يوليو',
        aug: 'أغسطس',
        sep: 'سبتمبر',
        oct: 'أكتوبر',
        nov: 'نوفمبر',
        dec: 'ديسمبر',
      },
    },
    input: {
      characters: '{count} / {max} حرف',
    },
    inputNumber: {
      decrease: 'طرح رقم',
      increase: 'زيادة رقم',
    },
    select: {
      loading: 'جار التحميل',
      noMatch: 'لايوجد بيانات مطابقة',
      noData: 'لايوجد بيانات',
      placeholder: 'إختر',
    },
    mention: {
      loading: 'جار التحميل',
    },
    dropdown: {
      toggleDropdown: 'تبديل القائمة',
    },
    cascader: {
      noMatch: 'لايوجد بيانات مطابقة',
      loading: 'جار التحميل',
      placeholder: 'إختر',
      noData: 'لايوجد بيانات',
    },
    pagination: {
      goto: 'أذهب إلى',
      pagesize: '/صفحة',
      total: 'الكل {total}',
      pageClassifier: '',
      page: 'صفحة',
      prev: 'انتقل إلى الصفحة السابقة',
      next: 'انتقل إلى الصفحة التالية',
      currentPage: 'صفحة رقم {pager}',
      prevPages: 'صفحات {pager} السابقة',
      nextPages: 'صفحات {pager} التالية',
      deprecationWarning:
        'Deprecated usages detected, please refer to the el-pagination documentation for more details', // 待翻译
    },
    dialog: {
      close: 'أغلق هذا التبويب',
    },
    drawer: {
      close: 'أغلق هذا التبويب',
    },
    messagebox: {
      title: 'العنوان',
      confirm: 'موافق',
      cancel: 'إلغاء',
      error: 'مدخل غير صحيح',
      close: 'أغلق هذا التبويب',
    },
    upload: {
      deleteTip: 'اضغط ازالة لحذف المحتوى',
      delete: 'حذف',
      preview: 'عرض',
      continue: 'إستمرار',
    },
    slider: {
      defaultLabel: 'شريط التمرير بين {min} و {max}',
      defaultRangeStartLabel: 'اختر قيمة البدء',
      defaultRangeEndLabel: 'اختر قيمة النهاية',
    },
    table: {
      emptyText: 'لايوجد بيانات',
      confirmFilter: 'تأكيد',
      resetFilter: 'حذف',
      clearFilter: 'الكل',
      sumText: 'المجموع',
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
      emptyText: 'لايوجد بيانات',
    },
    transfer: {
      noMatch: 'لايوجد بيانات مطابقة',
      noData: 'لايوجد بيانات',
      titles: ['قائمة 1', 'قائمة 2'],
      filterPlaceholder: 'ادخل كلمة',
      noCheckedFormat: '{total} عناصر',
      hasCheckedFormat: '{checked}/{total} مختار',
    },
    image: {
      error: 'فشل',
    },
    pageHeader: {
      title: 'عودة',
    },
    popconfirm: {
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
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
