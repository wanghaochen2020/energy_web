import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfoSecondPump } from '../../components/';
import './system-second-pump.scss';
import { PAGEDATA } from '../../constants/pageData';
import { EnergyStation } from '../../business/system-layer.service';
import { SERVERINFO } from '../../constants/app-info';

export const SystemSecondPump = () => {
  let [power, setPower] = useState(0)
  let [powerToday, setPowerToday] = useState(0)
  let [PumpRunningState1, setPumpRunningState1] = useState(0)
  let [PumpRunningState2, setPumpRunningState2] = useState(0)
  let [PumpRunningState3, setPumpRunningState3] = useState(0)
  let [PumpRunningState4, setPumpRunningState4] = useState(0)
  let [PumpRunningState5, setPumpRunningState5] = useState(0)
  let [PumpRunningState6, setPumpRunningState6] = useState(0)

  let messageFunc = useCallback((event) => {
    if (event.origin === SERVERINFO.modelIP) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        let iframe = document.getElementById('pump_model')
        if (!iframe || !iframe.contentWindow || !event || !event.data || !event.data.type) return
        switch(event.data.type) {
          case "ok"://加载完成
              iframe.contentWindow.postMessage({type:"pump_init"}, SERVERINFO.modelIP)
            break
        }
    } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
    }
  }, [])

  useEffect(()=>{
    EnergyStation.getTable(PAGEDATA.PumpPowerMin).then((res) => {
      setPower(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.PumpPowerToday).then((res) => {
      setPowerToday(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.PumpRunningState1).then((res) => {
      setPumpRunningState1(res.toFixed(0))
    })
    EnergyStation.getTable(PAGEDATA.PumpRunningState2).then((res) => {
      setPumpRunningState2(res.toFixed(0))
    })
    EnergyStation.getTable(PAGEDATA.PumpRunningState3).then((res) => {
      setPumpRunningState3(res.toFixed(0))
    })
    EnergyStation.getTable(PAGEDATA.PumpRunningState4).then((res) => {
      setPumpRunningState4(res.toFixed(0))
    })
    EnergyStation.getTable(PAGEDATA.PumpRunningState5).then((res) => {
      setPumpRunningState5(res.toFixed(0))
    })
    EnergyStation.getTable(PAGEDATA.PumpRunningState6).then((res) => {
      setPumpRunningState6(res.toFixed(0))
    })
    
    window.addEventListener('message', messageFunc)
    return () => {
      window.removeEventListener('message', messageFunc)
    }
  }, [])

  return (
    <div className="system-second-pump-view">
      <iframe id="pump_model" src={SERVERINFO.modelIP} className="iframe-style" title="chart" frameBorder="no"></iframe>
      <div className="operation-summary">
        <div className="alarm-info">
          <div className="alarm-number">64</div>
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
            <ComSummaryInfoSecondPump items={{power:power,powerToday:powerToday}}/>
          </div>
        </div>
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">空调热水泵运行状态</span>
          </div>
          <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '300px'}}>
            <div className="row-item-box">
              <div className="item-text">1号泵</div>
              <div className={"item-value text-"+(PumpRunningState1==0?"red":"green")}>{PumpRunningState1==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">2号泵</div>
              <div className={"item-value text-"+(PumpRunningState2==0?"red":"green")}>{PumpRunningState2==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">3号泵</div>
              <div className={"item-value text-"+(PumpRunningState3==0?"red":"green")}>{PumpRunningState3==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">4号泵</div>
              <div className={"item-value text-"+(PumpRunningState4==0?"red":"green")}>{PumpRunningState4==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">5号泵</div>
              <div className={"item-value text-"+(PumpRunningState5==0?"red":"green")}>{PumpRunningState5==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">6号泵</div>
              <div className={"item-value text-"+(PumpRunningState6==0?"red":"green")}>{PumpRunningState6==0?"OFF":"ON"}</div>
            </div>
            {/* <ReactEcharts style={{ width: '100%', height: '290px', margin: 'auto' }} option={{
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
                  data: [150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                    230, 224, 100, 218, 135, 80, 147, 260, 200, 100],
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
            }} /> */}
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
