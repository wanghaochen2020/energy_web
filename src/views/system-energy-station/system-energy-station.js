import React from 'react';
import * as echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfo } from '../../components/';
import './system-energy-station.scss';

export const SystemEnergyStation = () => {

  return (
    <div className="system-energy-station-view">
      <div className="operation-summary">
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
          <div className="number-value">设备在线率: 60%</div>
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
                  { value: 60, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#ecf75d' } }
                ]
              }
            ]
          }} />
          <div className="number-value">设备离线率: 40%</div>
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
                  { value: 50, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#45f9b7' } }
                ]
              }
            ]
          }} />
          <div className="number-value">监控正常率: 80%</div>
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
          <div className="number-value">监控异常率: 20%</div>
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
                  { value: 60, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#ecf75d' } }
                ]
              }
            ]
          }} />
          <div className="number-value">正在维护率: 30%</div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="summary-info">
          <div className="summary-info-title">
            <span className="title-icon"></span>
            今日一览
          </div>
          <div>
            <ComSummaryInfo />
          </div>
        </div>
        <div className="chart-wrapper" style={{marginRight: '-20px'}}>
          <div className="vertical-separator"></div>
          <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '320px' }}>
            <div className="chart-block-title">
              <span className="title-icon"></span>
              蓄热量统计
            </div>
            <ReactEcharts style={{ width: '100%', height: '320px', margin: 'auto' }} option={{
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
                    color: 'rgba(255, 255, 255, .4)',
                    width: 1,
                    type: 'solid'
                  }
                }
              },
              yAxis: {
                type: 'value',
                name: 'KM',
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: 'rgba(255, 255, 255, .4)',
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
        <div className="chart-wrapper">
          <div className="vertical-separator"></div>
          <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '320px' }}>
            <div className="chart-block-title">
              <span className="title-icon"></span>
              锅炉耗电量统计
            </div>
            <ReactEcharts style={{ width: '100%', height: '320px', margin: 'auto' }} option={{
              title: {
                text: '',
                left: '15',
                top: '8',
                textStyle: {
                  color: '#fff',
                  fontSize: 14
                }
              },
              // backgroundColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              //   { offset: 0, color: '#3fc7f3' },
              //   { offset: 1, color: '#420f80' },
              // ]),
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
                name: 'KM',
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
        <div className="summary-info alarm-wrapper">
          <div className="vertical-separator"></div>
          <div className="summary-info-title"><span className="title-icon"></span>今日告警</div>
          <div>
            <ComAlarms />
          </div>
        </div>
      </div>
    </div>
  );
}
