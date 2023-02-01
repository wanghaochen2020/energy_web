import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { ChartService } from '../../utils/chart.service';
import './system-solar-power.scss';

export const SystemSolarPower = () => {

  return (
    <div className="system-solar-power-view">
      <div className="top-info-wrapper">
        <div className="operation-summary box-wrapper">
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">太阳能发电量</span>
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 0 }, { value: 100 }],
                  startAngle: 90,
                  title: '62358',
                  unit: 'KWH',
                  subTitle: '总发电量'
                })}
              />
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 20 }, { value: 10 }],
                  startAngle: 90,
                  title: '16',
                  unit: 'KWH',
                  subTitle: '当日发电量'
                })}
              />
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 20 }, { value: 30 }],
                  startAngle: 90,
                  title: '323',
                  unit: 'KWH',
                  subTitle: '当月发电量'
                })}
              />
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 20 }, { value: 80 }],
                  startAngle: 90,
                  title: '32562',
                  unit: 'KWH',
                  subTitle: '去年发电量'
                })}
              />
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 20 }, { value: 8 }],
                  startAngle: 90,
                  title: '15',
                  unit: 'KWH',
                  subTitle: '昨日发电量'
                })}
              />
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 20 }, { value: 25 }],
                  startAngle: 90,
                  title: '232',
                  unit: 'KWH',
                  subTitle: '上月发电量'
                })}
              />
            </div>
            <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 20 }, { value: 70 }],
                  startAngle: 90,
                  title: '26392',
                  unit: 'KWH',
                  subTitle: '去年发电量'
                })}
              />
            </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">今年月发电量</span>
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
            legend: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 14
              },
              data: ['环路1', '环路2', '环路3', '环路4']
            },
            xAxis: {
              type: 'category',
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
              name: 'KWH',
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
                name: '',
                data: [50, 60, 30, 24, 18, 35, 80, 47, 60, 60, 50, 60],
                type: 'line',
                smooth: true,
                symbolSize: 6,
                itemStyle: {
                  normal: {
                    color: '#03e9eb'
                  }
                }
              }
            ]
          }} />
        </div>
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">当月日发电量</span>
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
            legend: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 14
              },
              data: ['环路1', '环路2', '环路3', '环路4']
            },
            xAxis: {
              type: 'category',
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                20, 21, 22, 23, 25, 26, 27, 28, 29, 30],
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
              name: 'KWH',
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
                name: '',
                data: [35, 80, 47, 60, 100, 50, 60, 50, 60, 30, 24, 60, 87,
                  80, 47, 60, 70, 80, 30, 64, 80, 58, 35, 80, 30, 64, 80, 58, 35],
                type: 'line',
                smooth: true,
                symbolSize: 6,
                itemStyle: {
                  normal: {
                    color: '#37f137'
                  }
                }
              }
            ]
          }} />
        </div>
      </div>
    </div>
  );
}
