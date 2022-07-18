import React, { useState } from 'react';
import * as echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfoSolarWater } from '../../components/';
import './system-solar-water-heater.scss';

export const SystemSolarWaterHeater = () => {
  const [chartDateButtons, setChartDateButton] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);

  const selectChartDateButton = (item) => {
    chartDateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartDateButton([...chartDateButtons]);
  }

  return (
    <div className="system-solar-water-heater-view">
      <div>
      </div>
      <div className="bottom-box">
        <div className="summary-info">
          <div className="summary-info-title">
            <span className="title-icon"></span>
            今日一览
          </div>
          <div>
            <ComSummaryInfoSolarWater />
          </div>
        </div>
        <div className="chart-wrapper" style={{marginRight: '-20px'}}>
          <div className="vertical-separator"></div>
          <div className="date-button-wrapper">
              {
                chartDateButtons.map((item, index) =>
                  <span onClick={() => selectChartDateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
          </div>
          <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '320px'}}>
            <div className="chart-block-title">
                <span className="title-icon"></span>
                集热量统计
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
                name: '时',
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
                name: 'KW',
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
        <div className="chart-wrapper">
          <div className="vertical-separator"></div>
          <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '320px'}}>
            <div className="chart-block-title">
                <span className="title-icon"></span>
                电热水器耗电量
            </div>
            <ReactEcharts style={{ width: '100%', height: '320px', margin: 'auto' }} option={{
              title: {
                text: '',
                left: '15',
                top: '8',
                textStyle: {
                  color: '#fff',
                  fontSize: 15
                }
              },
              xAxis: {
                type: 'category',
                name: '时',
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
          <div className="summary-info-title">
            <span className="title-icon"></span>
            今日告警
          </div>
          <div>
            <ComAlarms />
          </div>
        </div>
      </div>
    </div>
  );
}
