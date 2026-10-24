export default {
  name: 'ja',
  el: {
    breadcrumb: {
      label: 'Breadcrumb', // 待翻译
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'クリア',
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
      now: '現在',
      today: '今日',
      cancel: 'キャンセル',
      clear: 'クリア',
      confirm: 'OK',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: '日付を選択',
      selectTime: '時間を選択',
      startDate: '開始日',
      startTime: '開始時間',
      endDate: '終了日',
      endTime: '終了時間',
      prevYear: '前年',
      nextYear: '翌年',
      prevMonth: '前月',
      nextMonth: '翌月',
      year: '年',
      month1: '1月',
      month2: '2月',
      month3: '3月',
      month4: '4月',
      month5: '5月',
      month6: '6月',
      month7: '7月',
      month8: '8月',
      month9: '9月',
      month10: '10月',
      month11: '11月',
      month12: '12月',
      weeks: {
        sun: '日',
        mon: '月',
        tue: '火',
        wed: '水',
        thu: '木',
        fri: '金',
        sat: '土',
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
        jan: '1月',
        feb: '2月',
        mar: '3月',
        apr: '4月',
        may: '5月',
        jun: '6月',
        jul: '7月',
        aug: '8月',
        sep: '9月',
        oct: '10月',
        nov: '11月',
        dec: '12月',
      },
    },
    input: {
      characters: '{count} / {max} 文字',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'ロード中',
      noMatch: 'データなし',
      noData: 'データなし',
      placeholder: '選択してください',
    },
    mention: {
      loading: 'ロード中',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'データなし',
      loading: 'ロード中',
      placeholder: '選択してください',
      noData: 'データなし',
    },
    pagination: {
      goto: '',
      pagesize: '件/ページ',
      total: '総計 {total} 件',
      pageClassifier: 'ページ目へ',
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
      title: 'メッセージ',
      confirm: 'OK',
      cancel: 'キャンセル',
      error: '正しくない入力',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Delキーを押して削除する',
      delete: '削除する',
      preview: 'プレビュー',
      continue: '続行する',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'データなし',
      confirmFilter: '確認',
      resetFilter: '初期化',
      clearFilter: 'すべて',
      sumText: '合計',
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
      next: '次へ',
      previous: '前へ',
      finish: 'ツアー終了',
      close: 'Close this dialog', // 待翻译
    },
    tree: {
      emptyText: 'データなし',
    },
    transfer: {
      noMatch: 'データなし',
      noData: 'データなし',
      titles: ['リスト 1', 'リスト 2'],
      filterPlaceholder: 'キーワードを入力',
      noCheckedFormat: '総計 {total} 件',
      hasCheckedFormat: '{checked}/{total} を選択した',
    },
    image: {
      error: '失敗',
    },
    pageHeader: {
      title: '戻る',
    },
    popconfirm: {
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
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
