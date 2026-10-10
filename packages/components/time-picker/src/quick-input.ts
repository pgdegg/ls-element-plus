import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

import type { Dayjs } from 'dayjs'

dayjs.extend(customParseFormat)

/**
 * 日期或时间字符串中的分隔符数组
 * @description 用于设置了默认极值，尝试部分匹配
 */
const DATE_OR_TIME_SEPARATORS = [
  ':',
  '-',
  '/',
  '|',
  '.',
  ' ',
  '+',
  '_',
  '*',
  '@',
  '#',
  '$',
  '',
]

/**
 * 多种输入格式的日期字符串的数组
 */
const DATE_SUPPORTED_FORMATS = Object.freeze([
  'YYYYMMDD', // 20261231
  'YYYY-MM-DD', // 2026-12-31
  'YYYY/MM/DD', // 2026/12/31
  'YYYY|MM|DD', // 2026|12|31
  'YYYY.MM.DD', // 2026.12.31
  'YYYY MM DD', // 2026 12 31,
  'YYYY+MM+DD', // 2026+12+31
  'YYYY_MM_DD', // 2026_12_31
  'YYYY*MM*DD', // 2026*12*31
  'YYYY@MM@DD', // 2026@12@31
  'YYYY#MM#DD', // 2026#12#31
  'YYYY$MM$DD', // 2026$12$31
  'YYYY-MMDD', // 2026-1231
  'YYYY/MMDD', // 2026/1231
  'YYYY|MMDD', // 2026|1231
  'YYYY.MMDD', // 2026.1231
  'YYYY MMDD', // 2026 1231
  'YYYYMM-DD', // 202612-31
  'YYYYMM/DD', // 202612/31
  'YYYYMM|DD', // 202612|31
  'YYYYMM.DD', // 202612.31
  'YYYYMM DD', // 202612 31
  // 完整格式 - 单位数字月份
  'YYYY-M-DD', // 2026-1-31
  'YYYY/M/DD', // 2026/1/31
  'YYYY|M|DD', // 2026|1|31
  'YYYY.M.DD', // 2026.1.31
  'YYYY M DD', // 2026 1 31
  'YYYY+M+DD', // 2026+1+31
  'YYYY_M_DD', // 2026_1_31
  'YYYY*M*DD', // 2026*1*31
  'YYYY@M@DD', // 2026@1@31
  'YYYY#M#DD', // 2026#1#31
  'YYYY$M$DD', // 2026$1$31
  // 完整格式 - 单位数字日
  'YYYY-MM-D', // 2026-12-1
  'YYYY/MM/D', // 2026/12/1
  'YYYY|MM|D', // 2026|12|1
  'YYYY.MM.D', // 2026.12.1
  'YYYY MM D', // 2026 12 1
  'YYYY+MM+D', // 2026+12+1
  'YYYY_MM_D', // 2026_12_1
  'YYYY*MM*D', // 2026*12*1
  'YYYY@MM@D', // 2026@12@1
  'YYYY#MM#D', // 2026#12#1
  'YYYY$MM$D', // 2026$12$1
  // 完整格式 - 单位数字月份和日
  'YYYY-M-D', // 2026-1-1
  'YYYY/M/D', // 2026/1/1
  'YYYY|M|D', // 2026|1|1
  'YYYY.M.D', // 2026.1.2
  'YYYY M D', // 2026 1 2
  'YYYY+M+D', // 2026+1+2
  'YYYY_M_D', // 2026_1_2
  'YYYY*M*D', // 2026*1*2
  'YYYY@M@D', // 2026@1@2
  'YYYY#M#D', // 2026#1#2
  'YYYY$M$D', // 2026$1$2
  // 短格式（两位年份）- 完整格式
  'YYMMDD', // 261231
  'YY-MM-DD', // 26-12-31
  'YY/MM/DD', // 26/12/31
  'YY|MM|DD', // 26|12|31
  'YY.MM.DD', // 26.12.31
  'YY MM DD', // 26 12 31
  'YY+MM+DD', // 26+12+31
  'YY_MM_DD', // 26_12_31
  'YY*MM*DD', // 26*12*31
  'YY@MM@DD', // 26@12@31
  'YY#MM#DD', // 26#12#31
  'YY$MM$DD', // 26$12$31
  // 短格式 - 单位数字月份
  'YY-M-DD', // 26-1-31
  'YY/M/DD', // 26/1/31
  'YY|M|DD', // 26|1|31
  'YY.M.DD', // 26.1.31
  'YY M DD', // 26 1 31
  // 短格式 - 单位数字日
  'YY-MM-D', // 26-12-1
  'YY/MM/D', // 26/12/1
  'YY|MM|D', // 26|12|1
  'YY.MM.D', // 26.12.1
  'YY MM D', // 26 12 1
  // 短格式 - 单位数字月份和日
  'YY-M-D', // 26-1-1
  'YY/M/D', // 26/1/1
  'YY|M|D', // 26|1|1
  'YY.M.D', // 26.1.1
  'YY M D', // 26 1 1
])

