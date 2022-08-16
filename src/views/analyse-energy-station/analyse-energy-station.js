import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-energy-station.scss';
import { ChartService } from '../../utils/chart.service';

export const AnalyseEnergyStation = () => {
  const [loadRateButtons, setLoadRateButton] = useState([]);
  const [chartDateButtons, setChartDateButtons] = useState([]);

  useEffect(() => {
    setLoadRateButton([
      { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
    ]);
    setChartDateButtons([
      { name: '今日', selected: true }, { name: '近七天' }, { name: '历史' }
    ]);
  }, []);

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
    setChartDateButtons([...chartDateButtons]);
  }

  return (
    <div className="analyse-energy-station-view">
      <div className="top-box">
        <div className="top-left">
          <div className="chart-wrapper">
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <div className="chart-block-title">
                  <span className="title-icon"></span>
                  电锅炉热效率
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
                    data: ['电锅炉', '蓄热水箱', '能源站系统']
                  },
                  xName: '时',
                  yName: '%',
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  series: [
                    {
                      name: '电锅炉',
                      data: [50, 60, 30, 24, 90, 18, 35, 80, 47, 60, 60, 50, 60,
                        30, 24, 80, 38, 35, 80, 47, 60, 60, 80]
                    },
                    {
                      name: '蓄热水箱',
                      data: [35, 80, 47, 60, 70, 50, 60, 50, 60, 30, 24, 60, 78,
                        80, 47, 60, 80, 90, 60, 54, 60, 78, 65]
                    },
                    {
                      name: '能源站系统',
                      data: [25, 60, 57, 40, 50, 40, 50, 50, 60, 40, 54, 50, 48,
                        60, 57, 40, 50, 60, 40, 54, 60, 48, 45]
                    }
                  ]
                })} />
            </div>
          </div>
          <div className="chart-wrapper">
            <div className="date-button-wrapper">
              {
                loadRateButtons.map((item, index) =>
                  <span onClick={() => selectLoadRateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <div className="chart-block-title">
                  <span className="title-icon"></span>
                  负载率统计
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getBarOptions({
                  yName: '%',
                  category: ['7/12', '7/13', '7/14', '7/15', '7/16', '7/17', '7/18'],
                  series: [
                    {
                      data: [50, 60, 30, 24, 60, 48, 80]
                    }
                  ]
                })} />
            </div>
          </div>
        </div>
        <div className="top-middle">
          <div className="gauge-row">
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 80}], startAngle: 140
              })} />
              <div className="number-value">今日锅炉平均热效率: 62%</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 60}], colors: ['#323891', '#ecf75d'], startAngle: 40
              })} />
              <div className="number-value">今日蓄热水箱平均热效率: 70%</div>
            </div>
          </div>

          <div className="gauge-row">
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 50}], colors: ['#323891', '#45f9b7'], startAngle: 240
              })} />
              <div className="number-value">今日系统总效率: 70%</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 50}], colors: ['#323891', '#45f9b7']
              })} />
              <div className="number-value">今日减碳排放量: 50KWH</div>
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="chart-wrapper">
            <div className="date-button-wrapper">
                {
                  chartDateButtons.map((item, index) =>
                    <span onClick={() => selectChartDateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
                }
              </div>
              <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
                <div className="chart-block-title">
                    <span className="title-icon"></span>
                    今日碳排放量统计
                </div>
                <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                  ChartService.getLineOptions({
                    xName: '时',
                    yName: '%',
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    series: [
                      {
                        data: [150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                          230, 224, 100, 218, 135, 80, 147, 260, 200, 100]
                      },
                      {
                        data: [35, 80, 47, 160, 100, 50, 60,50, 60, 30, 124, 60, 118, 
                          80, 47, 160, 100, 100, 130, 124, 100, 118, 35]
                      }
                    ]
                  })} />
              </div>
          </div>
          <div className="chart-wrapper">
            <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '450px'}}>
              <div className="chart-block-title">
                  <span className="title-icon"></span>
                  电量类型碳排占比
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
                  name: '%',
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
                    symbolSize: 14,
                    data: [
                      [10.0, 8.04],
                      [8.07, 6.95],
                      [13.0, 7.58],
                      [9.05, 8.81],
                      [11.0, 8.33],
                      [14.0, 7.66],
                      [13.4, 6.81],
                      [10.0, 6.33],
                      [14.0, 8.96],
                      [12.5, 6.82],
                      [9.15, 7.2],
                      [11.5, 7.2],
                      [3.03, 4.23],
                      [12.2, 7.83],
                      [2.02, 4.47],
                      [1.05, 3.33],
                      [4.05, 4.96],
                      [6.03, 7.24],
                      [12.0, 6.26],
                      [12.0, 8.84],
                      [7.08, 5.82],
                      [5.02, 5.68]
                    ],
                    type: 'scatter',
                    itemStyle: {
                      color: '#446eee'
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
