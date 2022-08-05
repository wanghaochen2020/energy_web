import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './allocation-result.scss';

export const AllocationResult = () => {
  const [chartButtons, setChartButtons] = useState([]);
  const [loadRateButtons, setLoadRateButton] = useState([]);
  const [chartDateButtons, setChartDateButtons] = useState([]);

  useEffect(() => {
    setChartButtons([
      { name: '电锅炉', selected: true }, { name: '蓄热水箱' }, { name: '能源站系统' }
    ]);
    setLoadRateButton([
      { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
    ]);
    setChartDateButtons([
      { name: '今日', selected: true }, { name: '近七天' }, { name: '历史' }
    ]);
  }, []);

  const selectChartButton = (item) => {
    chartButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartButtons([...chartButtons]);
  }

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
    setChartDateButtons([...chartButtons]);
  }

  return (
    <div className="allocation-result-view">
      <div className="top-box">
        <div className="top-left">
          <div className="chart-wrapper">
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <div className="chart-block-title">
                  <span className="title-icon"></span>
                  过去7天不同方案运行服用对比分析
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
                  data: ['2022-08-02', '2022-08-03', '2022-08-04', '2022-08-05', '2022-08-06', '2022-08-07', '2022-08-08'],
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
                  name: 'KWH',
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
                    data: [1520, 1360, 1230, 1224, 1100, 1218, 1135],
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
                  },
                  {
                    data: [1220, 1160, 1030, 1124, 800, 1018, 935],
                    type: 'bar',
                    barWidth: 8,
                    itemStyle: {
                      color: {
                          type: 'linear',
                          x: 0, y: 0, x2: 0, y2: 1,
                          colorStops: [
                              { offset: 0, color: 'rgba(85, 225, 95, .9)' },
                              { offset: 1, color: 'rgba(85, 225, 95, 0)' }
                          ],
                      },
                      borderRadius: [4, 4, 0, 0]
                    }
                  }
                ]
              }} />
            </div>
          </div>
          <div className="chart-wrapper">
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <div className="chart-block-title">
                  <span className="title-icon"></span>
                  相对于满蓄节约能耗量统计
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
                  name: 'KWH',
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
                    data: [1520, 1360, 1230, 1224, 1100, 1218, 1135],
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
              <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
                <div className="chart-block-title">
                    <span className="title-icon"></span>
                    经济效益 - 供暖季累计
                </div>
                <div className="history-data-title">历史累计运行费用</div>
                <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow'
                    }
                  },
                  xAxis: {
                    type: 'value',
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      formatter: ''
                    }
                  },
                  yAxis: {
                    type: 'category',
                    inverse: true,
                    data: [''],
                    axisLabel: {
                      margin: 20,
                      rich: {
                        value: {
                          lineHeight: 30,
                          align: 'center'
                        }
                      }
                    }
                  },
                  series: [
                    {
                      name: 'City Alpha',
                      type: 'bar',
                      data: [165],
                      label: {
                        show: true,
                        formatter: '方案一  {c} 元',
                        fontSize: 16
                      },
                      barWidth : 60
                    },
                    {
                      name: 'City Beta',
                      type: 'bar',
                      data: [150],
                      label: {
                        show: true,
                        formatter: '方案二  {c} 元',
                        fontSize: 16
                      },
                      barWidth : 60
                    }
                  ]
                }} />
              </div>
          </div>
          <div className="chart-wrapper">
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <div className="chart-block-title">
                  <span className="title-icon"></span>
                  相对于满蓄减碳排放
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
                    name: 'kg',
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
                      data: [1520, 1360, 1230, 1224, 1100, 1218, 1135],
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
    </div>
  );
}