/**
 * 多种输入格式的时间字符串的数组
 */
const TIME_SUPPORTED_FORMATS = Object.freeze([
  'HHmmss', // 235959
  'HH:mm:ss', // 23:59:59
  'HH/mm/ss', // 23/59/59
  'HH|mm|ss', // 23|59|59
  'HH.mm.ss', // 23.59.59
  'HH mm ss', // 23 59 59,
  'HH+mm+ss', // 23+59+59
  'HH_mm_ss', // 23_59_59
  'HH*mm*ss', // 23*59*59
  'HH@mm@ss', // 23@59@59
  'HH#mm#ss', // 23#59#59
  'HH$mm$ss', // 23$59$59
  // 短格式（单一时间）
  'Hms', // 235959
  'H:m:s', // 23:59:59
  'H/m/s', // 23/59/59
  'H|m|s', // 23|59|59
  'H.m.s', // 23.59.59
  'H m s', // 23 59 59,
  'H+m+s', // 23+59+59
  'H_m_s', // 23_59_59
  'H*m*s', // 23*59*59
  'H@m@s', // 23@59@59
  'H#m#s', // 23#59#59
  'H$m$s', // 23$59$59
])

/**
 * 多种输入格式的日期字符串的数组（含时间部分）
 */
export const DATETIME_SUPPORTED_FORMATS = Object.freeze([
  'YYYYMMDDHHmmss', // 20261231235959
  'YYYY-MM-DD HH:mm:ss', // 2026-12-31 23:59:59
  'YYYY/MM/DD HH:mm:ss', // 2026/12/31 23:59:59
  'YYYY|MM|DD HH:mm:ss', // 2026|12|31 23:59:59
  'YYYY.MM.DD HH:mm:ss', // 2026.12.31 23:59:59
  'YYYY MM DD HH:mm:ss', // 2026 12 31 23:59:59,
  'YYYY+MM+DD HH:mm:ss', // 2026+12+31 23:59:59
  'YYYY_MM_DD HH:mm:ss', // 2026_12_31 23:59:59
  'YYYY*MM*DD HH:mm:ss', // 2026*12*31 23:59:59
  'YYYY@MM@DD HH:mm:ss', // 2026@12@31 23:59:59
  'YYYY#MM#DD HH:mm:ss', // 2026#12#31 23:59:59
  'YYYY$MM$DD HH:mm:ss', // 2026$12$31 23:59:59
  'YYYY-MMDD HH:mm:ss', // 2026-1231 23:59:59
  'YYYY/MMDD HH:mm:ss', // 2026/1231 23:59:59
  'YYYY|MMDD HH:mm:ss', // 2026|1231 23:59:59
  'YYYY.MMDD HH:mm:ss', // 2026.1231 23:59:59
  'YYYY MMDD HH:mm:ss', // 2026 1231 23:59:59
  'YYYYMM-DD HH:mm:ss', // 202612-31 23:59:59
  'YYYYMM/DD HH:mm:ss', // 202612/31 23:59:59
  'YYYYMM|DD HH:mm:ss', // 202612|31 23:59:59
  'YYYYMM.DD HH:mm:ss', // 202612.31 23:59:59
  'YYYYMM DD HH:mm:ss', // 202612 31 23:59:59
  'YYYYMMDD HH:mm:ss', // 20261231 23:59:59
  'YYYY-MM-DD-HH-mm-ss', // 2026-12-31-23-59-59
  'YYYY/MM/DD/HH/mm/ss', // 2026/12/31/23/59/59
  'YYYY|MM|DD|HH|mm|ss', // 2026|12|31|23|59|59
  'YYYY.MM.DD.HH.mm.ss', // 2026.12.31.23.59.59
  'YYYY MM DD HH mm ss', // 2026 12 31 23 59 59
  'YYYY+MM+DD+HH+mm+ss', // 2026+12+31+23+59+59
  'YYYY_MM_DD_HH_mm_ss', // 2026_12_31_23_59_59
  'YYYY*MM*DD*HH*mm*ss', // 2026*12*31*23*59*59
  'YYYY@MM@DD@HH@mm@ss', // 2026@12@31@23@59@59
  'YYYY#MM#DD#HH#mm#ss', // 2026#12#31#23#59#59
  'YYYY$MM$DD$HH$mm$ss', // 2026$12$31$23$59$59
  'YYYY-MMDD-HH-mm-ss', // 2026-1231-23-59-59
  'YYYY/MMDD/HH/mm/ss', // 2026/1231/23/59/59
  'YYYY|MMDD|HH|mm|ss', // 2026|1231|23|59|59
  'YYYY.MMDD.HH.mm.ss', // 2026.1231.23.59.59
  'YYYY MMDD HH mm ss', // 2026 1231 23 59 59
  'YYYYMM-DD-HH-mm-ss', // 202612-31-23-59-59
  'YYYYMM/DD/HH/mm/ss', // 202612/31/23/59/59
  'YYYYMM|DD|HH|mm|ss', // 202612|31|23|59|59
  'YYYYMM.DD.HH.mm.ss', // 202612.31.23.59.59
  'YYYYMM DD HH mm ss', // 202612 31 23 59 59
  'YYYYMMDD-HH-mm-ss', // 20261231-23-59-59
  'YYYYMMDD/HH/mm/ss', // 20261231/23/59/59
  'YYYYMMDD|HH|mm|ss', // 20261231|23|59|59
  'YYYYMMDD.HH.mm.ss', // 20261231.23.59.59
  'YYYYMMDD HH mm ss', // 20261231 23 59 59
  // 短格式（两位年份）
  'YYMMDDHHmmss', // 261231235959
  'YY-MM-DD HH:mm:ss', // 26-12-31 23:59:59
  'YY/MM/DD HH:mm:ss', // 26/12/31 23:59:59
  'YY|MM|DD HH:mm:ss', // 26|12|31 23:59:59
  'YY.MM.DD HH:mm:ss', // 26.12.31 23:59:59
  'YY MM DD HH:mm:ss', // 26 12 31 23:59:59
  'YYMMDD HH:mm:ss', // 261231 23:59:59
  // 短格式 - 带单位数字
  'YY-M-D H:m:s', // 26-1-1 1:2:3
  'YY/M/D H:m:s', // 26/1/1 1:2:3
  'YY-MM-DD H:m:s', // 26-12-31 1:2:3
  'YY/MM/DD H:m:s', // 26/12/31 1:2:3
  'YY-M-DD H:m:s', // 26-1-31 1:2:3
  'YY/M/DD H:m:s', // 26/1/31 1:2:3
  'YY-MM-D H:m:s', // 26-12-1 1:2:3
  'YY/MM/D H:m:s', // 26/12/1 1:2:3
  'YY-M-D HH:mm:ss', // 26-1-1 23:59:59
  'YY/M/D HH:mm:ss', // 26/1/1 23:59:59
])

