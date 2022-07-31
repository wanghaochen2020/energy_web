import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-solar-water-heater.scss';
import { ChartService } from '../../utils/chart.service';

export const AnalyseSolarWaterHeater = () => {
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

  return (
    <div className="analyse-solar-water-heater-view">
      <div className="top-row">
        <div className="top-info-box">
          <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
            data: [{ value: 100 }, { value: 80}], startAngle: 240
          })} />
          <div className="number-value">今日太阳能集热效率: 60%</div>
        </div>
        <div className="top-info-box">
          <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
            data: [{ value: 100 }, { value: 60}], colors: ['#323891', '#ecf75d'], startAngle: 40
          })}/>
          <div className="number-value">今日太阳能保证率: 70%</div>
        </div>
        <div className="top-info-box">
          <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
            data: [{ value: 100 }, { value: 70}], colors: ['#323891', '#45f9b7'], startAngle: 140
          })}/>
          <div className="number-value">今日系统总效率: 70%</div>
        </div>
      </div>
      <div className="top-box">
        <div className="top-left">
          <div className="chart-wrapper">
            <div className="date-button-wrapper" style={{top: '5px', right: '50px'}}>
              {
                rateButtons.map((item, index) =>
                  <span onClick={() => selectRateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <div className="chart-block-title">
                <span className="title-icon"></span>
                太阳能集热效率
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '',
                  left: '10',
                  top: '0',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                },
                // backgroundColor: '#080a27',
                xAxis: {
                  type: 'category',
                  data: ['7/12', '7/13', '7/14', '7/15', '7/16', '7/17', '7/18'],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#666',
                      width: 1,
                      type: 'solid'
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#666',
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
                    data: [150, 60, 230, 224, 100, 218, 135, 80],
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
        </div>
        <div className="top-right">
          <div className="chart-wrapper">
            <div className="date-button-wrapper" style={{top: '5px', right: '50px'}}>
              {
                emissionTypeButtons.map((item, index) =>
                  <span onClick={() => selectEmissionTypeButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <div className="chart-block-title">
                <span className="title-icon"></span>
                今日碳排放量统计
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '',
                  left: '15',
                  top: '0',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                },
                xAxis: {
                  type: 'category',
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#666',
                      width: 1,
                      type: 'solid'
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#666',
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
                    data: [150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                      230, 224, 100, 218, 135, 80, 147, 260, 200, 100],
                    type: 'line',
                    symbolSize: 6,
                    itemStyle: {
                      normal: {
                      }
                    }
                  },
                  {
                    data: [35, 80, 47, 160, 100, 50, 60, 50, 60, 30, 124, 60, 118,
                      80, 47, 160, 100, 100, 130, 124, 100, 118, 35],
                    type: 'line',
                    symbolSize: 6,
                    itemStyle: {
                      normal: {
                      }
                    }
                  }
                ]
              }} />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="bottom-left">
          <div className="chart-wrapper">
            <div className="date-button-wrapper" style={{top: '5px', right: '40px'}}>
              {
                systemRateButtons.map((item, index) =>
                  <span onClick={() => selectSystemRateButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <div className="chart-block-title">
                <span className="title-icon"></span>
                太阳能保证率
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '',
                  left: '10',
                  top: '0',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                },
                // backgroundColor: '#080a27',
                xAxis: {
                  type: 'category',
                  data: [1, 2, 3, 4, 5, 6, 7, 8],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#666',
                      width: 1,
                      type: 'solid'
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#666',
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
                    data: [150, 60, 230, 224, 100, 218, 135, 80],
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
        </div>
        <div className="bottom-middle">
          <div className="chart-wrapper">
            <div className="date-button-wrapper" style={{top: '5px', right: '40px'}}>
              {
                chartDateButtons.map((item, index) =>
                  <span onClick={() => selectChartDateButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                tooltip: {
                  trigger: 'item'
                },
                series: [
                  {
                    type: 'pie',
                    startAngle: 90,
                    selectedMode: 'single',
                    radius: ['50%', '60%'],
                    data: [
                      { value: 100, name: '本期能耗' }
                    ]
                  },
                  {
                    type: 'pie',
                    startAngle: 0,
                    hoverAnimation: false,
                    radius: ["55%", "70%"],
                    data: [{
                      value: 80,
                      itemStyle: {
                        normal: {
                          color: "rgba(1,218,220,0)"
                        }
                      }
                    },
                    {
                      value: 30,
                      name: '同比增长',
                      itemStyle: {
                        normal: {
                          color: "rgba(1,218,220,1)"
                        }
                      }
                    },
                    ]
                  }
                ]
              }} />
            </div>
          </div>
        </div>
        <div className="bottom-right">
          <div className="chart-wrapper">
            <div className="date-button-wrapper" style={{top: '5px', right: '40px'}}>
              {
                systemRateButtons2.map((item, index) =>
                  <span onClick={() => selectSystemRateButtons2(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <div className="chart-block-title">
                <span className="title-icon"></span>
                系统总效率
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '',
                  left: '10',
                  top: '0',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                },
                // backgroundColor: '#080a27',
                xAxis: {
                  type: 'category',
                  data: [1, 2, 3, 4, 5, 6, 7, 8],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#666',
                      width: 1,
                      type: 'solid'
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#666',
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
                    data: [150, 60, 230, 224, 100, 218, 135, 80],
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
        </div>
      </div>
    </div>
  );
}
