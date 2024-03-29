import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfo } from '../../components/';
import './system-energy-station.scss';
import { EnergyStation } from '../../business/system-layer.service';
import { ChartService } from '../../utils/chart.service';
import { PAGEDATA } from '../../constants/pageData';
import { SERVERINFO } from '../../constants/app-info';
import { MainPage } from '../../business/mainPage';

const basicPump = {
  title1:"运行状态",
  title2:"运行功率",
  title3:"流量",
  data1:"关闭",
  data2: "7.5kW",
  data3: "137m³/h",
}
const basicTank = {
  title1:"进水温度",
  title2:"出水温度",
  data1:"28.00℃",
  data2: "27.31℃",
}
const basicValve = {
  title1:"开启状态",
  title2:"开启度",
  data1:"关闭",
  data2: "0",
}

const getList = (d, min) => {
  return d && d[min] ? d[min] : 0;
}

export const SystemEnergyStation = () => {
  const [pageData, setPageData] = useState({});
  const [atmosphere, setAtmosphere] = useState([]);

  let messageFunc = useCallback((event) => {
    if (event.origin === SERVERINFO.model1IP) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        let iframe = document.getElementById('energy_model')
        if (!iframe || !iframe.contentWindow || !event || !event.data || !event.data.type) return
        switch(event.data.type) {
          case "ok"://加载完成
              iframe.contentWindow.postMessage({type:"energy_station_init"}, "*")
            break
          case "device"://请求设备信息
            if (!event.data.data) {
              return
            }
            let data = {}
            switch(event.data.data) {
              case "1#电极锅炉":
                data = {
                  title:"1#电极锅炉",
                  title1:"运行状态",
                  title2:"运行功率",
                  title3:"供水温度",
                  title4:"回水温度",
                  title5:"用电量",
                  data1: pageData[PAGEDATA.EnergyBoilerRun1] == 0?"关闭" : "开启",
                  data2: "4MW",
                  data3: pageData[PAGEDATA.EnergyBoilerOutT1]+"℃",
                  data4: pageData[PAGEDATA.EnergyBoilerInT1]+"℃",
                  data5: pageData[PAGEDATA.EnergyBoilerPowerConsumptionToday1]+"KWH",
                }
                break
              case "2#电极锅炉":
                data = {
                  title:"2#电极锅炉",
                  title1:"运行状态",
                  title2:"运行功率",
                  title3:"供水温度",
                  title4:"回水温度",
                  title5:"用电量",
                  data1:pageData[PAGEDATA.EnergyBoilerRun2] == 0?"关闭" : "开启",
                  data2: "4MW",
                  data3: pageData[PAGEDATA.EnergyBoilerOutT2]+"℃",
                  data4: pageData[PAGEDATA.EnergyBoilerInT2]+"℃",
                  data5: pageData[PAGEDATA.EnergyBoilerPowerConsumptionToday2]+"KWH",
                }
                break
              case "3#电极锅炉":
                data = {
                  title:"3#电极锅炉",
                  title1:"运行状态",
                  title2:"运行功率",
                  title3:"供水温度",
                  title4:"回水温度",
                  title5:"用电量",
                  data1:pageData[PAGEDATA.EnergyBoilerRun3] == 0?"关闭" : "开启",
                  data2: "4MW",
                  data3: pageData[PAGEDATA.EnergyBoilerOutT3]+"℃",
                  data4: pageData[PAGEDATA.EnergyBoilerInT3]+"℃",
                  data5: pageData[PAGEDATA.EnergyBoilerPowerConsumptionToday3]+"KWH",
                }
                break
              case "4#电极锅炉":
                data = {
                  title:"4#电极锅炉",
                  title1:"运行状态",
                  title2:"运行功率",
                  title3:"供水温度",
                  title4:"回水温度",
                  title5:"用电量",
                  data1:pageData[PAGEDATA.EnergyBoilerRun4] == 0?"关闭" : "开启",
                  data2: "4MW",
                  data3: pageData[PAGEDATA.EnergyBoilerOutT4]+"℃",
                  data4: pageData[PAGEDATA.EnergyBoilerInT4]+"℃",
                  data5: pageData[PAGEDATA.EnergyBoilerPowerConsumptionToday4]+"KWH",
                }
                break
              case "1#水泵":
                data = basicPump
                data.title = "1#锅炉循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[0]] == 0 ? "关闭" : "开启"
                break
              case "2#水泵":
                data = basicPump
                data.title = "2#锅炉循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[1]] == 0 ? "关闭" : "开启"
                break
              case "3#水泵":
                data = basicPump
                data.title = "3#锅炉循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[2]] == 0 ? "关闭" : "开启"
                break
              case "4#水泵":
                data = basicPump
                data.title = "4#锅炉循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[3]] == 0 ? "关闭" : "开启"
                break
              case "5#水泵":
                data = basicPump
                data.title = "5#锅炉循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[4]] == 0 ? "关闭" : "开启"
                break
              case "6#水泵":
                data = basicPump
                data.title = "6#锅炉循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[5]] == 0 ? "关闭" : "开启"
                break
              case "7#水泵":
                data = basicPump
                data.title = "7#锅炉循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[6]] == 0 ? "关闭" : "开启"
                break
              case "8#水泵":
                data = basicPump
                data.title = "8#锅炉循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[7]] == 0 ? "关闭" : "开启"
                break
              case "9#水泵":
                data = basicPump
                data.title = "1#蓄热循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[8]] == 0 ? "关闭" : "开启"
                data.data2 = "15kW"
                data.data3 = "200m³/h"
                break
              case "10#水泵":
                data = basicPump
                data.title = "2#蓄热循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[9]] == 0 ? "关闭" : "开启"
                data.data2 = "15kW"
                data.data3 = "200m³/h"
                break
              case "11#水泵":
                data = basicPump
                data.title = "3#蓄热循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[10]] == 0 ? "关闭" : "开启"
                data.data2 = "15kW"
                data.data3 = "200m³/h"
                break
              case "1#放热循环泵":
                data = basicPump
                data.title = "1#放热循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[11]] == 0 ? "关闭" : "开启"
                data.data2 = "11kW"
                data.data3 = "147m³/h"
                break
              case "2#放热循环泵":
                data = basicPump
                data.title = "2#放热循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[12]] == 0 ? "关闭" : "开启"
                data.data2 = "11kW"
                data.data3 = "147m³/h"
                break
              case "3#放热循环泵":
                data = basicPump
                data.title = "3#放热循环泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[13]] == 0 ? "关闭" : "开启"
                data.data2 = "11kW"
                data.data3 = "147m³/h"
                break
              case "1#供热水泵":
                data = basicPump
                data.title = "1#供热水泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[14]] == 0 ? "关闭" : "开启"
                data.data2 = "22kW"
                data.data3 = "310m³/h"
                break
              case "2#供热水泵":
                data = basicPump
                data.title = "2#供热水泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[15]] == 0 ? "关闭" : "开启"
                data.data2 = "22kW"
                data.data3 = "310m³/h"
                break
              case "3#供热水泵":
                data = basicPump
                data.title = "3#供热水泵"
                data.data1 = pageData[PAGEDATA.EnergyPumpState[16]] == 0 ? "关闭" : "开启"
                data.data2 = "22kW"
                data.data3 = "310m³/h"
                break
              case "1#水箱":
                data = basicTank
                data.title = "1#蓄热水箱"
                data.data1 = pageData[PAGEDATA.EnergyTankInT] + "℃"
                data.data2 = pageData[PAGEDATA.EnergyTankOutT] + "℃"
                break
              case "2#水箱":
                data = basicTank
                data.title = "2#蓄热水箱"
                data.data1 = pageData[PAGEDATA.EnergyTankInT] + "℃"
                data.data2 = pageData[PAGEDATA.EnergyTankOutT] + "℃"
                break
              case "DV1":
                data = basicValve
                data.title = "阀门DV1"
                data.data1 = pageData[PAGEDATA.EnergyDVState[0]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[0]] == 0 ? "0" : "1"
                break
              case "DV2":
                data = basicValve
                data.title = "阀门DV2"
                data.data1 = pageData[PAGEDATA.EnergyDVState[1]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[1]] == 0 ? "0" : "1"
                break
              case "DV3":
                data = basicValve
                data.title = "阀门DV3"
                data.data1 = pageData[PAGEDATA.EnergyDVState[2]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[2]] == 0 ? "0" : "1"
                break
              case "DV5":
                data = basicValve
                data.title = "阀门DV5"
                data.data1 = pageData[PAGEDATA.EnergyDVState[3]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[3]] == 0 ? "0" : "1"
                break
              case "DV7-1":
                data = basicValve
                data.title = "阀门DV7-1"
                data.data1 = pageData[PAGEDATA.EnergyDVState[4]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[4]] == 0 ? "0" : "1"
                break
              case "DV7-2":
                data = basicValve
                data.title = "阀门DV7-2"
                data.data1 = pageData[PAGEDATA.EnergyDVState[5]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[5]] == 0 ? "0" : "1"
                break
              case "DV8-1":
                data = basicValve
                data.title = "阀门DV8-1"
                data.data1 = pageData[PAGEDATA.EnergyDVState[6]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[6]] == 0 ? "0" : "1"
                break
              case "DV8-2":
                data = basicValve
                data.title = "阀门DV8-2"
                data.data1 = pageData[PAGEDATA.EnergyDVState[7]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[7]] == 0 ? "0" : "1"
                break
              case "DVT-1":
                data = basicValve
                data.title = "阀门DVT-1"
                data.data1 = pageData[PAGEDATA.EnergyDVState[8]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[8]]
                break
              case "DVT-2":
                data = basicValve
                data.title = "阀门DVT-2"
                data.data1 = pageData[PAGEDATA.EnergyDVState[9]] == 0 ? "关闭" : "打开"
                data.data2 = pageData[PAGEDATA.EnergyDVState[9]]
                break
            }
            iframe.contentWindow.postMessage({type:"window_update",data:data}, SERVERINFO.model1IP)
            break
        }
    } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
    }
  }, [pageData])

  useEffect(()=>{
    let min = EnergyStation.getMin();

    EnergyStation.getPageData(PAGEDATA.Pages.SystemEnergy).then((res) => {
      res = JSON.parse(res)
      res[PAGEDATA.EnergyBoilerPower] = res[PAGEDATA.EnergyBoilerPower].toFixed(2);
      res[PAGEDATA.EnergyPowerConsumptionToday] = res[PAGEDATA.EnergyPowerConsumptionToday].toFixed(2);
      res[PAGEDATA.EnergyBoilerRunningNum] = res[PAGEDATA.EnergyBoilerRunningNum].toFixed(0);
      res[PAGEDATA.EnergyTankRunningNum] = res[PAGEDATA.EnergyTankRunningNum].toFixed(0);
      res[PAGEDATA.EnergyHeatSupplyToday] = (res[PAGEDATA.EnergyHeatSupplyToday]/1e9).toFixed(2);
      res[PAGEDATA.EnergyAlarmNumToday] = res[PAGEDATA.EnergyAlarmNumToday].toFixed(0);

      res[PAGEDATA.EnergyBoilerPowerConsumptionToday1] = res[PAGEDATA.EnergyBoilerPowerConsumptionToday1].toFixed(2);
      res[PAGEDATA.EnergyBoilerPowerConsumptionToday2] = res[PAGEDATA.EnergyBoilerPowerConsumptionToday2].toFixed(2);
      res[PAGEDATA.EnergyBoilerPowerConsumptionToday3] = res[PAGEDATA.EnergyBoilerPowerConsumptionToday3].toFixed(2);
      res[PAGEDATA.EnergyBoilerPowerConsumptionToday4] = res[PAGEDATA.EnergyBoilerPowerConsumptionToday4].toFixed(2);
        
      res[PAGEDATA.EnergyBoilerInT1] = getList(res[PAGEDATA.EnergyBoilerInT1], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerInT2] = getList(res[PAGEDATA.EnergyBoilerInT2], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerInT3] = getList(res[PAGEDATA.EnergyBoilerInT3], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerInT4] = getList(res[PAGEDATA.EnergyBoilerInT4], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerOutT1] = getList(res[PAGEDATA.EnergyBoilerOutT1], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerOutT2] = getList(res[PAGEDATA.EnergyBoilerOutT2], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerOutT3] = getList(res[PAGEDATA.EnergyBoilerOutT3], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerOutT4] = getList(res[PAGEDATA.EnergyBoilerOutT4], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerRun1] = getList(res[PAGEDATA.EnergyBoilerRun1], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerRun2] = getList(res[PAGEDATA.EnergyBoilerRun2], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerRun3] = getList(res[PAGEDATA.EnergyBoilerRun3], min).toFixed(2);
      res[PAGEDATA.EnergyBoilerRun4] = getList(res[PAGEDATA.EnergyBoilerRun4], min).toFixed(2);
      res[PAGEDATA.EnergyTankInT] = getList(res[PAGEDATA.EnergyTankInT], min).toFixed(2);
      res[PAGEDATA.EnergyTankOutT] = getList(res[PAGEDATA.EnergyTankOutT], min).toFixed(2);
      
      for (let i=0;i<=16;i++) {
        res[PAGEDATA.EnergyPumpState[i]] = getList(res[PAGEDATA.EnergyPumpState[i]], min);
      }

      for (let i=0;i<=9;i++) {
        res[PAGEDATA.EnergyDVState[i]] = getList(res[PAGEDATA.EnergyDVState[i]], min);
      }

      if (res[PAGEDATA.EnergyHeatStorageAndRelease]) {
        for (let i in res[PAGEDATA.EnergyHeatStorageAndRelease]) {
          res[PAGEDATA.EnergyHeatStorageAndRelease][i] = res[PAGEDATA.EnergyHeatStorageAndRelease][i]/3.6e6;
        }
      }
      
      let needChange = false;
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

    MainPage.getAtmosphere().then((res)=> {
      setAtmosphere(res.data)
    });
  }, [])

  useEffect(() => {
    window.addEventListener('message', messageFunc)
    return () => {
      window.removeEventListener('message', messageFunc)
    }
  }, [messageFunc])

  return (
    <div className="system-energy-station-view">
      <iframe id="energy_model" src={SERVERINFO.model1IP} className="iframe-style" title="chart" frameBorder="no"></iframe>
      <div className="system-energy-station-content">
        <div className="operation-summary">
          <div className="alarm-info">
            <div className="alarm-number">{pageData[PAGEDATA.EnergyAlarmNumToday]}</div>
            <div className="alarm-label">告警次数</div>
            <span className="alarm-left-corner"></span>
          </div>
          <div className="top-info">
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [
                    { value: isNaN(pageData[PAGEDATA.EnergyOnlineRate]) ? 0 : 100 - pageData[PAGEDATA.EnergyOnlineRate]*100 },
                    { value: isNaN(pageData[PAGEDATA.EnergyOnlineRate]) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100 }
                  ],
                  startAngle: 90,
                  title: `${isNaN(pageData[PAGEDATA.EnergyOnlineRate]) ? 0 : (pageData[PAGEDATA.EnergyOnlineRate]*100).toFixed(1)}`,
                  unit: '%',
                  subTitle: '设备在线率'
                })}
              />
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [
                    { value: isNaN(pageData[PAGEDATA.EnergyOnlineRate]) ? 0 : pageData[PAGEDATA.EnergyOnlineRate]*100 },
                    { value: isNaN(pageData[PAGEDATA.EnergyOnlineRate]) ? 0 : 100 - pageData[PAGEDATA.EnergyOnlineRate]*100 }
                  ],
                  startAngle: 90,
                  title: `${isNaN(pageData[PAGEDATA.EnergyOnlineRate]) ? 0 : (100 - pageData[PAGEDATA.EnergyOnlineRate]*100).toFixed(1)}`,
                  unit: '%',
                  subTitle: '设备离线率'
                })}
              />
            </div>
          </div>
          
        </div>
        <div className="bottom-box">
          <div className="box-wrapper">
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{marginTop: '10px', backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">今日一览</span>
            </div>
            <div>
              <ComSummaryInfo items={{outTemp:atmosphere[0], boilerPower:pageData[PAGEDATA.EnergyBoilerPower], powerConsumptionToday:pageData[PAGEDATA.EnergyPowerConsumptionToday], 
                boilerRunningNum:pageData[PAGEDATA.EnergyBoilerRunningNum], tankRunningNum:pageData[PAGEDATA.EnergyTankRunningNum], 
                heatSupplyToday:pageData[PAGEDATA.EnergyHeatSupplyToday]}}/>
            </div>
          </div>
          <div className="box-wrapper">
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">蓄放热量统计</span>
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '320px' }}>
              <ReactEcharts style={{ width: '100%', height: '290px', margin: 'auto' }} option={{
                title: {
                  text: '',
                  left: '15',
                  top: '8',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                },
                grid: {
                  left: '55px',
                },
                xAxis: {
                  type: 'category',
                  name: '时',
                  data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#6cbcea',
                      width: 1,
                      type: 'solid'
                    }
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#ffffff'
                    }
                  },
                },
                yAxis: {
                  type: 'value',
                  name: 'KWH',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#6cbcea',
                      width: 1,
                      type: 'solid'
                    }
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#ffffff'
                    }
                  },
                  splitLine: {
                    show: false,
                    lineStyle: {
                      color: ['#192f44'],
                      width: 1,
                      type: 'solid'
                    }
                  }
                },
                series: [
                  {
                    data: pageData[PAGEDATA.EnergyHeatStorageAndRelease],
                    type: 'bar',
                    barWidth: 8,
                    itemStyle: {
                      color: {
                          type: 'linear',
                          x: 0, y: 0, x2: 0, y2: 1,
                          colorStops: [
                              { offset: 0, color: 'rgba(3, 223, 235, .9)' },
                              { offset: 1, color: 'rgba(3, 223, 235, 0)' }
                          ],
                      },
                      borderRadius: [4, 4, 0, 0]
                    }
                  }
                ]
              }} />
            </div>
          </div>
          <div className="box-wrapper">
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">锅炉耗电量统计</span>
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '300px' }}>
              <ReactEcharts style={{ width: '100%', height: '290px', margin: 'auto' }} option={{
                title: {
                  text: '',
                  left: '15',
                  top: '8',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                },
                grid: {
                  left: '55px',
                },
                // backgroundColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                //   { offset: 0, color: '#3fc7f3' },
                //   { offset: 1, color: '#420f80' },
                // ]),
                xAxis: {
                  type: 'category',
                  name: '时',
                  data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#6cbcea',
                      width: 1,
                      type: 'solid'
                    }
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#ffffff'
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  name: 'KW',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#6cbcea',
                      width: 1,
                      type: 'solid'
                    }
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#ffffff'
                    }
                  },
                  splitLine: {
                    show: false,
                    lineStyle: {
                      color: ['#192f44'],
                      width: 1,
                      type: 'solid'
                    }
                  }
                },
                series: [
                  {
                    data: pageData[PAGEDATA.EnergyBoilerEnergyCost],
                    type: 'bar',
                    barWidth: 8,
                    itemStyle: {
                      color: {
                          type: 'linear',
                          x: 0, y: 0, x2: 0, y2: 1,
                          colorStops: [
                              { offset: 0, color: 'rgba(3, 223, 235, .9)' },
                              { offset: 1, color: 'rgba(3, 223, 235, 0)' }
                          ],
                      },
                      borderRadius: [4, 4, 0, 0]
                    }
                  }
                ]
              }} />
            </div>
          </div>
          <div className="box-wrapper">
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">今日告警</span>
            </div>
            <div>
              <ComAlarms items={pageData[PAGEDATA.EnergyAlarmToday]}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
