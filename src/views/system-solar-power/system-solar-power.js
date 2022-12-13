import React from 'react';
import ReactEcharts from 'echarts-for-react';
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
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
                tooltip: {
                  show: false
                },
                series: [
                  {
                    type: 'pie',
                    radius: ['80%', '100%'],
                    startAngle: 360,
                    hoverAnimation: false,
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                      { value: 80, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#33d7ea' } }
                    ]
                  }
                ]
              }} />
              <div className="number-value">总发电量: 62358KWH</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
                tooltip: {
                  show: false
                },
                series: [
                  {
                    type: 'pie',
                    radius: ['80%', '100%'],
                    startAngle: 360,
                    hoverAnimation: false,
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                      { value: 80, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#33d7ea' } }
                    ]
                  }
                ]
              }} />
              <div className="number-value">当日发电量: 16KWH</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
                tooltip: {
                  show: false
                },
                series: [
                  {
                    type: 'pie',
                    radius: ['80%', '100%'],
                    startAngle: 320,
                    hoverAnimation: false,
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                      { value: 60, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#ecf75d' } }
                    ]
                  }
                ]
              }} />
              <div className="number-value">当月发电量: 323KWH</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
                tooltip: {
                  show: false
                },
                series: [
                  {
                    type: 'pie',
                    radius: ['80%', '100%'],
                    startAngle: 270,
                    hoverAnimation: false,
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                      { value: 50, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#45f9b7' } }
                    ]
                  }
                ]
              }} />
              <div className="number-value">去年发电量: 32562KWH</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
                tooltip: {
                  show: false
                },
                series: [
                  {
                    type: 'pie',
                    radius: ['80%', '100%'],
                    startAngle: 360,
                    hoverAnimation: false,
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                      { value: 80, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#33d7ea' } }
                    ]
                  }
                ]
              }} />
              <div className="number-value">昨日发电量: 15KWH</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
                tooltip: {
                  show: false
                },
                series: [
                  {
                    type: 'pie',
                    radius: ['80%', '100%'],
                    startAngle: 320,
                    hoverAnimation: false,
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                      { value: 60, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#ecf75d' } }
                    ]
                  }
                ]
              }} />
              <div className="number-value">上月发电量: 232KWH</div>
            </div>
            <div className="top-info-box">
              <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={{
                tooltip: {
                  show: false
                },
                series: [
                  {
                    type: 'pie',
                    radius: ['80%', '100%'],
                    startAngle: 270,
                    hoverAnimation: false,
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      { value: 100, name: 'full', label: { normal: { show: false } }, itemStyle: { color: '#323891' } },
                      { value: 50, name: 'rate', label: { normal: { show: false } }, itemStyle: { color: '#45f9b7' } }
                    ]
                  }
                ]
              }} />
              <div className="number-value">去年发电量: 26392KWH</div>
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