type PartialFormatsType = 'date' | 'time' | 'date-time'

/**
 * 设置了默认极值，尝试部分匹配
 * @param type 时间类型
 */
const generatePartialFormats = (type: PartialFormatsType): string[] => {
  const partialFormats: string[] = []

  for (const sep of DATE_OR_TIME_SEPARATORS) {
    if (type === 'date') {
      // 四位年份格式 - 双位数字
      partialFormats.push(`YYYY${sep}MM${sep}DD`)
      partialFormats.push(`YYYY${sep}MM`)
      partialFormats.push('YYYY')
      // 四位年份格式 - 单位数字月份
      partialFormats.push(`YYYY${sep}M${sep}DD`)
      partialFormats.push(`YYYY${sep}M`)
      // 四位年份格式 - 单位数字日
      partialFormats.push(`YYYY${sep}MM${sep}D`)
      // 四位年份格式 - 单位数字月份和日
      partialFormats.push(`YYYY${sep}M${sep}D`)
      // 两位年份格式 - 双位数字
      partialFormats.push(`YY${sep}MM${sep}DD`)
      partialFormats.push(`YY${sep}MM`)
      partialFormats.push('YY')
      // 两位年份格式 - 单位数字月份
      partialFormats.push(`YY${sep}M${sep}DD`)
      partialFormats.push(`YY${sep}M`)
      // 两位年份格式 - 单位数字日
      partialFormats.push(`YY${sep}MM${sep}D`)
      // 两位年份格式 - 单位数字月份和日
      partialFormats.push(`YY${sep}M${sep}D`)
    } else if (type === 'time') {
      partialFormats.push(`HH${sep}mm${sep}ss`)
      partialFormats.push(`HH${sep}m${sep}ss`)
      partialFormats.push(`HH${sep}mm${sep}s`)
      partialFormats.push(`HH${sep}m${sep}s`)
      partialFormats.push(`H${sep}mm${sep}ss`)
      partialFormats.push(`H${sep}m${sep}ss`)
      partialFormats.push(`H${sep}mm${sep}s`)
      partialFormats.push(`H${sep}m${sep}s`)
      partialFormats.push(`HH${sep}mm`)
      partialFormats.push(`HH${sep}m`)
      partialFormats.push(`H${sep}mm`)
      partialFormats.push(`H${sep}m`)
      partialFormats.push('HH')
      partialFormats.push('H')
    } else if (type === 'date-time') {
      // 日期时间部分格式
      const dateSep = sep || ''
      const timeSep = sep === '' ? '' : ':'
      const dtSep = sep === '' ? '' : ' '

      // 四位年份 - 双位数字
      partialFormats.push(
        `YYYY${dateSep}MM${dateSep}DD${dtSep}HH${timeSep}mm${timeSep}ss`
      )
      partialFormats.push(`YYYY${dateSep}MM${dateSep}DD${dtSep}HH${timeSep}mm`)
      partialFormats.push(`YYYY${dateSep}MM${dateSep}DD${dtSep}HH`)
      partialFormats.push(`YYYY${dateSep}MM${dateSep}DD`)
      partialFormats.push(`YYYY${dateSep}MM`)
      partialFormats.push('YYYY')
      // 四位年份 - 单位数字月份
      partialFormats.push(
        `YYYY${dateSep}M${dateSep}DD${dtSep}HH${timeSep}mm${timeSep}ss`
      )
      partialFormats.push(`YYYY${dateSep}M${dateSep}DD${dtSep}HH${timeSep}mm`)
      partialFormats.push(`YYYY${dateSep}M${dateSep}DD${dtSep}HH`)
      partialFormats.push(`YYYY${dateSep}M${dateSep}DD`)
      partialFormats.push(`YYYY${dateSep}M`)
      // 四位年份 - 单位数字日
      partialFormats.push(
        `YYYY${dateSep}MM${dateSep}D${dtSep}HH${timeSep}mm${timeSep}ss`
      )
      partialFormats.push(`YYYY${dateSep}MM${dateSep}D${dtSep}HH${timeSep}mm`)
      partialFormats.push(`YYYY${dateSep}MM${dateSep}D${dtSep}HH`)
      partialFormats.push(`YYYY${dateSep}MM${dateSep}D`)
      // 四位年份 - 单位数字月份和日
      partialFormats.push(
        `YYYY${dateSep}M${dateSep}D${dtSep}HH${timeSep}mm${timeSep}ss`
      )
      partialFormats.push(`YYYY${dateSep}M${dateSep}D${dtSep}HH${timeSep}mm`)
      partialFormats.push(`YYYY${dateSep}M${dateSep}D${dtSep}HH`)
      partialFormats.push(`YYYY${dateSep}M${dateSep}D`)
      // 四位年份 - 单位数字时间
      partialFormats.push(
        `YYYY${dateSep}MM${dateSep}DD${dtSep}H${timeSep}m${timeSep}s`
      )
      partialFormats.push(`YYYY${dateSep}MM${dateSep}DD${dtSep}H${timeSep}m`)
      partialFormats.push(`YYYY${dateSep}MM${dateSep}DD${dtSep}H`)
      partialFormats.push(
        `YYYY${dateSep}M${dateSep}D${dtSep}H${timeSep}m${timeSep}s`
      )
      partialFormats.push(`YYYY${dateSep}M${dateSep}D${dtSep}H${timeSep}m`)
      partialFormats.push(`YYYY${dateSep}M${dateSep}D${dtSep}H`)
      // 两位年份 - 双位数字
      partialFormats.push(
        `YY${dateSep}MM${dateSep}DD${dtSep}HH${timeSep}mm${timeSep}ss`
      )
      partialFormats.push(`YY${dateSep}MM${dateSep}DD${dtSep}HH${timeSep}mm`)
      partialFormats.push(`YY${dateSep}MM${dateSep}DD${dtSep}HH`)
      partialFormats.push(`YY${dateSep}MM${dateSep}DD`)
      partialFormats.push(`YY${dateSep}MM`)
      partialFormats.push('YY')
      // 两位年份 - 单位数字月份
      partialFormats.push(
        `YY${dateSep}M${dateSep}DD${dtSep}HH${timeSep}mm${timeSep}ss`
      )
      partialFormats.push(`YY${dateSep}M${dateSep}DD${dtSep}HH${timeSep}mm`)
      partialFormats.push(`YY${dateSep}M${dateSep}DD${dtSep}HH`)
      partialFormats.push(`YY${dateSep}M${dateSep}DD`)
      partialFormats.push(`YY${dateSep}M`)
      // 两位年份 - 单位数字日
      partialFormats.push(
        `YY${dateSep}MM${dateSep}D${dtSep}HH${timeSep}mm${timeSep}ss`
      )
      partialFormats.push(`YY${dateSep}MM${dateSep}D${dtSep}HH${timeSep}mm`)
      partialFormats.push(`YY${dateSep}MM${dateSep}D${dtSep}HH`)
      partialFormats.push(`YY${dateSep}MM${dateSep}D`)
      // 两位年份 - 单位数字月份和日
      partialFormats.push(
        `YY${dateSep}M${dateSep}D${dtSep}HH${timeSep}mm${timeSep}ss`
      )
      partialFormats.push(`YY${dateSep}M${dateSep}D${dtSep}HH${timeSep}mm`)
      partialFormats.push(`YY${dateSep}M${dateSep}D${dtSep}HH`)
      partialFormats.push(`YY${dateSep}M${dateSep}D`)
      // 两位年份 - 单位数字时间
      partialFormats.push(
        `YY${dateSep}MM${dateSep}DD${dtSep}H${timeSep}m${timeSep}s`
      )
      partialFormats.push(`YY${dateSep}MM${dateSep}DD${dtSep}H${timeSep}m`)
      partialFormats.push(`YY${dateSep}MM${dateSep}DD${dtSep}H`)
      partialFormats.push(
        `YY${dateSep}M${dateSep}D${dtSep}H${timeSep}m${timeSep}s`
      )
      partialFormats.push(`YY${dateSep}M${dateSep}D${dtSep}H${timeSep}m`)
      partialFormats.push(`YY${dateSep}M${dateSep}D${dtSep}H`)
    }
  }

  return [...new Set(partialFormats)]
}

