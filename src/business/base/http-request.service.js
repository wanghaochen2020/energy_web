import { BaseInfoService } from '../base-info.service';
import { TextService } from '../../utils';
import { SERVERINFO } from '../../constants/app-info';
import { getMockDataUrl } from './mock-url';
import axios from 'axios';

export class HttpRequestService {
  static _redirected = false;

  static delete(params) {
    return this.sendRequest('DELETE', params);
  }

  static get(params) {
    return this.sendRequest('GET', params);
  }

  static post(params) {
    return this.sendRequest('POST', params);
  }

  static put(params) {
    return this.sendRequest('PUT', params);
  }

  static sendRequest(method, options) {
    if (!this.handleRequest(options)) {
      return new Promise((resolve, reject) => {
      });
    }
    // return this.apiAxios(method, options.url, options);
    // for mock data deployment
    return this.apiAxios('GET', getMockDataUrl(options.url, TextService.getLanguage()?.name), options);
  }

  static handleRequest(params) {
    // const user = BaseInfoService.getValidUser();
    // if (!params.skipValidation && !user) {
    //   this.goToLogin();
    //   return false;
    // }
    // params.headers = { 
    //   'Content-Type': 'application/json',
    //   language: TextService.getLanguage()?.name,
    //   token: user && user.token ? user.token : '',
    //   ...params.headers
    // };
    // this._redirected = false;
    return true;
  }

  static apiAxios(method, url, params) {
    function resolveError(err) {
      if (err.status === 401 || err.status === 0 || err.toString().toLowerCase().indexOf('401') > -1) {
        BaseInfoService.clearToken();
        HttpRequestService.goToLogin();
      }

      return false;
    }

    const promise = new Promise(function (resolve, reject) {
      axios(url, {
        url: url,
        data: method === 'POST' || method === 'PUT' ? params.body : null,
        params: method === 'GET' || method === 'DELETE' ? params.params : null,
        withCredentials: false,
        headers: params.headers
      }).then((res) => {
        if (res.status === 200) {
          setTimeout(() => { // for simulation, remove it if call backend service
            resolve(res.data);
          }, 200);
        } else {
          resolveError(res);
          reject(res.data);
        }
      }).catch((err) => {
        if (!resolveError(err)) {
          reject((err.response && err.response.data) ? err.response.data : err.response);
        }
      });
    });

    return promise;
  }

  static goToLogin() {
    if (HttpRequestService._redirected) {
      return;
    }
    HttpRequestService._redirected = true;
    if (window.location.href.toLowerCase().indexOf('login') === -1) {
      // RouterService.push(RoutesPath.login, { redirectUrl: window.location.href });
    }
  }
}
