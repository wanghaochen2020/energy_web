import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfoSolarWater } from '../../components/';
import './system-solar-water-heater.scss';
import { EnergyStation } from '../../business/system-layer.service';
import { PAGEDATA } from '../../constants/pageData';
import { SERVERINFO } from '../../constants/app-info';

export const SystemSolarWaterHeater = () => {
  const [chartDateButtons, setChartDateButton] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);

  const selectChartDateButton = (item) => {
    chartDateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartDateButton([...chartDateButtons]);
  }

  let [power, setPower] = useState(0)
  let [SolarWaterHeatCollecterInT, setSolarWaterHeatCollecterInT] = useState(0)
  let [SolarWaterHeatCollecterOutT, setSolarWaterHeatCollecterOutT] = useState(0)
  let [SolarWaterJRQT, setSolarWaterJRQT] = useState(0)
  let [SolarWaterHeatCollectionToday, setSolarWaterHeatCollectionToday] = useState(0)
  let [SolarWaterPumpRunningNum, setSolarWaterPumpRunningNum] = useState(0)
  let [SolarWaterHeatCollectionDay, setSolarWaterHeatCollectionDay] = useState([])
  let [SolarWaterBoilerPowerConsumptionDay, setSolarWaterBoilerPowerConsumptionDay] = useState([])
  
  let messageFunc = useCallback((event) => {
    if (event.origin === SERVERINFO.modelIP) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        let iframe = document.getElementById('solar_water_model')
        if (!iframe || !iframe.contentWindow || !event || !event.data || !event.data.type) return
        switch(event.data.type) {
          case "ok"://加载完成
              iframe.contentWindow.postMessage({type:"solar_water_init"}, SERVERINFO.modelIP)
            break
          case "device"://请求设备信息
            if (!event.data.data) {
              return
            }
            let data = {}
            switch(event.data.data) {
              case "集热器":
                data = {
                  title:"太阳能集热器",
                  title1:"供水温度",
                  title2:"回水温度",
                  data1:"57",
                  data2:"19",
                }
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
    EnergyStation.getTable(PAGEDATA.SolarWaterBoilerPowerConsumptionToday).then((res) => {
      setPower(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.SolarWaterHeatCollecterInT).then((res) => {
      setSolarWaterHeatCollecterInT(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.SolarWaterHeatCollecterOutT).then((res) => {
      setSolarWaterHeatCollecterOutT(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.SolarWaterJRQT).then((res) => {
      setSolarWaterJRQT(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.SolarWaterHeatCollectionToday).then((res) => {
      setSolarWaterHeatCollectionToday(res.toFixed(2))
    })
    EnergyStation.getTable(PAGEDATA.SolarWaterPumpRunningNum).then((res) => {
      setSolarWaterPumpRunningNum(res.toFixed(0))
    })
    let dayStr = EnergyStation.getDayStr()
    EnergyStation.getTable(PAGEDATA.SolarWaterHeatCollectionDay, dayStr).then((res)=> {
      setSolarWaterHeatCollectionDay(res)
    })
    EnergyStation.getTable(PAGEDATA.SolarWaterBoilerPowerConsumptionDay, dayStr).then((res)=> {
      setSolarWaterBoilerPowerConsumptionDay(res)
    })
    
    window.addEventListener('message', messageFunc)
    return () => {
      window.removeEventListener('message', messageFunc)
    }
  }, [])

  return (
    <div className="system-solar-water-heater-view">
      <iframe id="solar_water_model" src={SERVERINFO.modelIP} className="iframe-style" title="chart" frameBorder="no"></iframe>
      <div className="operation-summary">
        <div className="alarm-info">
          <div className="alarm-number">80</div>
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
            <ComSummaryInfoSolarWater items={{power:power, SolarWaterHeatCollecterInT:SolarWaterHeatCollecterInT, SolarWaterHeatCollecterOutT:SolarWaterHeatCollecterOutT,
            SolarWaterJRQT:SolarWaterJRQT, SolarWaterHeatCollectionToday:SolarWaterHeatCollectionToday, SolarWaterPumpRunningNum:SolarWaterPumpRunningNum}}/>
          </div>
        </div>
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">集热量统计</span>
          </div>
          <div className="date-button-wrapper" style={{top: '38px'}}>
              {
                chartDateButtons.map((item, index) =>
                  <span onClick={() => selectChartDateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
          </div>
          <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '300px'}}>
            <ReactEcharts style={{ width: '100%', height: '300px', margin: 'auto' }} option={{
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
                  data: SolarWaterHeatCollectionDay,
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
            <span className="title-text">电加热器耗电量统计</span>
          </div>
          <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '300px'}}>
            <ReactEcharts style={{ width: '100%', height: '300px', margin: 'auto' }} option={{
              title: {
                text: '',
                left: '15',
                top: '8',
                textStyle: {
                  color: '#fff',
                  fontSize: 15
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
                }
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
                  data: SolarWaterBoilerPowerConsumptionDay,
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
