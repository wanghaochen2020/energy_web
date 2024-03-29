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
    const user = BaseInfoService.getValidUser();
    if (user?.token) {
      options || (options = {});
      options.headers || (options.headers = {});
      options.headers.Authorization || (options.headers.Authorization = "Bearer " + user.token);
    }
    return this.apiAxios(method, options.url, options);
    // for mock data deployment
    // return this.apiAxios(method, getMockDataUrl(options.url, TextService.getLanguage()?.name), options);
  }

  static handleRequest(params) {
    const user = BaseInfoService.getValidUser();
    if (!params.skipValidation && !user) {
      this.goToLogin();
      return false;
    }
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
        baseURL: SERVERINFO.serverIP,
        method: method,
        data: method === 'POST' || method === 'PUT' ? params.body : null,
        params: method === 'GET' || method === 'DELETE' ? params.params : null,
        withCredentials: false,
        headers: params.headers
      }).then((res) => {
        if (res.status === 200) {
          resolve(res.data);
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
    if (window.location.href.indexOf("/login") > -1) {
      return;
    }
    HttpRequestService._redirected = true;
    if (window.location.href.toLowerCase().indexOf('login') === -1) {
      window.location.href = '/#/login';
    }
  }
}
