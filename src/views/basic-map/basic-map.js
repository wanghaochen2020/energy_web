import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Alarms } from './alarms/alarms';
import './basic-map.scss';
import { ChartService } from '../../utils/chart.service';

export const BasicMap = () => {

  return (
    <div className="basic-map-view">
      <div className="top-box">
        <iframe src="https://cos.3dzhanting.cn/3ddemo/20220501-energystationov2/3d-wov-2022111501-sdkext/index.html" className="iframe-style" title="chart"></iframe>
        <div className="top-left">
          <div className="box-wrapper" style={{ width: '100%', height: '325px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">天气状况实时监测</span>
            </div>
            <div className="weather-info-wrapper">
              <div className="weather-info">
                <span className="fa fa-thermometer"></span>
                <div className="number-text">23°C</div>
                <div className="unit-text">大气温度</div>
              </div>
              <div className="weather-info">
                <span className="fa fa-tint"></span>
                <div className="number-text">30%</div>
                <div className="unit-text">大气湿度</div>
              </div>
              <div className="weather-info">
                <span className="fa fa-sun-o"></span>
                <div className="number-text">450w/m2</div>
                <div className="unit-text">太阳能总辐射</div>
              </div>
              <div className="weather-info">
                <span className="fa fa-ravelry"></span>
                <div className="number-text">2.4m/s</div>
                <div className="unit-text">风速</div>
              </div>
              <div className="weather-info">
                <span className="fa fa-compress"></span>
                <div className="number-text">920hpa</div>
                <div className="unit-text">大气压力</div>
              </div>
            </div>
          </div>
          <div className="box-wrapper" style={{ width: '100%', height: '280px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">运动员组团入住率监测</span>
            </div>
            <div className="operation-summary">
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 80 }], startAngle: 240
                })} />
                <div className="number-value">D1组团 <br />80%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 60 }], colors: ['#323891', '#ecf75d'], startAngle: 40
                })} />
                <div className="number-value">D2组团 <br />60%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 90 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">D3组团 <br />90%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 70 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">D4组团 <br />70%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 80 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">D5组团 <br />80%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 50 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">D6组团 <br />50%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="box-wrapper" style={{ width: '100%', height: '170px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">能源站供应设备运行工况监测</span>
            </div>
            <div className="operation-summary">
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 80 }], startAngle: 240
                })} />
                <div className="number-value">设备在线<br /> 80%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 20 }], colors: ['#323891', '#ecf75d'], startAngle: 40
                })} />
                <div className="number-value">设备离线<br /> 20%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 10 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">正在维护<br />10%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 75 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">监控正常<br />75%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 25 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">监控异常<br />25%</div>
              </div>
            </div>
          </div>
          <div className="box-wrapper" style={{ width: '100%', height: '170px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">制冷站机组设备运行工况监测</span>
            </div>
            <div className="operation-summary">
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 85 }], startAngle: 240
                })} />
                <div className="number-value">设备在线<br /> 85%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 15 }], colors: ['#323891', '#ecf75d'], startAngle: 40
                })} />
                <div className="number-value">设备离线<br /> 15%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 12 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">正在维护<br />12%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 70 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">监控正常<br />70%</div>
              </div>
              <div className="top-info-box">
                <ReactEcharts style={{ width: '100px', height: '100px', margin: 'auto' }} option={ChartService.getCircleOptions({
                  data: [{ value: 100 }, { value: 30 }], colors: ['#323891', '#45f9b7'], startAngle: 140
                })} />
                <div className="number-value">监控异常<br />30%</div>
              </div>
            </div>
          </div>
          <div className="box-wrapper" style={{ width: '60%', height: '255px' }}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">事件提醒</span>
            </div>
            <Alarms />
          </div>
        </div>
      </div>
    </div>
  );
}
