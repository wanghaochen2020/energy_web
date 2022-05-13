import React from 'react';
import * as echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import './system-basic-map.scss';

export const SystemBasicMap = () => {

  return (
    <div className="system-basic-map-view">
      <div>system-basic-map</div>
      <div style={{margin: 'auto', textAlign: 'center'}}>
        <ReactEcharts style={{ width: '500px', height: '500px', margin: 'auto' }} option={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'bar',
              barWidth: 14,
              itemStyle: {
                normal: {
                  barBorderRadius: [7, 7, 0, 0]
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
  );
}
