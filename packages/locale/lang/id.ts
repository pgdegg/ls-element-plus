export default {
  name: 'id',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'Pilih',
      clear: 'Kosongkan',
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
      now: 'Sekarang',
      today: 'Hari ini',
      cancel: 'Batal',
      clear: 'Kosongkan',
      confirm: 'Ya',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Pilih tanggal',
      selectTime: 'Pilih waktu',
      startDate: 'Tanggal Mulai',
      startTime: 'Waktu Mulai',
      endDate: 'Tanggal Selesai',
      endTime: 'Waktu Selesai',
      prevYear: 'Tahun Sebelumnya',
      nextYear: 'Tahun Selanjutnya',
      prevMonth: 'Bulan Sebelumnya',
      nextMonth: 'Bulan Selanjutnya',
      year: 'Tahun',
      month1: 'Januari',
      month2: 'Februari',
      month3: 'Maret',
      month4: 'April',
      month5: 'Mei',
      month6: 'Juni',
      month7: 'Juli',
      month8: 'Agustus',
      month9: 'September',
      month10: 'Oktober',
      month11: 'November',
      month12: 'Desember',
      weeks: {
        sun: 'Min',
        mon: 'Sen',
        tue: 'Sel',
        wed: 'Rab',
        thu: 'Kam',
        fri: 'Jum',
        sat: 'Sab',
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
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Mei',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Agu',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Des',
      },
    },
    input: {
      characters: '{count} / {max} karakter',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Memuat',
      noMatch: 'Tidak ada data yg cocok',
      noData: 'Tidak ada data',
      placeholder: 'Pilih',
    },
    mention: {
      loading: 'Memuat',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Tidak ada data yg cocok',
      loading: 'Memuat',
      placeholder: 'Pilih',
      noData: 'Tidak ada data',
    },
    pagination: {
      goto: 'Pergi ke',
      pagesize: '/halaman',
      total: 'Total {total}',
      pageClassifier: '',
      page: 'Page', // 待翻译
      prev: 'Go to previous page', // 待翻译
      next: 'Go to next page', // 待翻译
      currentPage: 'page {pager}', // 待翻译
      prevPages: 'Previous {pager} pages', // 待翻译
      nextPages: 'Next {pager} pages', // 待翻译
      deprecationWarning:
        'Penggunaan yang tidak akan digunakan lagi terdeteksi, silakan lihat dokumentasi el-pagination untuk lebih jelasnya',
    },
    dialog: {
      close: 'Close this dialog', // 待翻译
    },
    drawer: {
      close: 'Close this dialog', // 待翻译
    },
    messagebox: {
      title: 'Pesan',
      confirm: 'Ya',
      cancel: 'Batal',
      error: 'Masukan ilegal',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Tekan hapus untuk melanjutkan',
      delete: 'Hapus',
      preview: 'Pratinjau',
      continue: 'Lanjutkan',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Tidak ada data',
      confirmFilter: 'Konfirmasi',
      resetFilter: 'Atur ulang',
      clearFilter: 'Semua',
      sumText: 'Jumlah',
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
      emptyText: 'Tidak ada data',
    },
    transfer: {
      noMatch: 'Tidak ada data yg cocok',
      noData: 'Tidak ada data',
      titles: ['Daftar 1', 'Daftar 2'],
      filterPlaceholder: 'Masukan kata kunci',
      noCheckedFormat: '{total} item',
      hasCheckedFormat: '{checked}/{total} terpilih',
    },
    image: {
      error: 'GAGAL',
    },
    pageHeader: {
      title: 'Kembali',
    },
    popconfirm: {
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
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
