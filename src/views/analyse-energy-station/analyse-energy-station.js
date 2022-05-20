import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-energy-station.scss';

export const AnalyseEnergyStation = () => {

  return (
    <div className="analyse-energy-station-view">
      <div className="top-box">
        <div className="top-left">
          <div className="chart-wrapper">
            <div className="date-button-wrapper">
              <span className="date-button date-button-selected">电锅炉</span>
              <span className="date-button">蓄热水箱</span>
              <span className="date-button">能源站系统</span>
            </div>
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '电锅炉热效率',
                  left: '15',
                  top: '8',
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
                    data: [35, 80, 47, 160, 100, 50, 60,50, 60, 30, 124, 60, 118, 
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
          <div className="chart-wrapper load-balance-wrapper">
            <div className="date-button-wrapper">
              <span className="date-button date-button-selected">日</span>
              <span className="date-button">周</span>
              <span className="date-button">月</span>
              <span className="date-button">季</span>
            </div>
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '负载率统计',
                  left: '15',
                  top: '8',
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
              <div className="number-value">92%</div>
              本日锅炉平均热效率
            </div>
            <div className="top-info-box">
              <div className="number-value">94%</div>
              本日蓄热水箱平均热效率
            </div>
          </div>
          <div className="top-middle-row">
            <div className="top-info-box">
              <div className="number-value">98%</div>
              本日系统总效率
            </div>
            <div className="top-info-box">
              <div className="number-value">50KWH</div>
              本日减碳排放量
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="chart-wrapper">
              <div className="date-button-wrapper">
                <span className="date-button date-button-selected">今日</span>
                <span className="date-button">近七天</span>
                <span className="date-button">历史</span>
              </div>
              <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
                <ReactEcharts style={{ width: '500px', height: '450px', margin: 'auto' }} option={{
                  title: {
                    text: '今日碳排放量统计',
                    left: '15',
                    top: '8',
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
                      data: [35, 80, 47, 160, 100, 50, 60,50, 60, 30, 124, 60, 118, 
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
