import { TextService, ValidateService, EncryptionService } from '../utils';
import { BusinessBaseService } from './base/business-base.service';
import { BaseInfoService } from './base-info.service';
import { HttpRequestService } from './base/http-request.service';

const apiBase = 'api/user';
const getApi = (url) => 'api/user/' + url;
const apis = {
  list: getApi('list'),
  login: getApi('login'),
  logout: getApi('logout'),
  modifyPassword: getApi('modifypassowrd'),
  resetPassword: getApi('resetpassword'),
  saveRoles: getApi('saveroles'),
  authorizedList: getApi('authorizedlist')
}

export class UserBusiness {
  static get(id) {
    const options = {
      url: getApi(id)
    };
    return HttpRequestService.get(options);
  }

  static getList(filters = {}) {
    const options = {
      url: apis.list
    };
    return BusinessBaseService.get(options, filters);
  }

  static delete(id) {
    const options = {
      url: getApi(id)
    };
    return HttpRequestService.delete(options);
  }

  static resetPassword(id) {
    const options = {
      url: apis.resetPassword + '/' + id
    };
    return HttpRequestService.post(options);
  }

  static saveRoles(userId, roles) {
    const options = {
      url: apis.saveRoles + '/' + userId,
      body: roles
    };
    return HttpRequestService.post(options);
  }

  static insert(item) {
    const message = UserBusiness.validate(item);
    if (message) {
      return message;
    }

    const options = {
      url: apiBase,
      body: item
    };
    return HttpRequestService.post(options);
  }

  static update(item) {
    const message = UserBusiness.validate(item);
    if (message) {
      return message;
    }

    const options = {
      url: getApi(item.id),
      body: item
    };
    return HttpRequestService.put(options);
  }

  static login(userName, password) {
    const message = BusinessBaseService.getRequiredMessagePromise(
      [userName, password],
      [TextService.controls.userName, TextService.controls.password]
    );
    if (message) {
      return message;
    }

    const options = {
      url: apis.login,
      body: {
        userName,
        password: EncryptionService.md5(password)
      }
    };
    options.skipValidation = true;
    return HttpRequestService.post(options).then((data) => {
      BaseInfoService.setUser(data);
      BaseInfoService.setAuthorization(data.authorizationList);
    });
  }

  static logout() {
    const options = {
      url: apis.logout
    };
  
    BaseInfoService.clearToken();
    BaseInfoService.clearAuthorization();
    return HttpRequestService.post(options);
  }
  static modifyPassword(originalPassword, newPassword, passwordConfirm) {
    const message = BusinessBaseService.getRequiredMessagePromise(
      [originalPassword, newPassword, passwordConfirm],
      [TextService.controls.originalPassword, TextService.controls.newPassword, TextService.controls.passwordConfirm]
    );
    if (message) {
      return message;
    }

    if (newPassword !== passwordConfirm) {
      return new Promise((resolve, reject) => {
        reject(TextService.messages.passwordMismatch);
      });
    }

    const options = {
      url: apis.login,
      body: {
        originalPassword: EncryptionService.md5(originalPassword),
        newPassword: EncryptionService.md5(newPassword)
      }
    };
    options.skipValidation = true;
    return HttpRequestService.post(options).then((data) => {
      BaseInfoService.setUser(data);
    });
  }

  static validate(item) {
    let message = BusinessBaseService.getRequiredMessagePromise(
      [item.loginName, item.fullName],
      [TextService.controls.loginName, TextService.controls.fullName]
    );

    if (message) {
      return message;
    }

    message = BusinessBaseService.getFormatMessagePromise(
      [item.email, item.cellphone],
      [ValidateService.checkEmail, ValidateService.checkCellphone],
      [TextService.controls.email, TextService.controls.cellphone]
    );
    return message;
  }

  static getAuthorizedList() {
    const options = {
      url: apis.authorizedList
    };
    return HttpRequestService.get(options);
  }
}
