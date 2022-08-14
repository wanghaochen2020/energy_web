import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './allocation-day.scss';
import { ChartService } from '../../utils/chart.service';

export const AllocationDay = () => {
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
    <div className="allocation-day-view">
      <div className="top-box">
        <div className="top-left">
          <div className="chart-wrapper">
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <div className="chart-block-title">
                  <span className="title-icon"></span>
                  锅炉建议工况和实际工况对比
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
                    data: ['建议运行台数', '实际运行台数']
                  },
                  xName: '时',
                  yName: '台数',
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  series: [
                    {
                      name: '建议运行台数',
                      data: [5, 6, 5, 4, 5, 3, 6, 5, 4, 5, 3, 6, 5, 4, 5, 3, 6, 5, 4, 5, 4, 5, 4],
                    },
                    {
                      name: '实际运行台数',
                      data: [3, 5, 4, 6, 6, 5, 5, 4, 6, 6, 5, 5, 4, 6, 6, 5, 5, 4, 6, 6, 6, 5, 6],
                    }
                  ]
                })} />
            </div>
          </div>
          <div className="chart-wrapper">
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <div className="chart-block-title">
                  <span className="title-icon"></span>
                  锅炉运行工况
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
                  data: ['1#锅炉', '2#锅炉', '3#锅炉', '4#锅炉'],
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
                  max: 40,
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#6cbcea',
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
                    data: [25, 20, 30, 24],
                    type: 'bar',
                    barWidth: 20
                  }
                ]
              }} />
            </div>
          </div>
        </div>
        <div className="top-middle">
          <div style={{textAlign: 'center', width: '100%', height: '450px'}}>
            <div className="device-status-title">错峰用电</div>
            <div className="e-price">
              <div className="e-price-item">
                <div className="e-price-desc">平电价阶段</div>
                <div>07:00 - 10:00</div>
                <div>15:00 - 18:00</div>
                <div>21:00 - 23:00</div>
              </div>
              <div className="e-price-item">
                <div className="e-price-desc">峰电价阶段</div>
                <div>10:00 - 15:00</div>
                <div>18:00 - 21:00</div>
              </div>
              <div className="e-price-item">
                <div className="e-price-desc">谷电价阶段</div>
                <div>23:00 - 07:00</div>
              </div>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '100%', height: '450px'}}>
            <div className="device-status-title">今日设备运行工况</div>
            <table className="table-status">
              <thead>
                <tr>
                  <th colSpan="2">锅炉运行</th>
                  <th colSpan="2">供热泵运行</th>
                  <th colSpan="2">蓄热水箱</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1#锅炉</td>
                  <td className="color-red table-status-value">2h/天</td>
                  <td>GRB-1</td>
                  <td className="color-red table-status-value">2h/天</td>
                  <td>蓄热水箱-1</td>
                  <td className="color-red table-status-value">2h/天</td>
                </tr>
                <tr>
                  <td>2#锅炉</td>
                  <td className="color-red table-status-value">2h/天</td>
                  <td>GRB-2</td>
                  <td className="color-red table-status-value">2h/天</td>
                  <td>蓄热水箱-2</td>
                  <td className="color-red table-status-value">2h/天</td>
                </tr>
                <tr>
                  <td>3#锅炉</td>
                  <td className="color-red table-status-value">2h/天</td>
                  <td>GRB-3</td>
                  <td className="color-red table-status-value">2h/天</td>
                  <td></td>
                  <td className="color-red table-status-value"></td>
                </tr>
                <tr>
                  <td>4#锅炉</td>
                  <td className="color-red table-status-value">2h/天</td>
                  <td></td>
                  <td className="color-red table-status-value"></td>
                  <td></td>
                  <td className="color-red table-status-value"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="top-right">
          <div className="chart-wrapper">
              <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
                <div className="chart-block-title">
                    <span className="title-icon"></span>
                    水箱蓄热逐时建议工况(A/B)
                </div>
                <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                  legend: {
                    show: true,
                    top: 10,
                    right: 12,
                    textStyle: {
                      color: '#fff',
                      fontSize: 14
                    },
                    data: ['A', 'B']
                  },
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
                    name: 'kW',
                    axisLine: {
                      show: true,
                      lineStyle: {
                        color: '#6cbcea',
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
                      name: 'A',
                      data: [150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                        230, 224, 100, 218, 135, 80, 147, 260, 200, 100],
                      type: 'bar',
                      symbolSize: 6,
                      itemStyle: {
                        normal: {
                        }
                      }
                    },
                    {
                      name: 'B',
                      data: [35, 80, 47, 160, 100, 50, 60,50, 60, 30, 124, 60, 118, 
                        80, 47, 160, 100, 100, 130, 124, 100, 118, 35],
                      type: 'bar',
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
          <div className="chart-wrapper">
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <div className="chart-block-title">
                  <span className="title-icon"></span>
                  水箱放热逐时建议工况
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                tooltip: {
                  trigger: 'axis'
                },
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
                yAxis: [{
                  name: 'KWH',
                  type: 'value',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#6cbcea',
                      width: 1,
                      type: 'solid'
                    }
                  },
                  splitLine: {
                    show: false
                  }
                },
                {
                  type: 'value',
                  name: '°C',
                  max: 40,
                  position: 'right',
                  alignTicks: false,
                  axisLine: {
                    show: true
                  },
                  axisLabel: {
                    formatter: '{value} °C'
                  },
                  splitLine: {
                    show: false
                  }
                }],
                series: [
                  {
                    name: '移峰电量(KWH)',
                    data: [150, 260, 200, 150, 170, 230, 224, 100, 150, 260, 200, 150, 170, 230, 224, 100,
                      150, 260, 200, 150, 170, 230, 224, 200, 230, 224, 200],
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
                    name: '室外温度(°C)',
                    yAxisIndex: 1,
                    data: [20.4, 22.5, 18.9, 15, 28.3, 29.2, 30, 25, 20.4, 22.5, 18.9, 15, 28.3, 29.2, 30, 25, 20.4, 22.5, 18.9, 15, 28.3, 29.2, 30, 25, 20, 22, 23],
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
        <table className="table-history">
          <thead>
            <tr>
              <th>运行工况</th>
              <th>1#锅炉</th>
              <th>2#锅炉</th>
              <th>3#锅炉</th>
              <th>3#锅炉</th>
              <th>蓄热水箱一</th>
              <th>蓄热水箱二</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>电锅炉边蓄边供</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td className="color-red">不工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td className="color-red">不工作</td>
            </tr>
            <tr className="row-even">
              <td>蓄热水箱单供</td>
              <td>工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td className="color-red">不工作</td>
            </tr>
            <tr>
              <td>电锅炉单供</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td>工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td>工作</td>
            </tr>
            <tr className="row-even">
              <td>联合供热</td>
              <td>工作</td>
              <td>工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td className="color-red">不工作</td>
              <td className="color-red">不工作</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bottom-box">
        <table className="table-history">
          <thead>
            <tr>
              <th>XRB-1</th>
              <th>XRB-2</th>
              <th>XRB-3</th>
              <th>GRB-1</th>
              <th>GRB-2</th>
              <th>GRB-3</th>
              <th>IV-1</th>
              <th>IV-2</th>
              <th>IV-3</th>
              <th>DV-4</th>
              <th>IV-5</th>
              <th>DV-6</th>
              <th>DV-7</th>
              <th>DV-8</th>
              <th>DVT-1</th>
              <th>DVT-2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td>工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td>开通</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
              <td>开通</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
            </tr>
            <tr className="row-even">
              <td>工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td className="color-red">不工作</td>
              <td>工作</td>
              <td>工作</td>
              <td>开通</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
              <td>开通</td>
              <td>开通</td>
            </tr>
            <tr>
              <td>工作</td>
              <td>工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td>开通</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
              <td>开通</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
            </tr>
            <tr className="row-even">
              <td>工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td>工作</td>
              <td>工作</td>
              <td className="color-red">不工作</td>
              <td>开通</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td className="color-red">关闭</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
              <td className="color-red">关闭</td>
              <td>开通</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
