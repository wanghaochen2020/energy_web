export class DebounceService {
  static createDebounce(func, delay = 240, immediate = false) {
    let timer;
    return function () {
      const args = arguments;
      if (timer) {
        clearTimeout(timer);
      }

      if (immediate) {
        const callNow = !timer;
        timer = setTimeout(() => {
          timer = null;
        }, delay);

        if (callNow) {
          func.apply(this, args);
        }
      } else {
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      }
    };
  }
}