export interface EscapeOptions {
  /**
   * 转义类型
   * - date: 仅转义日期格式
   * - time: 仅转义时间格式
   * - date-time: 转义日期时间格式
   */
  type: PartialFormatsType
  /**
   * 默认按照日期格式取最大或最小值
   */
  defaultToExtreme?: 'min' | 'max'
}

/**
 * 转义指定任意时间格式字符串中的特殊字符
 * @param input 任意时间格式字符串
 * @param options 配置项
 * @example
 * escape('2026-12-31', { type: 'date', defaultToExtreme: 'min' }) // 2026-12-31 00:00:00
 * escape('2026-12', { type: 'date', defaultToExtreme: 'min' }) // 2026-12-01 00:00:00
 * escape('2026', { type: 'date', defaultToExtreme: 'min' }) // 2026-01-01 00:00:00
 * escape('2026-12-31 23:59:59', { type: 'date-time', defaultToExtreme: 'max' }) // 2026-12-31 23:59:59
 * escape('2026-12-31 23:59', { type: 'date-time', defaultToExtreme: 'max' }) // 2026-12-31 23:59:59
 * escape('2026-12-31 23', { type: 'date-time', defaultToExtreme: 'max' }) // 2026-12-31 23
 * escape('2026-12-31', { type: 'date-time', defaultToExtreme: 'max' }) // 2026-12-31 23:59:59
 * escape('2026-12', { type: 'date-time', defaultToExtreme: 'max' }) // 2026-12-31 23:59:59
 * escape('2026', { type: 'date-time', defaultToExtreme: 'max' }) // 2026-12-31 23:59:59
 */
