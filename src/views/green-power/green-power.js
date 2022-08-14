import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './green-power.scss';
import { ChartService } from '../../utils/chart.service';

export const GreenPower = () => {
  const [rateButtons, setRateButtons] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [emissionTypeButtons, setEmissionTypeButtons] = useState([
    { name: '绿电碳排放量', selected: true }, { name: '原煤碳排放量' }, { name: '天然气碳排放量' }
  ]);
  const [systemRateButtons, setSystemRateButtons] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [systemRateButtons2, setSystemRateButtons2] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [chartDateButtons, setChartDateButtons] = useState([
    { name: '本日碳排放量', selected: true }, { name: '近七天碳排放量' }, { name: '历史碳排放量' }
  ]);

  const selectRateButton = (item) => {
    rateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setRateButtons([...rateButtons]);
  }

  const selectSystemRateButtons = (item) => {
    systemRateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setSystemRateButtons([...systemRateButtons]);
  }

  const selectSystemRateButtons2 = (item) => {
    systemRateButtons2.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setSystemRateButtons2([...systemRateButtons2]);
  }

  const selectEmissionTypeButtons = (item) => {
    emissionTypeButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setEmissionTypeButtons([...emissionTypeButtons]);
  }

  const selectChartDateButtons = (item) => {
    chartDateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartDateButtons([...chartDateButtons]);
  }

  return (
    <div className="green-power-view">
      <div className="row-box">
        <div className="row-left">
          <div className="chart-block-title circle-block-title">
            <span className="title-icon"></span>
            能源概况
          </div>
          <div className="top-row">
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 80}], startAngle: 240
              })} />
              <div className="number-value">年发电量: 2140万kWh</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 60}], colors: ['#323891', '#ecf75d'], startAngle: 40
              })}/>
              <div className="number-value">月发电量: 240万kWh</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 70}], colors: ['#323891', '#45f9b7'], startAngle: 140
              })}/>
              <div className="number-value">日发电量: 8万kWh</div>
            </div>
          </div>
        </div>
        <div className="row-right">
          <div className="chart-block-title circle-block-title">
            <span className="title-icon"></span>
            能效概况
          </div>
          <div className="top-row">
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 80}], startAngle: 240
              })} />
              <div className="number-value">二氧化碳减排量: 1250吨</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 60}], colors: ['#323891', '#ecf75d'], startAngle: 40
              })}/>
              <div className="number-value">等效植树: 4280棵</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
                data: [{ value: 100 }, { value: 70}], colors: ['#323891', '#45f9b7'], startAngle: 140
              })}/>
              <div className="number-value">碳配额使用率: 40%</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row-box">
        <div className="row-left">
          <div className="chart-block-title circle-block-title info-row-title">
            <span className="title-icon"></span>
            绿电概况
          </div>
          <div className="info-row">
            <span className="info-item fa fa-ravelry"></span>
            <span className="info-item">风力发电</span>
            <span className="info-item">装机容量</span>
            <span className="info-item"><span className="value-item">98.86</span>MW</span>
            <span className="info-item">数量：<span className="value-item">8</span></span>
          </div>
          <div className="info-row">
            <span className="info-item fa fa-th"></span>
            <span className="info-item">光伏发电</span>
            <span className="info-item">装机容量</span>
            <span className="info-item"><span className="value-item">98.86</span>MW</span>
            <span className="info-item">数量：<span className="value-item">6</span></span>
          </div>
        </div>
        <div className="row-right">
          <div className="chart-block-title circle-block-title">
            <span className="title-icon"></span>
            低碳环保
          </div>
          <div className="top-row">
            <div className="gauge-box">
              <ReactEcharts style={{ width: '180px', height: '180px', margin: 'auto' }} option={ChartService.getGaugeOptions({
                value: 80
              })} />
              <div className="gauge-title">绿电指数: 80</div>
            </div>
            <div className="gauge-box">
              <ReactEcharts style={{ width: '180px', height: '180px', margin: 'auto' }} option={ChartService.getGaugeOptions({
                value: 90
              })} />
              <div className="gauge-title">降碳指数: 90</div>
            </div>
            <div className="gauge-box">
              <ReactEcharts style={{ width: '180px', height: '180px', margin: 'auto' }} option={ChartService.getGaugeOptions({
                value: 65
              })} />
              <div className="gauge-title">能效指数: 65</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row-box">
        <div className="row-left">
          <div className="chart-wrapper">
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <div className="chart-block-title">
                <span className="title-icon"></span>
                绿色节能
                <span className="info-item chart-info">日最高负荷：<span className="value-item">748</span>万kWh</span>
                <span className="info-item chart-info">月最高负荷：<span className="value-item">224</span>kW</span>
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', marginTop: '30px' }} option={
                ChartService.getLineOptions({
                  yName: '万kWh',
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                  series: [
                    {
                      data: [150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                        230, 224, 100, 218, 135, 80, 147, 260, 200, 100, 147, 260, 200, 100, 147, 260, 150]
                    }
                  ]
                })} />
            </div>
          </div>
        </div>
        <div className="row-right">
          <div className="chart-wrapper">
            <div style={{ margin: 'auto', textAlign: 'center', width: '100%', height: '450px' }}>
              <div className="chart-block-title">
                <span className="title-icon"></span>
                负荷概况
              </div>
              <div className="info-row chart-info-row">
                <span className="info-item">
                  冬奥村建筑能耗
                  <div><span className="value-item">3.6</span>万tce</div>
                </span>
                <span className="info-item">
                  单位建筑面积能效
                  <div><span className="value-item">13.85</span>kgce/m2</div>
                </span>
                <span className="info-item">
                  单位面积能耗
                  <div><span className="value-item">298.86</span>kgce/m2</div>
                </span>
              </div>
              <div className="chart-desc">单位面积能耗</div>
              <ReactEcharts style={{ width: '100%', height: '450px', marginTop: '30px' }} option={{
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#6cbcea',
                      width: 1,
                      type: 'solid'
                    }
                  },
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                },
                yAxis: {
                  type: 'value',
                  name: 'kgce/m2',
                  axisLine: {
                    show: false,
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
                    smooth: true,
                    data: [50, 50, 50, 54, 60, 58, 55, 60, 57, 60, 60, 50, 50,
                      60, 54, 55, 58, 45, 60, 47, 60, 70, 50, 47, 60, 50, 60, 47, 60, 50],
                    type: 'line',
                    areaStyle: {}
                  }
                ]
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}