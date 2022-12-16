import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfoRefrigeration } from '../../components/';
import './system-refrigeration-center.scss';
import { EnergyStation } from '../../business/system-layer.service';
import { PAGEDATA } from '../../constants/pageData';
import { SERVERINFO } from '../../constants/app-info';
import { TimePicker } from 'antd';

const basicPump = {
  title1:"运行状态",
  title2:"运行功率",
  title3:"流量",
  data1:"关闭",
  data2: "7.5kW",
  data3: "137m³/h",
}

const basicColdMachine = {
  title1:"运行状态",
  title2:"实时功率",
  title3:"冷却水进出口温度",
  title4:"冷冻水进出口温度",
  title5:"压力",
  title6:"COP",
  data1:"关闭",
  data2: "3000kW",
  data3: "35/30℃",
  data4: "7/12℃",
  data5:"4MPa",
  data6:"6.43",
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

const system_cold_data = {
  "basic_data":[
    PAGEDATA.ColdPowerMin,PAGEDATA.ColdEnergyCostToday,PAGEDATA.ColdMachineRunningNum,PAGEDATA.ColdCoolingWaterInT,PAGEDATA.ColdCoolingWaterOutT,
    PAGEDATA.ColdRefrigeratedWaterInT,PAGEDATA.ColdRefrigeratedWaterOutT,PAGEDATA.ColdMachinePowerMin,PAGEDATA.ColdAlarmNumToday
  ],
  "basic_data_list_day":[
    PAGEDATA.ColdEnergyCostDay,PAGEDATA.ColdAlarmToday
  ],
  "basic_data_list_hour":[],
  "basic_opc_list":PAGEDATA.ColdPumpState.concat(PAGEDATA.ColdMachineRun).concat(PAGEDATA.ColdMachinePowerMinList)
  .concat(PAGEDATA.ColdMachineCoolInT).concat(PAGEDATA.ColdMachineCoolOutT).concat(PAGEDATA.ColdMachinePresure)
}

export const SystemRefrigerationCenter = () => {
  let [pageData, setPageData] = useState({});
  
  let messageFunc = useCallback((event) => {
    if (event.origin === SERVERINFO.modelIP) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        let iframe = document.getElementById('cold_model')
        if (!iframe || !iframe.contentWindow || !event || !event.data || !event.data.type) return
        switch(event.data.type) {
          case "ok"://加载完成
              iframe.contentWindow.postMessage({type:"cold_init"}, SERVERINFO.modelIP)
            break
          case "device"://请求设备信息
            if (!event.data.data) {
              return
            }
            let data = {}
            switch(event.data.data) {
              case "1#冷却泵":
                data = basicPump
                data.title = "1#冷却泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[0]] == 0 ? "关闭" : "开启"
                break
              case "2#冷却泵":
                data = basicPump
                data.title = "2#冷却泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[1]] == 0 ? "关闭" : "开启"
                break
              case "3#冷却泵":
                data = basicPump
                data.title = "3#冷却泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[2]] == 0 ? "关闭" : "开启"
                break
              case "4#冷却泵":
                data = basicPump
                data.title = "4#冷却泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[3]] == 0 ? "关闭" : "开启"
                break
              case "5#冷却泵":
                data = basicPump
                data.title = "5#冷却泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[4]] == 0 ? "关闭" : "开启"
                break
              case "1#空调冷水一次泵":
                data = basicPump
                data.title = "1#空调冷水一次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[5]] == 0 ? "关闭" : "开启"
                break
              case "2#空调冷水一次泵":
                data = basicPump
                data.title = "2#空调冷水一次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[6]] == 0 ? "关闭" : "开启"
                break
              case "3#空调冷水一次泵":
                data = basicPump
                data.title = "3#空调冷水一次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[7]] == 0 ? "关闭" : "开启"
                break
              case "4#空调冷水一次泵":
                data = basicPump
                data.title = "4#空调冷水一次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[8]] == 0 ? "关闭" : "开启"
                break
              case "5#空调冷水一次泵":
                data = basicPump
                data.title = "5#空调冷水一次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[9]] == 0 ? "关闭" : "开启"
                break
              case "1#空调冷水二次泵":
                data = basicPump
                data.title = "1#空调冷水二次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[10]] == 0 ? "关闭" : "开启"
                break
              case "2#空调冷水二次泵":
                data = basicPump
                data.title = "2#空调冷水二次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[11]] == 0 ? "关闭" : "开启"
                break
              case "3#空调冷水二次泵":
                data = basicPump
                data.title = "3#空调冷水二次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[12]] == 0 ? "关闭" : "开启"
                break
              case "4#空调冷水二次泵":
                data = basicPump
                data.title = "4#空调冷水二次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[13]] == 0 ? "关闭" : "开启"
                break
              case "5#空调冷水二次泵":
                data = basicPump
                data.title = "5#空调冷水二次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[14]] == 0 ? "关闭" : "开启"
                break
              case "6#空调冷水二次泵":
                data = basicPump
                data.title = "6#空调冷水二次泵"
                data.data1 = pageData[PAGEDATA.ColdPumpState[15]] == 0 ? "关闭" : "开启"
                break
              case "1#离心机":
                data = basicColdMachine
                data.title = "1#离心机"
                data.data1 = pageData[PAGEDATA.ColdMachineRun[0]] == 0 ? "关闭" : "开启"
                data.data2 = pageData[PAGEDATA.ColdMachinePowerMinList[0]] + "KWH"
                data.data3 = pageData[PAGEDATA.ColdMachineCoolInT[0]] + "/" + pageData[PAGEDATA.ColdMachineCoolOutT[0]] + "℃"
                data.data4 = pageData[PAGEDATA.ColdMachineColdInT[0]] + "/" + pageData[PAGEDATA.ColdMachineColdOutT[0]] + "℃"
                data.data5 = pageData[PAGEDATA.ColdMachinePresure[0]] + "MPa"
                break
              case "2#离心机":
                data = basicColdMachine
                data.title = "2#离心机"
                data.data1 = pageData[PAGEDATA.ColdMachineRun[1]] == 0 ? "关闭" : "开启"
                data.data2 = pageData[PAGEDATA.ColdMachinePowerMinList[1]] + "KWH"
                data.data3 = pageData[PAGEDATA.ColdMachineCoolInT[1]] + "/" + pageData[PAGEDATA.ColdMachineCoolOutT[1]] + "℃"
                data.data4 = pageData[PAGEDATA.ColdMachineColdInT[1]] + "/" + pageData[PAGEDATA.ColdMachineColdOutT[1]] + "℃"
                data.data5 = pageData[PAGEDATA.ColdMachinePresure[1]] + "MPa"
                break
              case "螺杆机":
                data = basicColdMachine
                data.title = "螺杆机"
                data.data1 = pageData[PAGEDATA.ColdMachineRun[2]] == 0 ? "关闭" : "开启"
                data.data2 = pageData[PAGEDATA.ColdMachinePowerMinList[2]] + "KWH"
                data.data3 = pageData[PAGEDATA.ColdMachineCoolInT[2]] + "/" + pageData[PAGEDATA.ColdMachineCoolOutT[2]] + "℃"
                data.data4 = pageData[PAGEDATA.ColdMachineColdInT[2]] + "/" + pageData[PAGEDATA.ColdMachineColdOutT[2]] + "℃"
                data.data5 = pageData[PAGEDATA.ColdMachinePresure[2]] + "MPa"
                data.data6 = "6.10"
                break
              case "V1112":
                data = basicValve
                data.title = "阀门V1112"
                break
              case "V1114":
                data = basicValve
                data.title = "阀门V1114"
                break
              case "V1118":
                data = basicValve
                data.title = "阀门V1118"
                break
              case "V1119":
                data = basicValve
                data.title = "阀门V1119"
                break
              case "V1120":
                data = basicValve
                data.title = "阀门V1120"
                break
              case "V1121":
                data = basicValve
                data.title = "阀门V1121"
                break
              case "V1122":
                data = basicValve
                data.title = "阀门V1122"
                break
              case "V1123":
                data = basicValve
                data.title = "阀门V1123"
                break
              case "V1124":
                data = basicValve
                data.title = "阀门V1124"
                break
              case "V1125":
                data = basicValve
                data.title = "阀门V1125"
                break
              case "V1132":
                data = basicValve
                data.title = "阀门V1132"
                break
              case "V1133":
                data = basicValve
                data.title = "阀门V1133"
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
  }, [pageData])

  useEffect(() => {
    let dayStr = EnergyStation.getDayStr();
    let hourStr = EnergyStation.getHourStr();
    let min = EnergyStation.getMin();

    EnergyStation.postPageData({
      data:system_cold_data,
      day_str:dayStr,
      hour_str:hourStr
    }).then((res) => {
      let needChange = false;
      res[PAGEDATA.ColdAlarmNumToday] = res[PAGEDATA.ColdAlarmNumToday].toFixed(0);
      res[PAGEDATA.ColdPowerMin] = res[PAGEDATA.ColdPowerMin].toFixed(2);
      res[PAGEDATA.ColdEnergyCostToday] = res[PAGEDATA.ColdEnergyCostToday].toFixed(2);
      res[PAGEDATA.ColdMachineRunningNum] = res[PAGEDATA.ColdMachineRunningNum].toFixed(2);
      res[PAGEDATA.ColdCoolingWaterInT] = (res[PAGEDATA.ColdCoolingWaterInT]/100).toFixed(2);
      res[PAGEDATA.ColdCoolingWaterOutT] = (res[PAGEDATA.ColdCoolingWaterOutT]/100).toFixed(2);
      res[PAGEDATA.ColdRefrigeratedWaterInT] = (res[PAGEDATA.ColdRefrigeratedWaterInT]/100).toFixed(2);
      res[PAGEDATA.ColdRefrigeratedWaterOutT] = (res[PAGEDATA.ColdRefrigeratedWaterOutT]/100).toFixed(2);
      res[PAGEDATA.ColdMachinePowerMin] = res[PAGEDATA.ColdMachinePowerMin].toFixed(2);
        
      for (let i=0;i<=15;i++) {
        res[PAGEDATA.ColdPumpState[i]] = getList(res[PAGEDATA.ColdPumpState[i]], min);
      }
      
      for (let i=0;i<=2;i++) {
        res[PAGEDATA.ColdMachineRun[i]] = getList(res[PAGEDATA.ColdMachineRun[i]], min);
        res[PAGEDATA.ColdMachinePowerMinList[i]] = getList(res[PAGEDATA.ColdMachinePowerMinList[i]], min);
        res[PAGEDATA.ColdMachineCoolInT[i]] = getList(res[PAGEDATA.ColdMachineCoolInT[i]], min).toFixed(1);
        res[PAGEDATA.ColdMachineCoolOutT[i]] = getList(res[PAGEDATA.ColdMachineCoolOutT[i]], min).toFixed(1);
        res[PAGEDATA.ColdMachineColdInT[i]] = getList(res[PAGEDATA.ColdMachineColdInT[i]], min).toFixed(1);
        res[PAGEDATA.ColdMachineColdOutT[i]] = getList(res[PAGEDATA.ColdMachineColdOutT[i]], min).toFixed(1);
        res[PAGEDATA.ColdMachinePresure[i]] = getList(res[PAGEDATA.ColdMachinePresure[i]], min).toFixed(1);
      }

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
    <div className="system-refrigeration-center-view">
      <iframe id="cold_model" src={SERVERINFO.modelIP} className="iframe-style" title="chart" frameBorder="no"></iframe>
      <div className="operation-summary">
        <div className="alarm-info">
          <div className="alarm-number">{pageData[PAGEDATA.ColdAlarmNumToday]}</div>
          <div className="alarm-label">告警次数</div>
          <span className="alarm-left-corner"></span>
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
            <ComSummaryInfoRefrigeration items={{power:pageData[PAGEDATA.ColdPowerMin], energyCostToday:pageData[PAGEDATA.ColdEnergyCostToday], 
              machineRunningNum:pageData[PAGEDATA.ColdMachineRunningNum], coolingWaterInT:pageData[PAGEDATA.ColdCoolingWaterInT],
              coolingWaterOutT:pageData[PAGEDATA.ColdCoolingWaterOutT], refrigeratedWaterInT:pageData[PAGEDATA.ColdRefrigeratedWaterInT],
              refrigeratedWaterOutT:pageData[PAGEDATA.ColdRefrigeratedWaterOutT], machinePower:pageData[PAGEDATA.ColdMachinePowerMin]}}/>
          </div>
        </div>
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">制冷机组耗电量统计</span>
          </div>
          <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '320px'}}>
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
                  data: pageData[PAGEDATA.ColdEnergyCostDay],
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
            <ComAlarms items={pageData[PAGEDATA.ColdAlarmToday]}/>
          </div>
        </div>
      </div>
    </div>
  );
}
