import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfo } from '../../components/';
import './system-energy-station.scss';
import { EnergyStation } from '../../business/system-layer.service';
import { PAGEDATA } from '../../constants/pageData';

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
    let dayStr = EnergyStation.getDayStr()
    EnergyStation.getTable(PAGEDATA.EnergyHeatStorageAndRelease, dayStr).then((res)=> {
      setHeatStorageAndRelease(res)
    })
    EnergyStation.getTable(PAGEDATA.EnergyBoilerEnergyCost, dayStr).then((res)=> {
      setBoilerEnergyCost(res)
    })
  }, [])

  return (
    <div className="system-energy-station-view">
      <iframe src="http://10.112.154.218:7655" className="iframe-style" title="chart"></iframe>
      <div className="system-energy-station-content">
        <div className="operation-summary">
          <div className="alarm-info">
            <div className="alarm-number">85</div>
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
          <div className="top-info-box">
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
              <ComAlarms />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
