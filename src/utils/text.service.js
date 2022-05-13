import { LocalDataService } from './';
import { ENUSCONTROLS, ENUSMESSAGES, ZHCNCONTROLS, ZHCNMESSAGES } from '../constants/texts';

const languages = {
  'zh-cn': '中文',
  'en-us': 'English'
};

export class TextService {
  static msgs;
  static ctls;
  static language;

  static getLanguage() {
    return { name: 'zh-cn', text: languages['zh-cn'] }
    // const langObject = LocalDataService.localStorageGet('language');
    // if (!langObject) {
    //   let langName = window.navigator.language || window.navigator['browserLanguage'] || window.navigator['userLanguage'] || window.navigator['systemLanguage'];
    //   langName = langName.substr(0, 2).toLowerCase();
    //   langName = langName === 'en' || langName.indexOf('en-') > -1 ? 'en-us' : 'zh-cn';
    //   return { name: langName, text: languages[langName] };
    // }
    // return langObject;
  }

  /**
   * set system language
   * @param lang : language name
   * @param text : language display text
   */
  static setLanguage(name, text) {
    const langObject = { name, text };
    LocalDataService.localStorageSet('language', langObject);
    switch (name) {
      case 'zh-cn':
        this.ctls = ZHCNCONTROLS;
        this.msgs = ZHCNMESSAGES;
        break;
      case 'en-us':
        this.ctls = ENUSCONTROLS;
        this.msgs = ENUSMESSAGES;
        break;
      default:
        this.ctls = ZHCNCONTROLS;
        this.msgs = ZHCNMESSAGES;
        break;
    }
    window.location.reload();
  }

  static get messages() {
    if (!this.msgs) {
      switch (this.languageName) {
        case 'zh-cn':
          this.msgs = ZHCNMESSAGES;
          break;
        case 'en-us':
          this.msgs = ENUSMESSAGES;
          break;
        default:
          this.msgs = ZHCNMESSAGES;
          break;
      }
    }
    return this.msgs;
  }

  static get controls() {
    if (!this.ctls) {
      switch (this.languageName) {
        case 'zh-cn':
          this.ctls = ZHCNCONTROLS;
          break;
        case 'en-us':
          this.ctls = ENUSCONTROLS;
          break;
        default:
          this.ctls = ZHCNCONTROLS;
          break;
      }
    }
    return this.ctls;
  }

  static get languageObject() {
    if (!this.language) {
      this.language = this.getLanguage();
    }
    return this.language;
  }

  static get languageName() {
    if (!this.language) {
      this.language = this.getLanguage();
    }
    return this.language.name;
  }
}
