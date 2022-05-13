import { HttpRequestService } from './http-request.service';
import { TextService } from '../../utils';

export class BusinessBaseService {

  static delete(options, filters) {
    options.url = options.url + this.getFilters(filters);
    return HttpRequestService.delete(options);
  }

  static get(options, filters) {
    options.url = options.url + this.getFilters(filters);
    return HttpRequestService.get(options);
  }

  static put(options, filters) {
    options.url = options.url + this.getFilters(filters);
    return HttpRequestService.put(options);
  }

  static post(options, filters) {
    options.url = options.url + this.getFilters(filters);
    return HttpRequestService.post(options);
  }

  static getFilters(filters) {
    if (!filters) {
      return '';
    }

    if (filters.pageSize < 1) {
      filters.pageSize = 1;
    }

    if (filters.pageNumber < 1) {
      filters.pageNumber = 1;
    }

    let result = [];
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        result.push(key + '=' + filters[key]);
      }
    });

    return result.length > 0 ? '?' + result.join('&') : '';
  }

  static getRequiredMessage(fieldsValues = [], texts = [], fieldsNames = []) {
    const messages = [];
    const fields = [];
    const names = [];
    fieldsValues.forEach((field, index) => {
      if (!field) {
        messages.push(texts[index]);
        fields.push(fieldsValues[index]);
        names.push(fieldsNames[index]);
      }
    });
    return messages.length === 0 ? null : {
      message: TextService.messages.required(messages.length === 1 ? messages[0] : messages),
      fieldsValues: fields,
      fieldsNames: fieldsNames
    };
  }

  static getRequiredMessagePromise(fieldsValues = [], texts = [], fieldsNames = []) {
    const message = this.getRequiredMessage(fieldsValues, texts, fieldsNames);
    if (message) {
      return new Promise((resolve, reject) => {
        reject(message);
      });
    } else {
      return null;
    }
  }

  static getFormatMessagePromise(fieldsValues = [], funcs = [], texts = [], fieldsNames = []) {
    const messages = [];
    const fields = [];
    const names = [];
    fieldsValues.forEach((field, index) => {
      if (field && !funcs[index](field)) {
        messages.push(texts[index]);
        fields.push(fields[index]);
        names.push(fieldsNames[index]);
      }
    });
    if (messages.length > 0) {
      return new Promise((resolve, reject) => {
        reject({
          message: TextService.messages.invalidFormat(messages),
          fields: fields,
          fieldsNames: names
        });
      });
    } else {
      return null;
    }
  }
}
