export class LocalDataService {
  /** cookie functions start */
  static cookieGet(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = document.cookie.match(reg);
    if (arr && arr.length > 1) {
      try {
        return JSON.parse(unescape(arr[2]));
      } catch {
        return arr[2] ? unescape(arr[2]) : null;
      }
    } else {
      return null;
    }
  }

  static cookieRemove(name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1000);
    const cval = this.cookieGet(name);
    if (cval != null) {
      document.cookie = name + '=removed;expires=' + exp.toGMTString();
    }
  }

  /** expire: minutes */
  static cookieSet(name, value, expire = 60 * 24 * 30) {
    if (Boolean(value) && typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    const exp = new Date();
    exp.setTime(exp.getTime() + expire * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
  }
  /** cookie functions end */

  /** localStorage start */
  static localStorageGet(name) {
    let result = localStorage.getItem(name);
    try {
      result = result ? JSON.parse(result) : result;
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  static localStorageRemove(name) {
    try {
      localStorage.removeItem(name);
    } catch (err) {
      console.log(err);
    }
  }

  static localStorageSet(name, value) {
    if (Boolean(value) && typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    try {
      localStorage.setItem(name, value);
    } catch (err) {
      console.log(err);
    }
  }
  /** localStorage end */

  /** sessionStorage start */
  static sessionStorageGet(name) {
    let result = sessionStorage.getItem(name);
    try {
      result = result ? JSON.parse(result) : result;
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  static sessionStorageRemove(name) {
    try {
      sessionStorage.remove(name);
    } catch (err) {
      console.log(err);
    }
  }

  static sessionStorageSet(name, value) {
    if (Boolean(value) && typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    try {
      sessionStorage.set(name, value);
    } catch (err) {
      console.log(err);
    }
  }
  /** sessionStorage end */
}
