import React from 'react';
import * as echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import './analyse-second-pump.scss';

export const AnalyseSecondPump = () => {

  return (
    <div className="analyse-second-pump-view">
      <div className="top-box">
        <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
          title: {
            text: '循环泵输热比（EHR）',
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
              type: 'line',
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
