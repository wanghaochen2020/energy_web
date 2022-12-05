import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-energy-station.scss';
import { ChartService } from '../../utils/chart.service';
import { PAGEDATA } from '../../constants/pageData';
import { EnergyStation } from '../../business/system-layer.service';

export const AnalyseEnergyStation = () => {
  const [loadRateButtons, setLoadRateButton] = useState([]);
  const [chartDateButtons, setChartDateButtons] = useState([]);
  let [EnergyBoilerEfficiencyDay, setEnergyBoilerEfficiencyDay] = useState([])
  let [AvrgEnergyBoilerEfficiencyDay, setAvrgEnergyBoilerEfficiencyDay] = useState(0)
  let [EnergyWatertankEfficiencyDay, setEnergyWatertankEfficiencyDay] = useState([])
  let [AvrgEnergyWatertankEfficiencyDay, setAvrgEnergyWatertankEfficiencyDay] = useState(0)
  let [EnergyEfficiencyDay, setEnergyEfficiencyDay] = useState([])
  let [AvrgEnergyEfficiencyDay, setAvrgEnergyEfficiencyDay] = useState(0)
  let [EnergyCarbonDay, setEnergyCarbonDay] = useState([])
  let [EnergyCarbonMonth, setEnergyCarbonMonth] = useState([])
  let [EnergyCarbonYear, setEnergyCarbonYear] = useState([])
  let [EnergyBoilerPayloadDay, setEnergyBoilerPayloadDay] = useState([])

  useEffect(() => {
    setLoadRateButton([
      { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
    ]);
    setChartDateButtons([
      { name: '今日', selected: true }, { name: '近七天' }, { name: '历史' }
    ]);
    let dayStr = EnergyStation.getDayStr()
    EnergyStation.getTable(PAGEDATA.EnergyBoilerEfficiencyDay, dayStr).then((res)=> {
      let avg = 0;
      for (let i = 0; i < res.length; i++) { 
        avg += res[i]*100;
        res[i] = (res[i]*100).toFixed(2);
      }
      if (!(res.length)) {
        avg /= res.length;
      }
      setEnergyBoilerEfficiencyDay(res);
      setAvrgEnergyBoilerEfficiencyDay(avg);
    })
    EnergyStation.getTable(PAGEDATA.EnergyWatertankEfficiencyDay, dayStr).then((res)=> {
      let avg = 0;
      for (let i = 0; i < res.length; i++) { 
        avg += res[i]*100;
        res[i] = (res[i]*100).toFixed(2);
      }
      if (!(res.length)) {
        avg /= res.length;
      }
      setEnergyWatertankEfficiencyDay(res);
      setAvrgEnergyWatertankEfficiencyDay(avg);
    })
    EnergyStation.getTable(PAGEDATA.EnergyEfficiencyDay, dayStr).then((res)=> {
      let avg = 0;
      for (let i = 0; i < res.length; i++) { 
        avg += res[i]*100;
        res[i] = (res[i]*100).toFixed(2);
      }
      if (!(res.length)) {
        avg /= res.length;
      }
      setEnergyEfficiencyDay(res);
      setAvrgEnergyEfficiencyDay(avg);
    })
    EnergyStation.getTable(PAGEDATA.EnergyCarbonDay, dayStr).then((res)=> {
      setEnergyCarbonDay(res)
    })
    EnergyStation.getTable(PAGEDATA.EnergyCarbonMonth, dayStr).then((res)=> {
      setEnergyCarbonMonth(res)
    })
    EnergyStation.getTable(PAGEDATA.EnergyCarbonYear, dayStr).then((res)=> {
      setEnergyCarbonYear(res)
    })
    EnergyStation.getTable(PAGEDATA.EnergyBoilerPayloadDay, dayStr).then((res)=> {
      setEnergyBoilerPayloadDay(res)
    })
  }, []);

  const selectLoadRateButton = (item) => {
    loadRateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setLoadRateButton([...loadRateButtons]);
  }

  const selectChartDateButton = (item) => {
    chartDateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartDateButtons([...chartDateButtons]);
  }

  return (
    <div className="analyse-energy-station-view">
      <div className="operation-summary">
          <div className="alarm-info">
            <div className="alarm-number">68</div>
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
                    { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                    { value: 80, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#33d7ea' } }
                  ]
                }
              ]
            }} />
            <div className="number-value">今日锅炉平均热效率: {AvrgEnergyBoilerEfficiencyDay}%</div>
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
                    { value: {AvrgEnergyBoilerEfficiencyDay}, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#ecf75d' } }
                  ]
                }
              ]
            }} />
            <div className="number-value">今日蓄热水箱平均热效率: {AvrgEnergyWatertankEfficiencyDay}%</div>
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
                    { value: {AvrgEnergyWatertankEfficiencyDay}, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#45f9b7' } }
                  ]
                }
              ]
            }} />
            <div className="number-value">今日系统总效率: {AvrgEnergyEfficiencyDay}%</div>
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
                    { value: 0, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#33d7ea' } }
                  ]
                }
              ]
            }} />
            <div className="number-value">今日减碳排放量: 50KWH</div>
          </div>
      </div>
      <div className="top-box">
        <div className="top-left">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">电锅炉热效率</span>
            </div>
            <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
              ChartService.getLineOptions({
                legend: {
                  show: true,
                  top: 10,
                  right: 12,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  },
                  data: ['电锅炉', '蓄热水箱', '能源站系统']
                },
                xName: '时',
                yName: '%',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                series: [
                  {
                    name: '电锅炉',
                    data: EnergyBoilerEfficiencyDay
                  },
                  {
                    name: '蓄热水箱',
                    data: EnergyWatertankEfficiencyDay
                  },
                  {
                    name: '能源站系统',
                    data: EnergyEfficiencyDay
                  }
                ]
              })} />
          </div>
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">负载率统计</span>
              </div>
            <div className="date-button-wrapper" style={{top: '38px'}}>
              {
                loadRateButtons.map((item, index) =>
                  <span onClick={() => selectLoadRateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
              ChartService.getBarOptions({
                yName: '%',
                // category: ['7/12', '7/13', '7/14', '7/15', '7/16', '7/17', '7/18'],
                category: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                series: [
                  {
                    data: EnergyBoilerPayloadDay
                  }
                ]
              })} />
          </div>
        </div>
        <div className="top-right">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">今日碳排放量统计</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px'}}>
                {
                  chartDateButtons.map((item, index) =>
                    <span onClick={() => selectChartDateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
                }
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  xName: '时',
                  yName: 'tCO2',
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  series: [
                    {
                      data: EnergyCarbonDay
                    },
                    // {
                    //   data: EnergyCarbonDay
                    // }
                  ]
                })} />
          </div>
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">电量类型碳排占比</span>
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '',
                  left: '15',
                  top: '8',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                },
                // backgroundColor: '#080a27',
                xAxis: {
                  type: 'category',
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
                  name: '%',
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
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#ffffff'
                    }
                  }
                },
                series: [
                  {
                    symbolSize: 14,
                    data: [
                      [10.0, 8.04],
                      [8.07, 6.95],
                      [13.0, 7.58],
                      [9.05, 8.81],
                      [11.0, 8.33],
                      [14.0, 7.66],
                      [13.4, 6.81],
                      [10.0, 6.33],
                      [14.0, 8.96],
                      [12.5, 6.82],
                      [9.15, 7.2],
                      [11.5, 7.2],
                      [3.03, 4.23],
                      [12.2, 7.83],
                      [2.02, 4.47],
                      [1.05, 3.33],
                      [4.05, 4.96],
                      [6.03, 7.24],
                      [12.0, 6.26],
                      [12.0, 8.84],
                      [7.08, 5.82],
                      [5.02, 5.68]
                    ],
                    type: 'scatter',
                    itemStyle: {
                      color: '#446eee'
                    }
                  }
                ]
              }} />
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <table className="table-history">
          <thead>
            <tr>
              <th>时间</th>
              <th>能源站耗能（GJ）</th>
              <th>同比去年同月耗能</th>
              <th>环比上月耗能</th>
              <th>碳排放量（KWH）</th>
              <th>环比去年同月碳排放量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2022-04-02 13:22</td>
              <td>18.23</td>
              <td>20%<i className="fa fa-long-arrow-up"></i></td>
              <td>30%<i className="fa fa-long-arrow-down"></i></td>
              <td>98</td>
              <td>20%</td>
            </tr>
            <tr className="row-even">
              <td>2022-04-02 13:22</td>
              <td>18.23</td>
              <td>20%<i className="fa fa-long-arrow-up"></i></td>
              <td>30%<i className="fa fa-long-arrow-down"></i></td>
              <td>98</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>2022-04-02 13:22</td>
              <td>18.23</td>
              <td>20%<i className="fa fa-long-arrow-up"></i></td>
              <td>30%<i className="fa fa-long-arrow-down"></i></td>
              <td>98</td>
              <td>20%</td>
            </tr>
            <tr className="row-even">
              <td>2022-04-02 13:22</td>
              <td>18.23</td>
              <td>20%<i className="fa fa-long-arrow-up"></i></td>
              <td>30%<i className="fa fa-long-arrow-down"></i></td>
              <td>98</td>
              <td>20%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
