export default {
  name: 'ru',
  el: {
    breadcrumb: {
      label: 'Хлебные крошки',
    },
    colorpicker: {
      confirm: 'Ок',
      clear: 'Очистить',
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
      now: 'Сейчас',
      today: 'Сегодня',
      cancel: 'Отмена',
      clear: 'Очистить',
      confirm: 'Ок',
      dateTablePrompt:
        'Use the arrow keys and enter to select the day of the month', // 待翻译
      monthTablePrompt: 'Use the arrow keys and enter to select the month', // 待翻译
      quarterTablePrompt: 'Use the arrow keys and enter to select the quarter', // 待翻译
      yearTablePrompt: 'Use the arrow keys and enter to select the year', // 待翻译
      selectedDate: 'Selected date', // 待翻译
      selectDate: 'Выбрать дату',
      selectTime: 'Выбрать время',
      startDate: 'Дата начала',
      startTime: 'Время начала',
      endDate: 'Дата окончания',
      endTime: 'Время окончания',
      prevYear: 'Предыдущий год',
      nextYear: 'Следующий год',
      prevMonth: 'Предыдущий месяц',
      nextMonth: 'Следующий месяц',
      year: '',
      month1: 'Январь',
      month2: 'Февраль',
      month3: 'Март',
      month4: 'Апрель',
      month5: 'Май',
      month6: 'Июнь',
      month7: 'Июль',
      month8: 'Август',
      month9: 'Сентябрь',
      month10: 'Октябрь',
      month11: 'Ноябрь',
      month12: 'Декабрь',
      weeks: {
        sun: 'Вс',
        mon: 'Пн',
        tue: 'Вт',
        wed: 'Ср',
        thu: 'Чт',
        fri: 'Пт',
        sat: 'Сб',
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
        jan: 'Янв',
        feb: 'Фев',
        mar: 'Мар',
        apr: 'Апр',
        may: 'Май',
        jun: 'Июн',
        jul: 'Июл',
        aug: 'Авг',
        sep: 'Сен',
        oct: 'Окт',
        nov: 'Ноя',
        dec: 'Дек',
      },
    },
    input: {
      characters: '{count} / {max} символов',
    },
    inputNumber: {
      decrease: 'decrease number', // 待翻译
      increase: 'increase number', // 待翻译
    },
    select: {
      loading: 'Загрузка',
      noMatch: 'Совпадений не найдено',
      noData: 'Нет данных',
      placeholder: 'Выбрать',
    },
    mention: {
      loading: 'Загрузка',
    },
    dropdown: {
      toggleDropdown: 'Toggle Dropdown', // 待翻译
    },
    cascader: {
      noMatch: 'Совпадений не найдено',
      loading: 'Загрузка',
      placeholder: 'Выбрать',
      noData: 'Нет данных',
    },
    pagination: {
      goto: 'Перейти',
      pagesize: ' на странице',
      total: 'Всего {total}',
      pageClassifier: '',
      page: 'Страница',
      prev: 'Перейти на предыдущую страницу',
      next: 'Перейти на следующую страницу',
      currentPage: 'страница {pager}',
      prevPages: 'Предыдущие {pager} страниц',
      nextPages: 'Следующие {pager} страниц',
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
      title: 'Сообщение',
      confirm: 'Ок',
      cancel: 'Отмена',
      error: 'Недопустимый ввод данных',
      close: 'Close this dialog', // 待翻译
    },
    upload: {
      deleteTip: 'Нажмите [Удалить] для удаления',
      delete: 'Удалить',
      preview: 'Превью',
      continue: 'Продолжить',
    },
    slider: {
      defaultLabel: 'slider between {min} and {max}', // 待翻译
      defaultRangeStartLabel: 'pick start value', // 待翻译
      defaultRangeEndLabel: 'pick end value', // 待翻译
    },
    table: {
      emptyText: 'Нет данных',
      confirmFilter: 'Ок',
      resetFilter: 'Сбросить',
      clearFilter: 'Все',
      sumText: 'Сумма',
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
      next: 'Далее',
      previous: 'Назад',
      finish: 'Завершить',
      close: 'Close this dialog', // 待翻译
    },
    tree: {
      emptyText: 'Нет данных',
    },
    transfer: {
      noMatch: 'Совпадений не найдено',
      noData: 'Нет данных',
      titles: ['Список 1', 'Список 2'],
      filterPlaceholder: 'Введите ключевое слово',
      noCheckedFormat: '{total} пунктов',
      hasCheckedFormat: '{checked}/{total} выбрано',
    },
    image: {
      error: 'ОШИБКА',
    },
    pageHeader: {
      title: 'Назад',
    },
    popconfirm: {
      confirmButtonText: 'Ок',
      cancelButtonText: 'Отмена',
    },
    carousel: {
      leftArrow: 'Слайдер стрелка влево',
      rightArrow: 'Слайдер стрелка вправо',
      indicator: 'Слайдер перейти на страницу под номером {index}',
    },
    inputOTP: {
      groupLabel: 'OTP Input', // 待翻译
      defaultLabel: 'Please enter OTP character {index}', // 待翻译
    },
  },
}
