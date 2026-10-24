export default {
  name: 'th',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'ตกลง',
      clear: 'ล้างข้อมูล',
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
      now: 'ตอนนี้',
      today: 'วันนี้',
      cancel: 'ยกเลิก',
      clear: 'ล้างข้อมูล',
      confirm: 'ตกลง',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'เลือกวันที่',
      selectTime: 'เลือกเวลา',
      startDate: 'วันที่เริ่มต้น',
      startTime: 'เวลาเริ่มต้น',
      endDate: 'วันที่สิ้นสุด',
      endTime: 'เวลาสิ้นสุด',
      prevYear: 'ปีก่อนหน้า',
      nextYear: 'ปีถัดไป',
      prevMonth: 'เดือนก่อนหน้า',
      nextMonth: 'เดือนถัดไป',
      year: 'ปี',
      month1: 'มกราคม',
      month2: 'กุมภาพันธ์',
      month3: 'มีนาคม',
      month4: 'เมษายน',
      month5: 'พฤษภาคม',
      month6: 'มิถุนายน',
      month7: 'กรกฎาคม',
      month8: 'สิงหาคม',
      month9: 'กันยายน',
      month10: 'ตุลาคม',
      month11: 'พฤศจิกายน',
      month12: 'ธันวาคม',
      weeks: {
        sun: 'อา',
        mon: 'จ',
        tue: 'อ',
        wed: 'พ',
        thu: 'พฤ',
        fri: 'ศ',
        sat: 'ส',
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
        jan: 'ม.ค.',
        feb: 'ก.พ.',
        mar: 'มี.ค.',
        apr: 'เม.ย.',
        may: 'พ.ค.',
        jun: 'มิ.ย.',
        jul: 'ก.ค.',
        aug: 'ส.ค.',
        sep: 'ก.ย.',
        oct: 'ต.ค.',
        nov: 'พ.ย.',
        dec: 'ธ.ค.',
      },
    },
    input: {
      characters: '{count} / {max} ตัวอักษร',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'กำลังโหลด',
      noMatch: 'ไม่พบข้อมูลที่ตรงกัน',
      noData: 'ไม่พบข้อมูล',
      placeholder: 'เลือก',
    },
    mention: {
      loading: 'กำลังโหลด',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'ไม่พบข้อมูลที่ตรงกัน',
      loading: 'กำลังโหลด',
      placeholder: 'เลือก',
      noData: 'ไม่พบข้อมูล',
    },
    pagination: {
      goto: 'ไปที่',
      pagesize: '/หน้า',
      total: 'ทั้งหมด {total}',
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
      title: 'ข้อความ',
      confirm: 'ตกลง',
      cancel: 'ยกเลิก',
      error: 'คุณป้อนข้อมูลไม่ถูกต้อง',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'กดปุ่ม "ลบ" เพื่อลบออก',
      delete: 'ลบ',
      preview: 'ตัวอย่าง',
      continue: 'ทำต่อ',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'ไม่พบข้อมูล',
      confirmFilter: 'ยืนยัน',
      resetFilter: 'รีเซ็ต',
      clearFilter: 'ทั้งหมด',
      sumText: 'รวม',
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
      next: 'ถัดไป',
      previous: 'ย้อนกลับ',
      finish: 'เสร็จสิ้น',
      close: 'Close this dialog', // 待翻译
    },
    tree: {
      emptyText: 'ไม่พบข้อมูล',
    },
    transfer: {
      noMatch: 'ไม่พบข้อมูลที่ตรงกัน',
      noData: 'ไม่พบข้อมูล',
      titles: ['List 1', 'List 2'], // 待翻译
      filterPlaceholder: 'กรอกคีย์เวิร์ด',
      noCheckedFormat: '{total} items', // 待翻译
      hasCheckedFormat: '{checked}/{total} checked', // 待翻译
    },
    image: {
      error: 'FAILED', // 待翻译
    },
    pageHeader: {
      title: 'ย้อนกลับ',
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
