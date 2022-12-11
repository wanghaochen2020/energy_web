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

export const SystemRefrigerationCenter = () => {
  let [power, setPower] = useState(0)
  let [energyCostToday, setEnergyCostToday] = useState(0)
  let [machineRunningNum, setMachineRunningNum] = useState(0)
  let [coolingWaterInT, setCoolingWaterInT] = useState(0)
  let [coolingWaterOutT, setCoolingWaterOutT] = useState(0)
  let [refrigeratedWaterInT, setRefrigeratedWaterInT] = useState(0)
  let [refrigeratedWaterOutT, setRefrigeratedWaterOutT] = useState(0)
  let [machinePower, setMachinePower] = useState(0)
  let [energyCostDay, setEnergyCostDay] = useState([])

  let pump = [], setPump = [];
  for(let i=0;i<=15;i++) {
    [pump[i], setPump[i]] = useState("0");
  }
  
  let CM = {
    run:[],
    power:[],
    coolInT:[],
    coolOutT:[],
    coldInT:[],
    coldOutT:[],
    pres:[]
  };
  let setCM = {
    run:[],
    power:[],
    coolInT:[],
    coolOutT:[],
    coldInT:[],
    coldOutT:[],
    pres:[]
  };
  for(let i=0;i<=2;i++) {
    [CM.run[i], setCM.run[i]] = useState(0);
    [CM.power[i], setCM.power[i]] = useState(0);
    [CM.coolInT[i], setCM.coolInT[i]] = useState(0);
    [CM.coolOutT[i], setCM.coolOutT[i]] = useState(0);
    [CM.coldInT[i], setCM.coldInT[i]] = useState(0);
    [CM.coldOutT[i], setCM.coldOutT[i]] = useState(0);
    [CM.pres[i], setCM.pres[i]] = useState(0)
  }
  
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
                data.data1 = pump[0] == 0 ? "关闭" : "开启"
                break
              case "2#冷却泵":
                data = basicPump
                data.title = "2#冷却泵"
                data.data1 = pump[1] == 0 ? "关闭" : "开启"
                break
              case "3#冷却泵":
                data = basicPump
                data.title = "3#冷却泵"
                data.data1 = pump[2] == 0 ? "关闭" : "开启"
                break
              case "4#冷却泵":
                data = basicPump
                data.title = "4#冷却泵"
                data.data1 = pump[3] == 0 ? "关闭" : "开启"
                break
              case "5#冷却泵":
                data = basicPump
                data.title = "5#冷却泵"
                data.data1 = pump[4] == 0 ? "关闭" : "开启"
                break
              case "1#空调冷水一次泵":
                data = basicPump
                data.title = "1#空调冷水一次泵"
                data.data1 = pump[5] == 0 ? "关闭" : "开启"
                break
              case "2#空调冷水一次泵":
                data = basicPump
                data.title = "2#空调冷水一次泵"
                data.data1 = pump[6] == 0 ? "关闭" : "开启"
                break
              case "3#空调冷水一次泵":
                data = basicPump
                data.title = "3#空调冷水一次泵"
                data.data1 = pump[7] == 0 ? "关闭" : "开启"
                break
              case "4#空调冷水一次泵":
                data = basicPump
                data.title = "4#空调冷水一次泵"
                data.data1 = pump[8] == 0 ? "关闭" : "开启"
                break
              case "5#空调冷水一次泵":
                data = basicPump
                data.title = "5#空调冷水一次泵"
                data.data1 = pump[9] == 0 ? "关闭" : "开启"
                break
              case "1#空调冷水二次泵":
                data = basicPump
                data.title = "1#空调冷水二次泵"
                data.data1 = pump[10] == 0 ? "关闭" : "开启"
                break
              case "2#空调冷水二次泵":
                data = basicPump
                data.title = "2#空调冷水二次泵"
                data.data1 = pump[11] == 0 ? "关闭" : "开启"
                break
              case "3#空调冷水二次泵":
                data = basicPump
                data.title = "3#空调冷水二次泵"
                data.data1 = pump[12] == 0 ? "关闭" : "开启"
                break
              case "4#空调冷水二次泵":
                data = basicPump
                data.title = "4#空调冷水二次泵"
                data.data1 = pump[13] == 0 ? "关闭" : "开启"
                break
              case "5#空调冷水二次泵":
                data = basicPump
                data.title = "5#空调冷水二次泵"
                data.data1 = pump[14] == 0 ? "关闭" : "开启"
                break
              case "6#空调冷水二次泵":
                data = basicPump
                data.title = "6#空调冷水二次泵"
                data.data1 = pump[15] == 0 ? "关闭" : "开启"
                break
              case "1#离心机":
                data = basicColdMachine
                data.title = "1#离心机"
                data.data1 = CM.run[0] == 0 ? "关闭" : "开启"
                data.data2 = CM.power[0] + "KWH"
                data.data3 = CM.coolInT[0] + "/" + CM.coolOutT[0] + "℃"
                data.data4 = CM.coldInT[0] + "/" + CM.coldOutT[0] + "℃"
                data.data5 = CM.pres[0] + "MPa"
                break
              case "2#离心机":
                data = basicColdMachine
                data.title = "2#离心机"
                data.data1 = CM.run[1] == 0 ? "关闭" : "开启"
                data.data2 = CM.power[1] + "KWH"
                data.data3 = CM.coolInT[1] + "/" + CM.coolOutT[1] + "℃"
                data.data4 = CM.coldInT[1] + "/" + CM.coldOutT[1] + "℃"
                data.data5 = CM.pres[1] + "MPa"
                break
              case "螺杆机":
                data = basicColdMachine
                data.title = "螺杆机"
                data.data1 = CM.run[2] == 0 ? "关闭" : "开启"
                data.data2 = CM.power[2] + "KWH"
                data.data3 = CM.coolInT[2] + "/" + CM.coolOutT[2] + "℃"
                data.data4 = CM.coldInT[2] + "/" + CM.coldOutT[2] + "℃"
                data.data5 = CM.pres[2] + "MPa"
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
  }, CM.power)

  useEffect(() => {
    console.log("effect")
    EnergyStation.getTable(PAGEDATA.ColdPowerMin).then((res) => {
      setPower(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.ColdEnergyCostToday).then((res) => {
      setEnergyCostToday(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.ColdMachineRunningNum).then((res) => {
      setMachineRunningNum(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.ColdCoolingWaterInT).then((res) => {
      setCoolingWaterInT((res/100).toFixed(2));
    });
    EnergyStation.getTable(PAGEDATA.ColdCoolingWaterOutT).then((res) => {
      setCoolingWaterOutT((res/100).toFixed(2));
    });
    EnergyStation.getTable(PAGEDATA.ColdRefrigeratedWaterInT).then((res) => {
      setRefrigeratedWaterInT((res/100).toFixed(2));
    });
    EnergyStation.getTable(PAGEDATA.ColdRefrigeratedWaterOutT).then((res) => {
      setRefrigeratedWaterOutT((res/100).toFixed(2));
    });
    EnergyStation.getTable(PAGEDATA.ColdMachinePowerMin).then((res) => {
      setMachinePower(res.toFixed(2));
    });
    let dayStr = EnergyStation.getDayStr();
    let hourStr = EnergyStation.getHourStr();
    let min = EnergyStation.getMin();
    EnergyStation.getTable(PAGEDATA.ColdEnergyCostDay, dayStr).then((res)=> {
      setEnergyCostDay(res);
    })
    
    for (let i=0;i<=15;i++) {
      EnergyStation.getOPC(PAGEDATA.ColdPumpState[i], hourStr).then((res)=> {
        res && res[min] && setPump[i](res[min]);
      })
    }
    for (let i=0;i<=2;i++) {
      EnergyStation.getOPC(PAGEDATA.ColdMachineRun[i], hourStr).then((res)=> {
        res && res[min] && setCM.run[i](res[min]);
      })
      EnergyStation.getTable(PAGEDATA.ColdMachinePowerMinList[i]).then((res) => {
        // console.log(res)
        setCM.power[i](1);
        // setCM.power[i](res.toFixed(1))
      })
      EnergyStation.getOPC(PAGEDATA.ColdMachineCoolInT[i], hourStr).then((res)=> {
        res && res[min] && setCM.coolInT[i](res[min].toFixed(1));
      })
      EnergyStation.getOPC(PAGEDATA.ColdMachineCoolOutT[i], hourStr).then((res)=> {
        res && res[min] && setCM.coolOutT[i](res[min].toFixed(1));
      })
      EnergyStation.getOPC(PAGEDATA.ColdMachineColdInT[i], hourStr).then((res)=> {
        res && res[min] && setCM.coldInT[i](res[min].toFixed(1));
      })
      EnergyStation.getOPC(PAGEDATA.ColdMachineColdOutT[i], hourStr).then((res)=> {
        res && res[min] && setCM.coldOutT[i](res[min].toFixed(1))
      })
      EnergyStation.getOPC(PAGEDATA.ColdMachinePresure[i], hourStr).then((res)=> {
        res && res[min] && setCM.pres[i](res[min].toFixed(1))
      })
    }
    
    console.log("effect_end")
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
          <div className="alarm-number">56</div>
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
            <ComSummaryInfoRefrigeration items={{power:power, energyCostToday:energyCostToday, machineRunningNum:machineRunningNum, coolingWaterInT:coolingWaterInT,
              coolingWaterOutT:coolingWaterOutT, refrigeratedWaterInT:refrigeratedWaterInT, refrigeratedWaterOutT:refrigeratedWaterOutT, machinePower:machinePower}}/>
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
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
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
                  data: energyCostDay,
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
            <ComAlarms />
          </div>
        </div>
      </div>
    </div>
  );
}
