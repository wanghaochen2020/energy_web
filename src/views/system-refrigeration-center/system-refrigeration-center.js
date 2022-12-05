import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfoRefrigeration } from '../../components/';
import './system-refrigeration-center.scss';
import { EnergyStation } from '../../business/system-layer.service';
import { PAGEDATA } from '../../constants/pageData';
import { SERVERINFO } from '../../constants/app-info';

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
        }
    } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
    }
  }, [])

  useEffect(() => {
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
      setCoolingWaterInT((res/100).toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.ColdCoolingWaterOutT).then((res) => {
      setCoolingWaterOutT((res/100).toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.ColdRefrigeratedWaterInT).then((res) => {
      setRefrigeratedWaterInT((res/100).toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.ColdRefrigeratedWaterOutT).then((res) => {
      setRefrigeratedWaterOutT((res/100).toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.ColdMachinePowerMin).then((res) => {
      setMachinePower(res.toFixed(2))
    })
    let dayStr = EnergyStation.getDayStr()
    EnergyStation.getTable(PAGEDATA.ColdEnergyCostDay, dayStr).then((res)=> {
      setEnergyCostDay(res)
    })
    
    window.addEventListener('message', messageFunc)
    return () => {
      window.removeEventListener('message', messageFunc)
    }
  }, [])

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
