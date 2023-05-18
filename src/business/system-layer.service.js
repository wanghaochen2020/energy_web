import { HttpRequestService } from "./base/http-request.service";

const basicUrl = 'api/basicdata';
const opcUrl = 'api/opcdata';
const basicDataSetUrl = 'api/basicdataset'

const l = (d, min) => {
  return d && d[min] ? d[min] : 0;
}
export class EnergyStation {
  static getTime() {
    let date = new Date();
    date.setTime(date.getTime()-11000*60)//减十一分钟
    // let date = new Date(2022, 9, 13, 14, 55);
    return date;
  }
  static getLastYearStr() {
    let date = this.getTime();
    let year = date.getFullYear();
    let currentdate = (year-1).toString();
    return currentdate;
  }
  static getLastYearStr() {
    let date = this.getTime();
    let year = date.getFullYear()-1;
    let currentdate = year.toString();
    return currentdate;
  }
  static getYearStr() {
    let date = this.getTime();
    let year = date.getFullYear();
    let currentdate = year.toString();
    return currentdate;
  }
  static getMonthStr(seperator1, month) {
    let date = this.getTime();
    seperator1===undefined && (seperator1 = "/");
    let year = date.getFullYear();
    month===undefined && (month = date.getMonth() + 1);
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    let currentdate = year + seperator1 + month;
    return currentdate;
  }
  static getDayStr() {
    let date = this.getTime();
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
    let date = this.getTime();
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
  static getMonth() {
    return this.getTime().getMonth() + 1;
  }
  static getMin() {
    let date = this.getTime();
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
  static postPageData(body) {
    const options = {
      body: body,
      url:basicDataSetUrl
    };
    return HttpRequestService.post(options)
  }
  static powerList(thisYear, lastYear) {
    let items = [];
    let time = EnergyStation.getTime();
    const bi = (d1, d2) => {
      return d1 && d2 ? (d1-d2)/d2 : 0;
    }
    for(let i=0;i<=time.getMonth();i++) {
      let d1 = bi(l(thisYear, i),l(lastYear,i));
      let d2 = bi(l(thisYear,i),i === 0 ? l(lastYear,11) : l(thisYear,i-1));
      items[i] = (<tr className={i&1?"row-even":"row-odd"}>
        <td>{EnergyStation.getMonthStr("-", i+1)}</td>
        <td>{(l(thisYear,i)/0.604).toFixed(1)}</td>
        <td>{(d1*100).toFixed(0)+"%"}<i className={"fa fa-long-arrow-"+(d1>=0?"up":"down")}></i></td>
        <td>{(d2*100).toFixed(0)+"%"}<i className={"fa fa-long-arrow-"+(d2>=0?"up":"down")}></i></td>
        <td>{(l(thisYear,i)).toFixed(1)}</td>
        <td>{(d2*100).toFixed(0)+"%"}<i className={"fa fa-long-arrow-"+(d2>=0?"up":"down")}></i></td>
      </tr>);
    }
    return items;
  }
}