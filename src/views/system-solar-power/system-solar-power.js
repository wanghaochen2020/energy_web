import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ChartService } from '../../utils/chart.service';
import './system-solar-power.scss';
import { PAGEDATA } from '../../constants/pageData';
import { EnergyStation } from '../../business/system-layer.service';

const system_solar_power_data = {
  "basic_data":[
    PAGEDATA.SolarElecGenToday
  ],
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
    PAGEDATA.SolarElecGenYesterday, PAGEDATA.SolarElecGenTotal
  ]
}

const getList = (d, min) => {
  return d && d[min] ? d[min] : 0;
}

export const SystemSolarPower = () => {
  const [pageData, setPageData] = useState({});
  const [lastMonth, setLastMonth] = useState(0);
  const [month, setMonth] = useState(0);
  const [lastYear, setLastYear] = useState(0);
  useEffect(()=>{
    let dayStr = EnergyStation.getDayStr();
    let hourStr = EnergyStation.getHourStr();
    let min = EnergyStation.getMin();
    let month = EnergyStation.getMonth();
    let monthStr = EnergyStation.getMonthStr();
    let yearStr = EnergyStation.getYearStr();
    EnergyStation.postPageData({
      data:system_solar_power_data,
      year_str:yearStr,
      month_str:monthStr,
      day_str:dayStr,
      hour_str:hourStr,
    }).then((res) => {
      res[PAGEDATA.SolarElecGenToday] = res[PAGEDATA.SolarElecGenToday].toFixed(2);
      res[PAGEDATA.SolarElecGenYesterday] = getList(res[PAGEDATA.SolarElecGenYesterday], 0).toFixed(2);
      res[PAGEDATA.SolarElecGenTotal] = getList(res[PAGEDATA.SolarElecGenTotal], min).toFixed(2);
      setMonth(getList(res[PAGEDATA.SolarElecGenYear],month - 1))
      if (month >= 2) {
        setLastMonth(getList(res[PAGEDATA.SolarElecGenYear],month - 2))
      }
      
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
    EnergyStation.postPageData({
      data:{"basic_data_list_year":[PAGEDATA.SolarElecGenYear]},
      yearStr:EnergyStation.getLastYearStr()
    }).then((res) => {
      if (month === 1) {
        setLastMonth(getList(res[PAGEDATA.SolarElecGenYear], 11));
      }
      let ans = 0;
      if (res[PAGEDATA.SolarElecGenYear]) {
        for (let i of res[PAGEDATA.SolarElecGenYear]) {
          ans += i;
        }
      }
      setLastYear(i);
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
                  title: pageData[PAGEDATA.SolarElecGenTotal],
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
                  title: pageData[PAGEDATA.SolarElecGenToday],
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
                  title: month,
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
                  title: pageData[PAGEDATA.SolarElecGenYesterday],
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
