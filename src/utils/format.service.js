export class FormatService {
  static formatDate(val, fmt) {
    if (!val) {
      return val;
    }
    if (!fmt) {
      fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    if (!(val instanceof Date)) {
      val = val.replace(/-/g, '/');
      val = new Date(val);
      // val.setHours(val.getHours() + val.getTimezoneOffset() / 60);
    }
    const o = {
      'M+': val.getMonth() + 1,
      'd+': val.getDate(),
      'h+': val.getHours(),
      'm+': val.getMinutes(),
      's+': val.getSeconds(),
      'q+': Math.floor((val.getMonth() + 3) / 3),
      // eslint-disable-next-line
      'S': val.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (val.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  }
}
