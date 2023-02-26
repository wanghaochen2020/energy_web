import React, { useEffect,useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './allocation-week.scss';
import { Allocation } from '../../business/allocation';

export const AllocationWeek = () => {
  const [heatStorageWeek, setHeatStorageWeek] = useState([]);
  const [electricityWeek, setElectricityWeek] = useState([]);
  const [configWeekVally, setConfigWeekVally] = useState([[],[],[],[],[],[],[]]);
  const [configWeekOther, setConfigWeekOther] = useState([[],[],[],[],[],[],[]]);

  useEffect(() => {
      Allocation.getHeatStorageWeek().then((res)=> {
        setHeatStorageWeek(res.再蓄热量)
      });

      Allocation.getElectricityWeek().then((res)=> {
        setElectricityWeek(res.移峰电量)
      });

      Allocation.getConfigWeek().then((res)=> {
        setConfigWeekVally(res.谷电价)
        setConfigWeekOther(res.峰平电价)
      });
  }, []);


  return (
    <div className="allocation-week-view">
      <div className="top-box">
        <div className="box-wrapper">
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
        <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
          <span className="box-title-icon">&#9658;</span>
          <span className="title-text">未来7天再蓄热量</span>
        </div>
        <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
          legend: {
            show: true,
            top: 10,
            right: 12,
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            data: ['室外温度(°C)', '再蓄热量']
          },
          tooltip: {
            trigger: 'axis'
          },
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
            data: ['2022-08-02', '2022-08-03', '2022-08-04', '2022-08-05', '2022-08-06', '2022-08-07', '2022-08-08'],
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
            }
          },
          yAxis: [{
            name: 'KWH',
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '°C',
            max: 40,
            position: 'right',
            alignTicks: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            },
            splitLine: {
              show: false
            }
          }],
          series: [
            {
              name: '再蓄热量',
              data: heatStorageWeek,
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
              name: '室外温度(°C)',
              yAxisIndex: 1,
              data: [20.4, 22.5, 18.9, 15, 28.3, 29.2, 30, 25],
              type: 'line',
              smooth: true,
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
      <div className="bottom-box">
        <div className="box-wrapper">
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
        <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
          <span className="box-title-icon">&#9658;</span>
          <span className="title-text">未来7天移峰电量</span>
        </div>
        <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
          legend: {
            show: true,
            top: 10,
            right: 12,
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            data: ['室外温度(°C)', '移峰电量(KWH)']
          },
          tooltip: {
            trigger: 'axis'
          },
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
            data: ['2022-08-02', '2022-08-03', '2022-08-04', '2022-08-05', '2022-08-06', '2022-08-07', '2022-08-08'],
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
            }
          },
          yAxis: [{
            name: 'KWH',
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '°C',
            max: 40,
            position: 'right',
            alignTicks: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            },
            splitLine: {
              show: false
            }
          }],
          series: [
            {
              name: '移峰电量(KWH)',
              data: electricityWeek,
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
              name: '室外温度(°C)',
              yAxisIndex: 1,
              data: [20.4, 22.5, 18.9, 15, 28.3, 29.2, 30, 25],
              type: 'line',
              smooth: true,
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
      <div className="bottom-box">
        <table className="table-history">
          <thead>
            <tr>
              <th>1月2号(谷电价阶段)</th>
              <th>1月3号(谷电价阶段)</th>
              <th>1月4号(谷电价阶段)</th>
              <th>1月5号(谷电价阶段)</th>
              <th>1月6号(谷电价阶段)</th>
              <th>1月7号(谷电价阶段)</th>
              <th>1月8号(谷电价阶段)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekVally[0][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekVally[1][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekVally[2][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekVally[3][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekVally[4][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekVally[5][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekVally[6][0]}h</span></td>
            </tr>
            <tr>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekVally[0][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekVally[1][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekVally[2][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekVally[3][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekVally[4][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekVally[5][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekVally[6][1]}h</span></td>
            </tr>
            <tr>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekVally[0][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekVally[1][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekVally[2][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekVally[3][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekVally[4][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekVally[5][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekVally[6][2]}h</span></td>
            </tr>
            <tr>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekVally[0][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekVally[1][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekVally[2][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekVally[3][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekVally[4][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekVally[5][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekVally[6][3]}h</span></td>
            </tr>
            <tr>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekVally[0][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekVally[1][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekVally[2][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekVally[3][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekVally[4][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekVally[5][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekVally[6][4]}h</span></td>
            </tr>
          </tbody>
        </table>
        <table className="table-history">
          <thead>
            <tr>
              <th>1月2号(峰平电价阶段)</th>
              <th>1月3号(峰平电价阶段)</th>
              <th>1月4号(峰平电价阶段)</th>
              <th>1月5号(峰平电价阶段)</th>
              <th>1月6号(峰平电价阶段)</th>
              <th>1月7号(峰平电价阶段)</th>
              <th>1月8号(峰平电价阶段)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekOther[0][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekOther[1][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekOther[2][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekOther[3][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekOther[4][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekOther[5][0]}h</span></td>
              <td><span className="label-style">开启4台锅炉</span><span>{configWeekOther[6][0]}h</span></td>
            </tr>
            <tr>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekOther[0][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekOther[1][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekOther[2][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekOther[3][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekOther[4][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekOther[5][1]}h</span></td>
              <td><span className="label-style">开启3台锅炉</span><span>{configWeekOther[6][1]}h</span></td>
            </tr>
            <tr>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekOther[0][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekOther[1][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekOther[2][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekOther[3][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekOther[4][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekOther[5][2]}h</span></td>
              <td><span className="label-style">开启2台锅炉</span><span>{configWeekOther[6][2]}h</span></td>
            </tr>
            <tr>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekOther[0][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekOther[1][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekOther[2][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekOther[3][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekOther[4][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekOther[5][3]}h</span></td>
              <td><span className="label-style">开启1台锅炉</span><span>{configWeekOther[6][3]}h</span></td>
            </tr>
            <tr>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekOther[0][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekOther[1][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekOther[2][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekOther[3][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekOther[4][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekOther[5][4]}h</span></td>
              <td><span className="label-style">开启0台锅炉</span><span>{configWeekOther[6][4]}h</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