export function parseQuickInput(
  input?: string,
  options?: EscapeOptions
): Dayjs | undefined {
  if (!input) {
    return undefined
  }

  const { type = 'date', defaultToExtreme = 'min' } = options || {}
  let parsedDate: Dayjs | null = null

  const objectType = {
    date: DATE_SUPPORTED_FORMATS,
    time: TIME_SUPPORTED_FORMATS,
    'date-time': DATETIME_SUPPORTED_FORMATS,
  }

  // 如果没有设置默认极值，使用严格匹配
  if (!defaultToExtreme) {
    for (const fmt of objectType[type]) {
      const d = dayjs(input, fmt, true)
      if (d.isValid()) {
        parsedDate = d
        break
      }
    }
    return parsedDate || undefined
  }

  const formats = [...objectType[type], ...generatePartialFormats(type)]

  // 从输入尝试匹配
  for (const fmt of formats) {
    const d = dayjs(input, fmt, true)
    if (!d.isValid()) {
      continue
    }

    parsedDate = d

    // 判断缺失了哪些部分（需要同时检查单位数字和双位数字格式）
    const hasMonth = fmt.includes('MM') || /(?<![HM])M(?!M)/.test(fmt)
    const hasDay = fmt.includes('DD') || /(?<![YMD])D(?!D)/.test(fmt)
    const hasHour = fmt.includes('HH') || /(?<![H])H(?!H)/.test(fmt)
    const hasMinute = fmt.includes('mm') || /(?<![m])m(?!m)/.test(fmt)
    const hasSecond = fmt.includes('ss') || /(?<![s])s(?!s)/.test(fmt)

    if (defaultToExtreme === 'min') {
      // 按最小值填充
      if (type !== 'time' && !hasMonth) {
        parsedDate = parsedDate.month(0)
      }
      if (type !== 'time' && !hasDay) {
        parsedDate = parsedDate.date(1)
      }
      if (!hasHour) {
        parsedDate = parsedDate.hour(0)
      }
      if (!hasMinute) {
        parsedDate = parsedDate.minute(0)
      }
      if (!hasSecond) {
        parsedDate = parsedDate.second(0)
      }
      parsedDate = parsedDate.millisecond(0)
    } else if (defaultToExtreme === 'max') {
      // 按最大值填充
      if (type !== 'time' && !hasMonth) {
        parsedDate = parsedDate.month(11)
      }
      if (type !== 'time' && !hasDay) {
        parsedDate = parsedDate.date(parsedDate.daysInMonth())
      }
      if (!hasHour) {
        parsedDate = parsedDate.hour(23)
      }
      if (!hasMinute) {
        parsedDate = parsedDate.minute(59)
      }
      if (!hasSecond) {
        parsedDate = parsedDate.second(59)
      }
      parsedDate = parsedDate.millisecond(999)
    }

    return parsedDate
  }

  return undefined
}
