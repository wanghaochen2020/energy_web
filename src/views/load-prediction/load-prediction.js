import React from 'react';
import * as echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import './load-prediction.scss';

export const LoadPrediction = () => {

  return (
    <div className="load-prediction-view">
      <div className="top-box">
        <div className="date-button-wrapper">
          <span className="date-button date-button-selected">D1组团</span>
          <span className="date-button">D2组团</span>
          <span className="date-button">D3组团</span>
          <span className="date-button">D4组团</span>
          <span className="date-button">D5组团</span>
          <span className="date-button">D6组团</span>
          <span className="date-button">公共组团南区</span>
          <span className="date-button">公共组团北区</span>
        </div>
        <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
          title: {
            text: '建筑物逐时负荷统计',
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
      <div className="bottom-box">
        <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
          legend: {
            show: true,
            top: 10,
            right: 12,
            data: ['真实值', '预测值']
          },
          title: {
            text: '负荷真实值与预测值对比',
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
              name: '真实值',
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
              name: '预测值',
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
  );
}
