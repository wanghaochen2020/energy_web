import React, { useCallback, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Alarms } from './alarms/alarms';
import './basic-map.scss';
import { ChartService } from '../../utils/chart.service';
import { SERVERINFO } from '../../constants/app-info';

const basicBuild = {
  title1:"建筑面积",
  title2:"层数",
  title3:"走廊温度",
  title4:"耗热量",
}

export const BasicMap = () => {
  let messageFunc = useCallback((event) => {
    if (event.origin === SERVERINFO.modelIP) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        let iframe = document.getElementById('basic_map_model')
        if (!iframe || !iframe.contentWindow || !event || !event.data || !event.data.type) return
        switch(event.data.type) {
          case "ok"://加载完成
              iframe.contentWindow.postMessage({type:"basic_map_init"}, SERVERINFO.modelIP)
            break
          case "device"://请求设备信息
            if (!event.data.data) {
              return
            }
            let data = {}
            switch(event.data.data) {
              case "1":
                data = basicBuild
                data.title = "运动员组团1"
                data.data1 = "14620㎡"
                data.data2 = "4"
                data.data3 = "19.87℃"
                data.data4 = "0MWH"
                break
              case "2":
                data = basicBuild
                data.title = "运动员组团2"
                data.data1 = "6977㎡"
                data.data2 = "4"
                data.data3 = "20.53℃"
                data.data4 = "0MWH"
                break
              case "3":
                data = basicBuild
                data.title = "运动员组团3"
                data.data1 = "12728㎡"
                data.data2 = "4"
                data.data3 = "18.91℃"
                data.data4 = "0MWH"
                break
              case "4":
                data = basicBuild
                data.title = "运动员组团4"
                data.data1 = "7898㎡"
                data.data2 = "5"
                data.data3 = "17.63℃"
                data.data4 = "0MWH"
                break
              case "5":
                data = basicBuild
                data.title = "运动员组团5"
                data.data1 = "7621㎡"
                data.data2 = "6"
                data.data3 = "23.22℃"
                data.data4 = "0MWH"
                break
              case "6":
                data = basicBuild
                data.title = "运动员组团6"
                data.data1 = "8128㎡"
                data.data2 = "6"
                data.data3 = "17.63℃"
                data.data4 = "0MWH"
                break
              case "公共组团北区":
                data = basicBuild
                data.title = "公共组团北区"
                data.data1 = "6259㎡"
                data.data2 = "3"
                data.data3 = "16.24℃"
                data.data4 = "0MWH"
                break
              case "公共组团南区":
                data = basicBuild
                data.title = "公共组团南区"
                data.data1 = "21095㎡"
                data.data2 = "6"
                data.data3 = "18.23℃"
                data.data4 = "0MWH"
                break
            }
            iframe.contentWindow.postMessage({type:"window_update",data:data}, SERVERINFO.modelIP)
            break
        }
    } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', messageFunc)
    return () => {
      window.removeEventListener('message', messageFunc)
    }
  })
  return (
    <div className="basic-map-view">
      <div className="top-box">
        <iframe id='basic_map_model' src={SERVERINFO.modelIP} className="iframe-style" title="chart" frameBorder="no"></iframe>
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
