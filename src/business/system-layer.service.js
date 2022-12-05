import { HttpRequestService } from "./base/http-request.service";

const basicUrl = 'api/basicdata';
const opcUrl = 'api/opcdata';
export class EnergyStation {
  static getDayStr() {
    // let date = new Date();
    let date = new Date(2022, 9, 13, 14, 55);
    let seperator1 = "/";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let strHour = date.getHours();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }
  static getHourStr() {
    // let date = new Date();
    let date = new Date(2022, 9, 13, 14, 55);
    let seperator1 = "/";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let strHour = date.getHours();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (strHour >= 0 && strHour <= 9) {
      strHour = "0" + strHour;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate + " " + strHour;
    return currentdate;
  }
  static getMin() {
    // let date = new Date();
    let date = new Date(2022, 10, 13, 14, 55);
    return date.getMinutes();
  }
  static getTable(name, time) {
    const options = {
      params: {
        name: name
      }
    };
    if (time) {
      options.params.time = time
      options.url = basicUrl+'list'
    }
    else {
      options.url = basicUrl
    }
    return HttpRequestService.get(options)
  }
  static getOPC(name, time) {
    const options = {
      params: {
        name: name,
        time: time
      },
      url:opcUrl
    };
    return HttpRequestService.get(options)
  }
    
}