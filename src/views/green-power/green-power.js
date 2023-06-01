import React, { useEffect,useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './green-power.scss';
import { ChartService } from '../../utils/chart.service';
import {MainPage } from '../../business/mainPage';

export const GreenPower = () => {
  const [rateButtons, setRateButtons] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [emissionTypeButtons, setEmissionTypeButtons] = useState([
    { name: '绿电碳排放量', selected: true }, { name: '原煤碳排放量' }, { name: '天然气碳排放量' }
  ]);
  const [systemRateButtons, setSystemRateButtons] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [systemRateButtons2, setSystemRateButtons2] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [chartDateButtons, setChartDateButtons] = useState([
    { name: '本日碳排放量', selected: true }, { name: '近七天碳排放量' }, { name: '历史碳排放量' }
  ]);

  const selectRateButton = (item) => {
    rateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setRateButtons([...rateButtons]);
  }

  const selectSystemRateButtons = (item) => {
    systemRateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setSystemRateButtons([...systemRateButtons]);
  }

  const selectSystemRateButtons2 = (item) => {
    systemRateButtons2.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setSystemRateButtons2([...systemRateButtons2]);
  }

  const selectEmissionTypeButtons = (item) => {
    emissionTypeButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setEmissionTypeButtons([...emissionTypeButtons]);
  }

  const selectChartDateButtons = (item) => {
    chartDateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartDateButtons([...chartDateButtons]);
  }

  const [atmosphere, setAtmosphere] = useState([]);
  useEffect(() => {
    MainPage.getAtmosphere().then((res)=> {
      setAtmosphere(res.data)
    });
  }, []);


  return (
    <div className="green-power-view">
      <div className="row-box">
        <div className="row-left">
          <div className="box-wrapper" style={{width: '100%', height: '280px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">装机容量</span>
            </div>
            <div className="top-row">
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [{ value: 69 }, { value: 31 }],
                    startAngle: 90,
                    title: '180',
                    unit: 'MW',
                    subTitle: '官厅风电场'
                  })}
                />
              </div>
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [{ value: 12 }, { value: 88 }],
                    startAngle: 90,
                    title: '31',
                    unit: 'MW',
                    subTitle: '延庆光伏',
                    titleColor: '#5ee200',
                    itemColor: '#5ee200'
                  })}
                />
              </div>
              <div className="top-info-box">
                <ReactEcharts
                  style={{ width: '150px', height: '150px', margin: 'auto' }}
                  option={ChartService.getPieOptions({
                    data: [{ value: 19 }, { value: 81 }],
                    startAngle: 90,
                    title: '50',
                    unit: 'MW',
                    subTitle: '淮南风电场',
                    titleColor: '#f94e00',
                    itemColor: '#f94e00'
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row-right">
          <div className="box-wrapper" style={{width: '100%', height: '280px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">年发电量</span>
            </div>
          <div className="top-row">
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 69 }, { value: 31 }],
                  startAngle: 90,
                  title: '36000',
                  unit: '万kWh',
                  subTitle: '官厅风电厂'
                })}
              />
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 7 }, { value: 93 }],
                  startAngle: 90,
                  title: '4030',
                  unit: '万kWh',
                  subTitle: '延庆光伏'
                })}
              />
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 24 }, { value: 76 }],
                  startAngle: 90,
                  title: '12500',
                  unit: '万kWh',
                  subTitle: '淮南风电场'
                })}
              />
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className="row-box">
        <div className="row-left">
          <div className="box-wrapper" style={{width: '100%', height: '280px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">绿电概况</span>
            </div>
            <div>
            <div className="green-info-column">
              <div className="green-info-column-title">光伏发电1</div>
              <div className="main-info-row">
                <span className="main-info">
                  <span className="main-info-text">
                  当年发电量
                  </span>
                  <span className="main-info-number red-color">
                    26334
                    <span className="number-unit">MWh</span>
                  </span>
                </span>
                <span className="main-info">
                  <span className="main-info-text">
                  去年发电量
                  </span>
                  <span className="main-info-number blue-color">
                    49726
                    <span className="number-unit">MWh</span>
                  </span>
                </span>
              </div>
            </div>
            <div className="green-info-column">
              <div className="green-info-column-title">光伏发电2</div>
              <div className="main-info-row">
                <span className="main-info">
                  <span className="main-info-text">
                  当年发电量
                  </span>
                  <span className="main-info-number">
                    32991
                    <span className="number-unit">MWh</span>
                  </span>
                </span>
                <span className="main-info">
                  <span className="main-info-text">
                  去年发电量
                  </span>
                  <span className="main-info-number yellow-color">
                    57636
                    <span className="number-unit">MWh</span>
                  </span>
                </span>
              </div>
            </div>
            </div>
        </div>
        </div>
        <div className="row-right">
          <div className="box-wrapper" style={{width: '100%', height: '280px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">绿电概况</span>
            </div>
          <div className="top-row">
            <div className="gauge-box">
              <ReactEcharts style={{ width: '180px', height: '180px', margin: 'auto' }} option={ChartService.getGaugeOptions({
                value: 55
              })} />
              <div className="gauge-title">年发电量: 59330 MWh</div>
            </div>
            <div className="gauge-box">
              <ReactEcharts style={{ width: '180px', height: '180px', margin: 'auto' }} option={ChartService.getGaugeOptions({
                value: 4
              })} />
              <div className="gauge-title">月发电量: 652 MWH</div>
            </div>
            <div className="gauge-box">
              <ReactEcharts style={{ width: '180px', height: '180px', margin: 'auto' }} option={ChartService.getGaugeOptions({
                value: 171
              })} />
              <div className="gauge-title">日发电量: 653 MWH</div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className="row-box">
        <div className="row-left">
          <div className="box-wrapper" style={{width: '100%', height: '400px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">绿色节能</span>
            </div>
              <div className="box-chart-info">
                <span className="info-item chart-info">日最高负荷：<span className="value-item text-red">748</span>万kWh</span>
                <span className="info-item chart-info">月最高负荷：<span className="value-item text-red">224</span>kW</span>
              </div>
              <ReactEcharts style={{ width: '100%', height: '380px' }} option={
                ChartService.getLineOptions({
                  yName: '万kWh',
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                  series: [
                    {
                      data: [150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                        230, 224, 100, 218, 135, 80, 147, 260, 200, 100, 147, 260, 200, 100, 147, 260, 150],
                        symbolSize: 0,
                        areaStyle: {
                          color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                              { offset: 0, color: 'rgba(103, 224, 227, .9)' },
                              { offset: 0.9, color: 'rgba(103, 224, 227, 0)' }
                            ],
                          }
                        }
                    }
                  ]
                })} />
          </div>
        </div>
        <div className="row-right">
          <div className="box-wrapper" style={{width: '100%', height: '400px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">负荷概况</span>
            </div>
              <div className="info-row chart-info-row">
                <span className="info-item">
                  冬奥村建筑能耗
                  <div><span className="value-item">3.6</span>万kwh</div>
                </span>
                <span className="info-item">
                  单位建筑面积能效
                  <div><span className="value-item">13.85</span>kgce/m2</div>
                </span>
                <span className="info-item">
                  单位面积能耗
                  <div><span className="value-item">298.86</span>kgce/m2</div>
                </span>
              </div>
              <div className="chart-desc">单位面积能耗</div>
              <ReactEcharts style={{ width: '100%', height: '380px', marginTop: '20px' }} option={{
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#fff',
                      width: 1,
                      type: 'solid'
                    }
                  },
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                },
                yAxis: {
                  type: 'value',
                  name: 'kgce/m2',
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#fff',
                      width: 1,
                      type: 'solid'
                    }
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: ['#192f44'],
                      width: 1,
                      type: 'solid'
                    }
                  }
                },
                series: [
                  {
                    smooth: true,
                    data: [50, 50, 50, 54, 60, 58, 55, 60, 57, 60, 60, 50, 50,
                      60, 54, 55, 58, 45, 60, 47, 60, 70, 50, 47, 60, 50, 60, 47, 60, 50],
                    type: 'line',
                    itemStyle: {
                      normal: {
                        color: '#ee72ef'
                      }
                    },
                    symbolSize: 0,
                    areaStyle: {
                      color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                          { offset: 0, color: 'rgba(238, 114, 239, .9)' },
                          { offset: 0.9, color: 'rgba(238, 114, 239, 0)' }
                        ],
                      }
                    }
                  }
                ]
              }} />
          </div>
        </div>
      </div>
    </div>
  );
}
