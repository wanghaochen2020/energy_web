import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfo } from '../../components/';
import './system-energy-station.scss';
import { EnergyStation } from '../../business/system-layer.service';
import { PAGEDATA } from '../../constants/pageData';
import { SERVERINFO } from '../../constants/app-info';

export const SystemEnergyStation = () => {
  let [onlineRate, setOnlineRate] = useState(0)
  let [offlineRate, setOfflineRate] = useState(0)
  let [boilerPower, setBoilerPower] = useState(0)
  let [powerConsumptionToday, setPowerConsumptionToday] = useState(0)
  let [boilerRunningNum, setBoilerRunningNum] = useState(0)
  let [tankRunningNum, setTankRunningNum] = useState(0)
  let [heatSupplyToday, setHeatSupplyToday] = useState(0)
  let [heatStorageAndRelease, setHeatStorageAndRelease] = useState([])
  let [boilerEnergyCost, setBoilerEnergyCost] = useState([])
  let [alarmNum, setAlarmNum] = useState(0)
  let [alarm, setAlarm] = useState(0)
  let [boilerOutT1, setBoilerOutT1] = useState(0)
  let [boilerOutT2, setBoilerOutT2] = useState(0)
  let [boilerOutT3, setBoilerOutT3] = useState(0)
  let [boilerOutT4, setBoilerOutT4] = useState(0)
  let [boilerInT1, setBoilerInT1] = useState(0)
  let [boilerInT2, setBoilerInT2] = useState(0)
  let [boilerInT3, setBoilerInT3] = useState(0)
  let [boilerInT4, setBoilerInT4] = useState(0)

  let messageFunc = useCallback((event) => {
    if (event.origin === SERVERINFO.modelIP) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        let iframe = document.getElementById('energy_model')
        if (!iframe || !iframe.contentWindow || !event || !event.data || !event.data.type) return
        switch(event.data.type) {
          case "ok"://加载完成
              iframe.contentWindow.postMessage({type:"energy_station_init"}, SERVERINFO.modelIP)
            break
          case "device"://请求设备信息
            if (!event.data.data) {
              return
            }
            var data
            switch(event.data.data) {
              case "1#电极锅炉":
                data = {
                  title:"1#电极锅炉",
                  title1:"运行功率",
                  title2:"供水温度",
                  title3:"回水温度",
                  title4:"用电量",
                  data1: "4MW",
                  data2: boilerOutT1+"℃",
                  data3: boilerInT1+"℃",
                  data4: "0KWH",
                }
                break
              case "2#电极锅炉":
                data = {
                  title:"2#电极锅炉",
                  title1:"运行功率",
                  title2:"供水温度",
                  title3:"回水温度",
                  title4:"用电量",
                  data1: "4MW",
                  data2: boilerOutT2+"℃",
                  data3: boilerInT2+"℃",
                  data4: "0KWH",
                }
                break
              case "3#电极锅炉":
                data = {
                  title:"3#电极锅炉",
                  title1:"运行功率",
                  title2:"供水温度",
                  title3:"回水温度",
                  title4:"用电量",
                  data1: "4MW",
                  data2: boilerOutT3+"℃",
                  data3: boilerInT3+"℃",
                  data4: "0KWH",
                }
                break
              case "4#电极锅炉":
                data = {
                  title:"4#电极锅炉",
                  title1:"运行功率",
                  title2:"供水温度",
                  title3:"回水温度",
                  title4:"用电量",
                  data1: "4MW",
                  data2: boilerOutT4+"℃",
                  data3: boilerInT4+"℃",
                  data4: "0KWH",
                }
                break
            }
            iframe.contentWindow.postMessage({type:"window_update",data:data}, SERVERINFO.modelIP)
        }
    } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
    }
  }, [boilerOutT1,boilerOutT2,boilerOutT3,boilerOutT4,boilerInT1,boilerInT2,boilerInT3,boilerInT4])

  useEffect(()=>{
    EnergyStation.getTable(PAGEDATA.EnergyOnlineRate).then((res)=>{
      setOnlineRate((res*100).toFixed(2))
      setOfflineRate(((1-res)*100).toFixed(2))
      setOfflineRate(((1-res)*100).toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.EnergyBoilerPower).then((res)=> {
      setBoilerPower(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.EnergyPowerConsumptionToday).then((res)=> {
      setPowerConsumptionToday(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.EnergyBoilerRunningNum).then((res)=> {
      setBoilerRunningNum(res.toFixed(0))
    })
    EnergyStation.getTable(PAGEDATA.EnergyTankRunningNum).then((res)=> {
      setTankRunningNum(res.toFixed(0))
    })
    EnergyStation.getTable(PAGEDATA.EnergyHeatSupplyToday).then((res)=> {
      setHeatSupplyToday((res/1e9).toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.EnergyAlarmNumToday).then((res)=> {
      setAlarmNum(res.toFixed(0))
    })
    let dayStr = EnergyStation.getDayStr()
    let hourStr = EnergyStation.getDayStr()
    let min = EnergyStation.getMin()
    EnergyStation.getTable(PAGEDATA.EnergyHeatStorageAndRelease, dayStr).then((res)=> {
      setHeatStorageAndRelease(res)
    })
    EnergyStation.getTable(PAGEDATA.EnergyBoilerEnergyCost, dayStr).then((res)=> {
      setBoilerEnergyCost(res)
    })
    EnergyStation.getTable(PAGEDATA.EnergyAlarmToday, dayStr).then((res) => {
      setAlarm(res)
    })
    EnergyStation.getOPC(PAGEDATA.EnergyBoilerInT1, hourStr).then((res)=> {
      setBoilerInT1(res[min].toFixed(2))
    })
    EnergyStation.getOPC(PAGEDATA.EnergyBoilerInT2, hourStr).then((res)=> {
      setBoilerInT2(res[min].toFixed(2))
    })
    EnergyStation.getOPC(PAGEDATA.EnergyBoilerInT3, hourStr).then((res)=> {
      setBoilerInT3(res[min].toFixed(2))
    })
    EnergyStation.getOPC(PAGEDATA.EnergyBoilerInT4, hourStr).then((res)=> {
      setBoilerInT4(res[min].toFixed(2))
    })
    EnergyStation.getOPC(PAGEDATA.EnergyBoilerOutT1, hourStr).then((res)=> {
      setBoilerOutT1(res[min].toFixed(2))
    })
    EnergyStation.getOPC(PAGEDATA.EnergyBoilerOutT2, hourStr).then((res)=> {
      setBoilerOutT2(res[min].toFixed(2))
    })
    EnergyStation.getOPC(PAGEDATA.EnergyBoilerOutT3, hourStr).then((res)=> {
      setBoilerOutT3(res[min].toFixed(2))
    })
    EnergyStation.getOPC(PAGEDATA.EnergyBoilerOutT4, hourStr).then((res)=> {
      setBoilerOutT4(res[min].toFixed(2))
    })

    window.addEventListener('message', messageFunc)
    return () => {
      window.removeEventListener('message', messageFunc)
    }

  }, [messageFunc])

  return (
    <div className="system-energy-station-view">
      <iframe id="energy_model" src={SERVERINFO.modelIP} className="iframe-style" title="chart" frameBorder="no"></iframe>
      <div className="system-energy-station-content">
        <div className="operation-summary">
          <div className="alarm-info">
            <div className="alarm-number">{alarmNum}</div>
            <div className="alarm-label">告警次数</div>
            <span className="alarm-left-corner"></span>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
              tooltip: {
                show: false
              },
              series: [
                {
                  type: 'pie',
                  radius: ['80%', '100%'],
                  startAngle: 360,
                  hoverAnimation: false,
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    { value: 100-onlineRate, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                    { value: onlineRate, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#33d7ea' } }
                  ]
                }
              ]
            }} />
            <div className="number-value">设备在线率: {onlineRate}%</div>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
              tooltip: {
                show: false
              },
              series: [
                {
                  type: 'pie',
                  radius: ['80%', '100%'],
                  startAngle: 320,
                  hoverAnimation: false,
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    { value: 100-offlineRate, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                    { value: offlineRate, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#ecf75d' } }
                  ]
                }
              ]
            }} />
            <div className="number-value">设备离线率: {offlineRate}%</div>
          </div>
          {/* <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
              tooltip: {
                show: false
              },
              series: [
                {
                  type: 'pie',
                  radius: ['80%', '100%'],
                  startAngle: 270,
                  hoverAnimation: false,
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                    { value: 50, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#45f9b7' } }
                  ]
                }
              ]
            }} />
            <div className="number-value">监控正常率: 80%</div>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
              tooltip: {
                show: false
              },
              series: [
                {
                  type: 'pie',
                  radius: ['80%', '100%'],
                  startAngle: 360,
                  hoverAnimation: false,
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                    { value: 80, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#33d7ea' } }
                  ]
                }
              ]
            }} />
            <div className="number-value">监控异常率: 20%</div>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
              tooltip: {
                show: false
              },
              series: [
                {
                  type: 'pie',
                  radius: ['80%', '100%'],
                  startAngle: 320,
                  hoverAnimation: false,
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                    { value: 60, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#ecf75d' } }
                  ]
                }
              ]
            }} />
            <div className="number-value">正在维护率: 30%</div>
          </div> */}
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
              <ComSummaryInfo items={{boilerPower:boilerPower, powerConsumptionToday:powerConsumptionToday, 
                boilerRunningNum:boilerRunningNum, tankRunningNum:tankRunningNum, heatSupplyToday:heatSupplyToday}}/>
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
                    data: heatStorageAndRelease,
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
                // backgroundColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                //   { offset: 0, color: '#3fc7f3' },
                //   { offset: 1, color: '#420f80' },
                // ]),
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
                    data: boilerEnergyCost,
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
              <ComAlarms items={alarm}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
