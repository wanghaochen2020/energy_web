import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ChartService } from '../../utils/chart.service';
import './system-solar-power.scss';
import { PAGEDATA } from '../../constants/pageData';
import { EnergyStation } from '../../business/system-layer.service';

const system_solar_power_data = {
  "basic_data":[],
  "basic_data_list_year":[
    PAGEDATA.SolarElecGenYear
  ],
  "basic_data_list_month":[
    PAGEDATA.SolarElecGenMonth
  ],
  "basic_data_list_day":[],
  "map_data_list_day":[],
  "basic_data_list_hour":[],
  "basic_opc_list":[
    PAGEDATA.SolarElecGenTotal1, PAGEDATA.SolarElecGenTotal2, 
    PAGEDATA.SolarElecGenToday1, PAGEDATA.SolarElecGenToday2,
    PAGEDATA.SolarElecGenThisMonth1, PAGEDATA.SolarElecGenThisMonth2, //当月发电量
    PAGEDATA.SolarElecGenLastYear1, PAGEDATA.SolarElecGenLastYear2, //去年发电量
    PAGEDATA.SolarElecGenYesterday1, PAGEDATA.SolarElecGenYesterday2, //昨日发电量
    PAGEDATA.SolarElecGenLastMonth1, PAGEDATA.SolarElecGenLastMonth2
  ]
}

const getList = (d, min) => {
  return d && d[min] ? d[min] : 0;
}

export const SystemSolarPower = () => {
  const [pageData, setPageData] = useState({});
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);
  const [lastYear, setLastYear] = useState(0);
  const [yesterday, setYesterday] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  useEffect(()=>{
    let dayStr = EnergyStation.getDayStr();
    let hourStr = EnergyStation.getHourStr();
    let min = EnergyStation.getMin();
    let monthStr = EnergyStation.getMonthStr();
    let yearStr = EnergyStation.getYearStr();
    EnergyStation.postPageData({
      data:system_solar_power_data,
      year_str:yearStr,
      month_str:monthStr,
      day_str:dayStr,
      hour_str:hourStr,
    }).then((res) => {
      setTotal((getList(res[PAGEDATA.SolarElecGenTotal1], min) + getList(res[PAGEDATA.SolarElecGenTotal2], min)).toFixed(0))
      setToday((getList(res[PAGEDATA.SolarElecGenToday1], min) + getList(res[PAGEDATA.SolarElecGenToday2], min)).toFixed(0))
      setThisMonth((getList(res[PAGEDATA.SolarElecGenThisMonth1], min) + getList(res[PAGEDATA.SolarElecGenThisMonth2], min)).toFixed(0))
      setLastYear((getList(res[PAGEDATA.SolarElecGenLastYear1], 0) + getList(res[PAGEDATA.SolarElecGenLastYear2], 0)).toFixed(0))
      setYesterday((getList(res[PAGEDATA.SolarElecGenYesterday1], 0) + getList(res[PAGEDATA.SolarElecGenYesterday2], 0)).toFixed(0))
      setLastMonth((getList(res[PAGEDATA.SolarElecGenLastMonth1], 0) + getList(res[PAGEDATA.SolarElecGenLastMonth2], 0)).toFixed(0))
      
      let needChange = false;
      for (const key in res) {
        if (Object.hasOwnProperty.call(res, key)) {
          const ele1 = res[key];
          const ele2 = pageData[key];
          if (ele2 === undefined) {
            needChange = true;
            break;
          }
          if (Array.isArray(ele1)) {
            if (!Array.isArray(ele2) || ele1.length != ele2.length) {
              needChange = true;
              break;
            }
            for (let i = 0;i<ele1.length;i++) {
              if (ele1[i] != ele2[i]) {
                needChange = true;
                break;
              }
            }
            if (needChange) break;
          } else {
            if (ele1 !== ele2) {
              needChange = true;
              break;
            }
          }
        }
      }

      if (needChange) setPageData(res);
    });
  }, [])
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
                  title: total,
                  unit: 'MWH',
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
                  title: today,
                  unit: 'MWH',
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
                  title: thisMonth,
                  unit: 'MWH',
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
                  title: lastYear,
                  unit: 'MWH',
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
                  title: yesterday,
                  unit: 'MWH',
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
                  title: lastMonth,
                  unit: 'MWH',
                  subTitle: '上月发电量'
                })}
              />
            </div>
            {/* <div className="top-info-box">
              <ReactEcharts
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                option={ChartService.getPieOptions({
                  data: [{ value: 20 }, { value: 70 }],
                  startAngle: 90,
                  title: '26392',
                  unit: 'MWH',
                  subTitle: '去年发电量'
                })}
              />
            </div> */}
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
                data: pageData[PAGEDATA.SolarElecGenYear],
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
                20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31],
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
                data: pageData[PAGEDATA.SolarElecGenMonth],
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
