import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './load-prediction.scss';

export const LoadPrediction = () => {
  const [chartButtons, setChartButtons] = useState([
    { name: 'D1组团', selected: true }, { name: 'D2组团' }, { name: 'D3组团' },
    { name: 'D4组团' }, { name: 'D5组团' }, { name: 'D6组团' },
    { name: '公共组团南区' }, { name: '公共组团北区' },
  ]);

  const selectChartButton = (item) => {
    chartButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartButtons([...chartButtons]);
  }

  return (
    <div className="load-prediction-view">
      <div className="top-box">
        <div className="date-button-wrapper">
          {
            chartButtons.map((item, index) =>
              <span onClick={() => selectChartButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
          }
        </div>
        <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
          title: {
            text: '建筑物逐时负荷统计',
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
      <div className="bottom-box">
        <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
          legend: {
            show: true,
            top: 10,
            right: 12,
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            data: ['真实值', '预测值']
          },
          title: {
            text: '负荷真实值与预测值对比',
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
              symbolSize: 6,
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
  );
}
