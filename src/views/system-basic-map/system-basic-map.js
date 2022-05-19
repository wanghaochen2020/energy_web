import React from 'react';
import * as echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfo } from '../../components/';
import './system-basic-map.scss';

export const SystemBasicMap = () => {

  return (
    <div className="system-basic-map-view">
      <div>
      </div>
      <div className="bottom-box">
        <div className="summary-info">
          <div className="summary-info-title">今日一览</div>
          <div>
            <ComSummaryInfo />
          </div>
        </div>
        <div className="chart-wrapper">
          <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '400px'}}>
            <ReactEcharts style={{ width: '100%', height: '400px', margin: 'auto' }} option={{
              title: {
                text: '蓄热量统计',
                left: '15',
                top: '8',
                textStyle: {
                  color: '#fff'
                }
              },
              backgroundColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: '#3fc7f3' },
                { offset: 1, color: '#420f80' },
              ]),
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
                  type: 'bar',
                  barWidth: 10,
                  itemStyle: {
                    normal: {
                      // barBorderRadius: [7, 7, 0, 0]
                    }
                  },
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#88e4ee' },
                    { offset: 0.5, color: '#68e2f0' },
                    { offset: 1, color: '#16b1c3' }
                  ])
                }
              ]
            }} />
          </div>
        </div>
        <div className="chart-wrapper">
          <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '400px'}}>
            <ReactEcharts style={{ width: '100%', height: '400px', margin: 'auto' }} option={{
              title: {
                text: '锅炉耗电量统计',
                left: '15',
                top: '8',
                textStyle: {
                  color: '#fff'
                }
              },
              backgroundColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: '#3fc7f3' },
                { offset: 1, color: '#420f80' },
              ]),
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
                  type: 'bar',
                  barWidth: 10,
                  itemStyle: {
                    normal: {
                      // barBorderRadius: [7, 7, 0, 0]
                    }
                  },
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#88e4ee' },
                    { offset: 0.5, color: '#68e2f0' },
                    { offset: 1, color: '#16b1c3' }
                  ])
                }
              ]
            }} />
          </div>
        </div>
        <div className="summary-info alarm-wrapper">
          <div className="summary-info-title">今日告警</div>
          <div>
            <ComAlarms />
          </div>
        </div>
      </div>
    </div>
  );
}
