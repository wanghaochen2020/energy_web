import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Alarms } from './alarms/alarms';
import './basic-map.scss';
import { ChartService } from '../../utils/chart.service';
import { SERVERINFO } from '../../constants/app-info';
import { PAGEDATA } from '../../constants/pageData';
import { EnergyStation } from '../../business/system-layer.service';

const basicBuild = {
  title1:"建筑面积",
  title2:"层数",
  title3:"走廊温度",
  title4:"耗热量",
}

const basic_map_data = {
  "basic_data":[
    PAGEDATA.EnergyOnlineRate
  ],
  "map_data_list_day":[
    PAGEDATA.EnergyAlarmToday, PAGEDATA.ColdAlarmToday, PAGEDATA.PumpAlarmToday
  ],
  "basic_data_list_hour":[],
  "basic_opc_list":[]
}

const concatList = (...list) => {
  let a = [];
  for(let i=0;i<list.length;i++)
  {
    if (list[i] !== undefined && list[i] !== null) {
      a = a.concat(list[i]);
    }
  }
  return a;
}

export const BasicMap = () => {
  const buttonMaps = {
    '冬奥村': [],
    '组团1': ['建筑'],
    '组团2': ['建筑'],
    '组团3': ['建筑'],
    '组团4': ['建筑'],
    '组团5': ['建筑'],
    '组团6': ['建筑', '热水系统'],
    '公共南': ['建筑', '能源站', '制冷中心', '二次泵站'],
    '公共北': ['建筑'],
  };
  const [selectedButton, setSelectedButton] = useState('');
  let [pageData, setPageData] = useState({});
  let messageFunc = useCallback((event) => {
    if (event.origin === SERVERINFO.modelIP) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        let iframe = document.getElementById('basic_map_model')
        if (!iframe || !iframe.contentWindow || !event || !event.data || !event.data.type) return
        switch(event.data.type) {
          case "ok"://加载完成
              iframe.contentWindow.postMessage({type:"basic_map_init"}, SERVERINFO.modelIP)
            break
          case "device"://请求设备信息
            if (!event.data.data) {
              return
            }
            let data = {}
            switch(event.data.data) {
              case "1":
                data = basicBuild
                data.title = "运动员组团1"
                data.data1 = "14620㎡"
                data.data2 = "4"
                data.data3 = "19.87℃"
                data.data4 = "0MWH"
                break
              case "2":
                data = basicBuild
                data.title = "运动员组团2"
                data.data1 = "6977㎡"
                data.data2 = "4"
                data.data3 = "20.53℃"
                data.data4 = "0MWH"
                break
              case "3":
                data = basicBuild
                data.title = "运动员组团3"
                data.data1 = "12728㎡"
                data.data2 = "4"
                data.data3 = "18.91℃"
                data.data4 = "0MWH"
                break
              case "4":
                data = basicBuild
                data.title = "运动员组团4"
                data.data1 = "7898㎡"
                data.data2 = "5"
                data.data3 = "17.63℃"
                data.data4 = "0MWH"
                break
              case "5":
                data = basicBuild
                data.title = "运动员组团5"
                data.data1 = "7621㎡"
                data.data2 = "6"
                data.data3 = "23.22℃"
                data.data4 = "0MWH"
                break
              case "6":
                data = basicBuild
                data.title = "运动员组团6"
                data.data1 = "8128㎡"
                data.data2 = "6"
                data.data3 = "17.63℃"
                data.data4 = "0MWH"
                break
              case "公共组团北区":
                data = basicBuild
                data.title = "公共组团北区"
                data.data1 = "6259㎡"
                data.data2 = "3"
                data.data3 = "16.24℃"
                data.data4 = "0MWH"
                break
              case "公共组团南区":
                data = basicBuild
                data.title = "公共组团南区"
                data.data1 = "21095㎡"
                data.data2 = "6"
                data.data3 = "18.23℃"
                data.data4 = "0MWH"
                break
            }
            iframe.contentWindow.postMessage({type:"window_update",data:data}, SERVERINFO.modelIP)
            break
        }
    } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
    }
  }, [])

  useEffect(() => {
    let dayStr = EnergyStation.getDayStr();
    let hourStr = EnergyStation.getHourStr();

    EnergyStation.postPageData({
      data:basic_map_data,
      day_str:dayStr,
      hour_str:hourStr
    }).then((res) => {
      let needChange = false;
      res[PAGEDATA.EnergyAlarmToday] = concatList(res[PAGEDATA.EnergyAlarmToday], res[PAGEDATA.ColdAlarmToday], res[PAGEDATA.PumpAlarmToday]);
      console.log(res[PAGEDATA.EnergyAlarmToday])

      for (const key in res) {
        if (Object.hasOwnProperty.call(res, key)) {
          const ele1 = res[key];
          const ele2 = pageData[key];
          if (ele2 === undefined) {
            needChange = true;
            break;
          }
          if (Array.isArray(ele1)) {
            if (!Array.isArray(ele2) || ele1.length != ele2.length) {
              needChange = true;
              break;
            }
            for (let i = 0;i<ele1.length;i++) {
              if (ele1[i] != ele2[i]) {
                needChange = true;
                break;
              }
            }
            if (needChange) break;
          } else {
            if (ele1 !== ele2) {
              needChange = true;
              break;
            }
          }
        }
      }

      if (needChange) setPageData(res);
    });

    window.addEventListener('message', messageFunc)
    return () => {
      window.removeEventListener('message', messageFunc)
    }
  }, [messageFunc])
  return (
    <div className="basic-map-view">
      <div className="top-box">
        {/* <iframe id='basic_map_model' src={SERVERINFO.modelIP} className="iframe-style" title="chart" frameBorder="no"></iframe> */}
        <div className="top-left">
          <div className="box-wrapper" style={{ width: '100%', height: '325px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">天气状况实时监测</span>
            </div>
            <div className="weather-info-wrapper">
              <div className="weather-info">
                <span className="fa fa-thermometer"></span>
                <div className="number-text">23°C</div>
                <div className="unit-text">大气温度</div>
              </div>
              <div className="weather-info">
                <span className="fa fa-tint"></span>
                <div className="number-text">30%</div>
                <div className="unit-text">大气湿度</div>
              </div>
              <div className="weather-info">
                <span className="fa fa-sun-o"></span>
                <div className="number-text">450w/m2</div>
                <div className="unit-text">太阳能总辐射</div>
              </div>
              <div className="weather-info">
                <span className="fa fa-ravelry"></span>
                <div className="number-text">2.4m/s</div>
                <div className="unit-text">风速</div>
              </div>
              <div className="weather-info">
                <span className="fa fa-compress"></span>
                <div className="number-text">920hpa</div>
                <div className="unit-text">大气压力</div>
              </div>
            </div>
          </div>
          <div className="box-wrapper" style={{ width: '100%', height: '320px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">运动员组团入住率监测</span>
            </div>
            <div className="operation-summary">
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [{ value: 20 }, { value: 80 }],
                    startAngle: 90,
                    title: '80',
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: 'D1组团'
                  })}
                />
              </div>
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [{ value: 40 }, { value: 60 }],
                    startAngle: 90,
                    title: '60',
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: 'D2组团',
                    titleColor: '#5ee200',
                    itemColor: '#5ee200'
                  })}
                />
              </div>
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [{ value: 10 }, { value: 90 }],
                    startAngle: 90,
                    title: '90',
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: 'D3组团',
                    titleColor: '#f94e00',
                    itemColor: '#f94e00'
                  })}
                />
              </div>
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [{ value: 30 }, { value: 70 }],
                    startAngle: 90,
                    title: '70',
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: 'D4组团',
                    titleColor: '#9029d9',
                    itemColor: '#9029d9'
                  })}
                />
              </div>
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [{ value: 20 }, { value: 80 }],
                    startAngle: 90,
                    title: '80',
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: 'D5组团',
                    titleColor: '#f6e828',
                    itemColor: '#f6e828'
                  })}
                />
              </div>
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [{ value: 50 }, { value: 50 }],
                    startAngle: 90,
                    title: '50',
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: 'D6组团',
                    titleColor: '#f79c11',
                    itemColor: '#f79c11'
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="box-wrapper" style={{ width: '100%', height: '190px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">能源站供应设备运行工况监测</span>
            </div>
            <div className="operation-summary">
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [
                      { value: 100-(isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100) },
                      { value: isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100 }
                    ],
                    startAngle: 90,
                    title: `${isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100}`,
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: '设备在线'
                  })}
                />
              </div>
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [
                      { value: 100-(isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100) },
                      { value: isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100 }
                    ],
                    startAngle: 90,
                    title: `${isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100}`,
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: '设备离线'
                  })}
                />
              </div>
            </div>
          </div>
          <div className="box-wrapper" style={{ width: '100%', height: '190px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">制冷站机组设备运行工况监测</span>
            </div>
            <div className="operation-summary">
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [
                      { value: 100-(isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100) },
                      { value: isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100 }
                    ],
                    startAngle: 90,
                    title: `${isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100}`,
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: '设备在线'
                  })}
                />
              </div>
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [
                      { value: 100-(isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100) },
                      { value: isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100 }
                    ],
                    startAngle: 90,
                    title: `${isNaN(pageData[PAGEDATA.EnergyOnlineRate]*100) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100}`,
                    unit: '%',
                    unwrap: true,
                    titleTop: 30,
                    subTitle: '设备离线'
                  })}
                />
              </div>
            </div>
          </div>
          <div className="box-wrapper" style={{ width: '60%', height: '255px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">事件提醒</span>
            </div>
            <Alarms data={pageData[PAGEDATA.EnergyAlarmToday]}/>
          </div>
        </div>
      </div>
      <div className="button-wrapper">
        <div className="button-row">
          {(buttonMaps[selectedButton] || []).map((str) => <div className="button-item else">{str}</div>)}
        </div>
        <div className="button-row">
          {
            Object.keys(buttonMaps).map((str) => <div onClick={() => setSelectedButton(str)}
              className={"button-item" + (str === selectedButton ? ' button-selected' : '')}>{str}</div>)
          }
        </div>
      </div>
    </div>
  );
}
