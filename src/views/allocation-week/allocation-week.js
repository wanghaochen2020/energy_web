import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './allocation-week.scss';

export const AllocationWeek = () => {
  return (
    <div className="load-prediction-view">
      <div className="top-box">
        <div className="box-wrapper">
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
        <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
          <span className="box-title-icon">&#9658;</span>
          <span className="title-text">未来7天再蓄热量</span>
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
            data: ['室外温度(°C)', '再蓄热量']
          },
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
            data: ['2022-08-02', '2022-08-03', '2022-08-04', '2022-08-05', '2022-08-06', '2022-08-07', '2022-08-08'],
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
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
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
              name: '再蓄热量',
              data: [150, 260, 200, 150, 170, 230, 224, 100],
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
              data: [20.4, 22.5, 18.9, 15, 28.3, 29.2, 30, 25],
              type: 'line',
              smooth: true,
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
      <div className="bottom-box">
        <div className="box-wrapper">
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
        <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
          <span className="box-title-icon">&#9658;</span>
          <span className="title-text">未来7天移峰电量</span>
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
            data: ['室外温度(°C)', '移峰电量(KWH)']
          },
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
            data: ['2022-08-02', '2022-08-03', '2022-08-04', '2022-08-05', '2022-08-06', '2022-08-07', '2022-08-08'],
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
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
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
              data: [150, 260, 200, 150, 170, 230, 224, 100],
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
              data: [20.4, 22.5, 18.9, 15, 28.3, 29.2, 30, 25],
              type: 'line',
              smooth: true,
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
  );
}
