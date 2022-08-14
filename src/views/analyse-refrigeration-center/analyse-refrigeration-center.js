import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-refrigeration-center.scss';
import { ChartService } from '../../utils/chart.service';

export const AnalyseRefrigerationCenter = () => {
  const [chartButtons, setChartButtons] = useState([
    { name: '1#制冷机组', selected: true }, { name: '2#制冷机组' }, { name: '3#制冷机组' }
  ]);
  const [loadRateButtons, setLoadRateButton] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [chartDateButtons, setChartDateButtons] = useState([
    { name: '本日碳排放量', selected: true }, { name: '近七天碳排放量' }, { name: '历史碳排放量' }
  ]);

  const selectChartButton = (item) => {
    chartButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartButtons([...chartButtons]);
  }

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
    setChartDateButtons([...chartButtons]);
  }

  return (
    <div className="analyse-refrigeration-center-view">
      <div className="operation-summary">
        <div className="top-info-box">
          <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
            data: [{ value: 100 }, { value: 80}], colors: ['#323891', '#33d7ea']
          })} />
          <div className="number-value">今日制冷机平均热效率: 92%</div>
        </div>
        <div className="top-info-box">
          <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
            data: [{ value: 100 }, { value: 80}], colors: ['#323891', '#ecf75d'], startAngle: 40
          })} />
          <div className="number-value">今日蓄热水箱平均热效率: 94%</div>
        </div>
        <div className="top-info-box">
          <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
            data: [{ value: 100 }, { value: 50}], colors: ['#323891', '#45f9b7'], startAngle: 140
          })} />
          <div className="number-value">今日系统总效率: 98%</div>
        </div>
        <div className="top-info-box">
          <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
            data: [{ value: 100 }, { value: 60}], colors: ['#323891', '#ecf75d'], startAngle: 240
          })} />
          <div className="number-value">今日碳排放量统计: 50KWH</div>
        </div>
      </div>
      <div className="top-box">
        <div className="top-left">
          <div className="chart-wrapper">
            <div className="date-button-wrapper">
              {
                chartButtons.map((item, index) =>
                  <span onClick={() => selectChartButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <div className="chart-block-title">
                <span className="title-icon"></span>
                制冷机组制冷效率
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  xName: '时',
                  yName: '%',
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  series: [
                    {
                      data: [50, 60, 30, 24, 60, 58, 35, 80, 47, 60, 80, 50, 60,
                        30, 24, 50, 48, 55, 80, 47, 60, 80, 90]
                    },
                    {
                      data: [35, 80, 47, 60, 80, 50, 60, 50, 60, 30, 54, 60, 68,
                        80, 47, 60, 70, 80, 30, 64, 80, 58, 35]
                    }
                  ]
                })} />
            </div>
          </div>
        </div>
        <div className="top-middle">
          
        <div className="chart-wrapper load-balance-wrapper">
            <div className="date-button-wrapper">
              {
                loadRateButtons.map((item, index) =>
                  <span onClick={() => selectLoadRateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
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
                      data: [50, 60, 30, 24, 40, 58, 65, 80]
                    }
                  ]
                })} />
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="chart-wrapper">
            <div className="date-button-wrapper" style={{top: '25px'}}>
              {
                chartDateButtons.map((item, index) =>
                  <span onClick={() => selectChartDateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <div className="chart-block-title">
                <span className="title-icon"></span>
                今日碳排放量统计
              </div>
              <ReactEcharts style={{ width: '445px', height: '450px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  xName: '时',
                  yName: 'Kg',
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  series: [
                    {
                      data: [150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                        230, 224, 100, 218, 135, 80, 147, 260, 200, 100]
                    },
                    {
                      data: [35, 80, 47, 160, 100, 50, 60, 50, 60, 30, 124, 60, 118,
                        80, 47, 160, 100, 100, 130, 124, 100, 118, 35]
                    }
                  ]
                })} />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <table className="table-history">
          <thead>
            <tr>
              <th>时间</th>
              <th>制冷站耗能（GJ）</th>
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
