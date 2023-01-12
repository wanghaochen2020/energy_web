import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-second-pump.scss';
import { ChartService } from '../../utils/chart.service';
import { EnergyStation } from '../../business/system-layer.service';
import { PAGEDATA } from '../../constants/pageData';

export const AnalyseSecondPump = () => {
  let [PumpEHR1, setPumpEHR1] = useState([]);
  let [PumpEHR2, setPumpEHR2] = useState([]);
  let [PumpCarbonYear, setPumpCarbonYear] = useState([]);
  let [PumpCarbonLastYear, setPumpCarbonLastYear] = useState([]);

  useEffect(() => {
    let dayStr = EnergyStation.getDayStr();
    let yearStr = EnergyStation.getYearStr();
    let lastYearStr = EnergyStation.getLastYearStr();
    EnergyStation.getTable(PAGEDATA.PumpEHR1, dayStr).then((res)=> {
      setPumpEHR1(res)
    })
    EnergyStation.getTable(PAGEDATA.PumpEHR2, dayStr).then((res)=> {
      setPumpEHR2(res)
    })
    EnergyStation.getTable(PAGEDATA.PumpCarbonYear, yearStr).then((res)=> {
      setPumpCarbonYear(res);
    });
    EnergyStation.getTable(PAGEDATA.PumpCarbonYear, lastYearStr).then((res)=> {
      setPumpCarbonLastYear(res);
    });
  }, []);

  let items = EnergyStation.powerList(PumpCarbonYear,PumpCarbonLastYear);

  return (
    <div className="analyse-second-pump-view">
      <div className="top-box">
        <div className="box-wrapper" style={{height: '350px'}}>
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">循环泵输热比（EHR）</span>
          </div>
          <ReactEcharts
            style={{ width: '100%', height: '350px', margin: 'auto' }}
            option={ChartService.getLineOptions({
              legend: {
                data: ['环路1', '环路2']
              },
              xName: '时',
              yName: '%',
              data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
              series: [
                {
                  name: '环路1',
                  data: PumpEHR1
                },
                {
                  name: '环路2',
                  data: PumpEHR2
                }
              ]
            })}
          />
          {/* <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
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
              data: ['环路1', '环路2']
            },
            xAxis: {
              type: 'category',
              data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
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
              name: '',
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
                name: '环路1',
                data: PumpEHR1,
                type: 'line',
                smooth: true,
                symbolSize: 6,
                itemStyle: {
                  normal: {
                    color: '#03e9eb'
                  }
                }
              },
              {
                name: '环路2',
                data: PumpEHR2,
                type: 'line',
                smooth: true,
                symbolSize: 6,
                itemStyle: {
                  normal: {
                    color: '#fd6b44'
                  }
                }
              }
            ]
          }} /> */}
        </div>
      </div>
      <div className="bottom-box">
        <table className="table-history">
          <thead>
            <tr>
              <th>时间</th>
              <th>二次泵站耗能（MWH）</th>
              <th>同比去年同月耗能</th>
              <th>环比上月耗能</th>
              <th>碳排放量（tCO2）</th>
              <th>环比去年同月碳排放量</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    </div>
  );
}
