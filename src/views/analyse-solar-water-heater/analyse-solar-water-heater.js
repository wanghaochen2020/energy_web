import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-solar-water-heater.scss';

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
      <div className="top-box">
        <div className="top-left">
          <div className="chart-wrapper load-balance-wrapper">
            <div className="date-button-wrapper">
              {
                rateButtons.map((item, index) =>
                  <span onClick={() => selectRateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '太阳能集热效率',
                  left: '10',
                  top: '0',
                  textStyle: {
                    color: '#fff'
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
                    barWidth: 10,
                    itemStyle: {
                      normal: {
                        barBorderRadius: [5, 5, 0, 0]
                      }
                    },
                  }
                ]
              }} />
            </div>
          </div>
        </div>
        <div className="top-middle">
          <div className="top-middle-row">
            <div className="top-info-box">
              <ReactEcharts style={{ width: '140px', height: '140px', margin: 'auto' }} option={{
                  tooltip: {
                    trigger: 'item'
                  },
                  series: [
                    {
                      type: 'pie',
                      radius: ['80%', '100%'],
                      startAngle: 360,
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        { value: 100, name: 'full', label: { normal: { show: false }}, itemStyle: { color: '#323891' } },
                        { value: 80, name: 'rate', label: { normal: { show: false }}, itemStyle: { color: '#33d7ea' } }
                      ]
                    }
                  ]
                }} />
              <div className="number-value">今日太能能集热效率: 60%</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '140px', height: '140px', margin: 'auto' }} option={{
                  tooltip: {
                    trigger: 'item'
                  },
                  series: [
                    {
                      type: 'pie',
                      radius: ['80%', '100%'],
                      startAngle: 320,
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        { value: 100, name: 'full', label: { normal: { show: false }}, itemStyle: { color: '#323891' } },
                        { value: 60, name: 'rate', label: { normal: { show: false }}, itemStyle: { color: '#ecf75d' } }
                      ]
                    }
                  ]
                }} />
              <div className="number-value">今日太阳能保证率: 70%</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '140px', height: '140px', margin: 'auto' }} option={{
                  tooltip: {
                    trigger: 'item'
                  },
                  series: [
                    {
                      type: 'pie',
                      radius: ['80%', '100%'],
                      startAngle: 270,
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        { value: 100, name: 'full', label: { normal: { show: false }}, itemStyle: { color: '#323891' } },
                        { value: 50, name: 'rate', label: { normal: { show: false }}, itemStyle: { color: '#45f9b7' } }
                      ]
                    }
                  ]
                }} />
              <div className="number-value">今日系统总效率: 70%</div>
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="chart-wrapper">
            <div className="date-button-wrapper">
              {
                emissionTypeButtons.map((item, index) =>
                  <span onClick={() => selectEmissionTypeButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <ReactEcharts style={{ width: '500px', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '今日碳排放量统计',
                  left: '15',
                  top: '0',
                  textStyle: {
                    color: '#fff'
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
                    barWidth: 10,
                    itemStyle: {
                      normal: {
                      }
                    }
                  },
                  {
                    data: [35, 80, 47, 160, 100, 50, 60, 50, 60, 30, 124, 60, 118,
                      80, 47, 160, 100, 100, 130, 124, 100, 118, 35],
                    type: 'line',
                    barWidth: 10,
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
      <div className="top-box">
        <div className="top-left">
          <div className="chart-wrapper">
            <div className="date-button-wrapper">
              {
                systemRateButtons.map((item, index) =>
                  <span onClick={() => selectSystemRateButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '太阳能保证率',
                  left: '10',
                  top: '0',
                  textStyle: {
                    color: '#fff'
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
                    barWidth: 10,
                    itemStyle: {
                      normal: {
                        barBorderRadius: [5, 5, 0, 0]
                      }
                    },
                  }
                ]
              }} />
            </div>
          </div>
        </div>
        <div className="top-middle">
          <div className="chart-wrapper">
            <div className="date-button-wrapper">
              {
                systemRateButtons2.map((item, index) =>
                  <span onClick={() => selectSystemRateButtons2(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '系统总效率',
                  left: '10',
                  top: '0',
                  textStyle: {
                    color: '#fff'
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
                    barWidth: 10,
                    itemStyle: {
                      normal: {
                        barBorderRadius: [5, 5, 0, 0]
                      }
                    },
                  }
                ]
              }} />
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="chart-wrapper">
            <div className="date-button-wrapper">
              {
                chartDateButtons.map((item, index) =>
                  <span onClick={() => selectChartDateButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <ReactEcharts style={{ width: '500px', height: '450px', margin: 'auto' }} option={{
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
      </div>
    </div>
  );
}
