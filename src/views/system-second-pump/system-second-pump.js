import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ComAlarms, ComSummaryInfoSecondPump } from '../../components/';
import './system-second-pump.scss';
import { PAGEDATA } from '../../constants/pageData';
import { EnergyStation } from '../../business/system-layer.service';
import { SERVERINFO } from '../../constants/app-info';

const basicPump = {
  title1:"运行状态",
  title2:"运行功率",
  title3:"流量",
  data1:"关闭",
  data2: "7.5kW",
  data3: "137m³/h",
}

const system_pump_data = {
  "basic_data":[
    PAGEDATA.PumpPowerMin,PAGEDATA.PumpPowerToday,PAGEDATA.PumpRunningState1,PAGEDATA.PumpRunningState2,PAGEDATA.PumpRunningState3,PAGEDATA.PumpRunningState4,
    PAGEDATA.PumpRunningState5,PAGEDATA.PumpRunningState6,PAGEDATA.PumpAlarmNumToday
  ],
  "basic_data_list_day":[],
  "map_data_list_day":[PAGEDATA.PumpAlarmToday],
  "basic_data_list_hour":[],
  "basic_opc_list":[]
}

export const SystemSecondPump = () => {
  let [pageData, setPageData] = useState({});
  
  let messageFunc = useCallback((event) => {
    if (event.origin === SERVERINFO.model3IP) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        let iframe = document.getElementById('pump_model')
        if (!iframe || !iframe.contentWindow || !event || !event.data || !event.data.type) return
        switch(event.data.type) {
          case "ok"://加载完成
              iframe.contentWindow.postMessage({type:"pump_init"}, "*")
            break
          case "device"://请求设备信息
            if (!event.data.data) {
              return
            }
            let data = {}
            switch(event.data.data) {
              case "1#空调热水二次泵":
                data = basicPump
                data.title = "1#空调热水二次泵"
                data.data1 = pageData[PAGEDATA.PumpRunningState1] == 0 ? "关闭" : "开启"
                data.data2="18.5kW"
                data.data3="145m³/h"
                break
              case "2#空调热水二次泵":
                data = basicPump
                data.title = "2#空调热水二次泵"
                data.data1 = pageData[PAGEDATA.PumpRunningState2] == 0 ? "关闭" : "开启"
                data.data2="18.5kW"
                data.data3="145m³/h"
                break
              case "3#空调热水二次泵":
                data = basicPump
                data.title = "3#空调热水二次泵"
                data.data1 = pageData[PAGEDATA.PumpRunningState3] == 0 ? "关闭" : "开启"
                data.data2="15kW"
                data.data3="120m³/h"
                break
              case "4#空调热水二次泵":
                data = basicPump
                data.title = "4#空调热水二次泵"
                data.data1 = pageData[PAGEDATA.PumpRunningState4] == 0 ? "关闭" : "开启"
                data.data2="15kW"
                data.data3="120m³/h"
                break
              case "5#空调热水二次泵":
                data = basicPump
                data.title = "5#空调热水二次泵"
                data.data1 = pageData[PAGEDATA.PumpRunningState5] == 0 ? "关闭" : "开启"
                data.data2="22kW"
                data.data3="180m³/h"
                break
              case "6#空调热水二次泵":
                data = basicPump
                data.title = "6#空调热水二次泵"
                data.data1 = pageData[PAGEDATA.PumpRunningState6] == 0 ? "关闭" : "开启"
                data.data2="22kW"
                data.data3="180m³/h"
                break
            }
            iframe.contentWindow.postMessage({type:"window_update",data:data}, SERVERINFO.model3IP)
            break
        }
    } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
    }
  }, [])

  useEffect(()=>{
    let dayStr = EnergyStation.getDayStr();
    let hourStr = EnergyStation.getHourStr();

    EnergyStation.postPageData({
      data:system_pump_data,
      day_str:dayStr,
      hour_str:hourStr
    }).then((res) => {
      let needChange = false;
      res[PAGEDATA.PumpPowerMin] = res[PAGEDATA.PumpPowerMin].toFixed(2);
      res[PAGEDATA.PumpPowerToday] = res[PAGEDATA.PumpPowerToday].toFixed(2);
      res[PAGEDATA.PumpRunningState1] = res[PAGEDATA.PumpRunningState1].toFixed(0);
      res[PAGEDATA.PumpRunningState2] = res[PAGEDATA.PumpRunningState2].toFixed(0);
      res[PAGEDATA.PumpRunningState3] = res[PAGEDATA.PumpRunningState3].toFixed(0);
      res[PAGEDATA.PumpRunningState4] = res[PAGEDATA.PumpRunningState4].toFixed(0);
      res[PAGEDATA.PumpRunningState5] = res[PAGEDATA.PumpRunningState5].toFixed(0);
      res[PAGEDATA.PumpRunningState6] = res[PAGEDATA.PumpRunningState6].toFixed(0);
      res[PAGEDATA.PumpAlarmNumToday] = res[PAGEDATA.PumpAlarmNumToday].toFixed(0);

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
  
  useEffect(() => {
    window.addEventListener('message', messageFunc)
    return () => {
      window.removeEventListener('message', messageFunc)
    }
  }, [messageFunc])

  return (
    <div className="system-second-pump-view">
      <iframe id="pump_model" src={SERVERINFO.model3IP} className="iframe-style" title="chart" frameBorder="no"></iframe>
      <div className="operation-summary">
        <div className="alarm-info">
          <div className="alarm-number">{pageData[PAGEDATA.PumpAlarmNumToday]}</div>
          <div className="alarm-label">告警次数</div>
          <span className="alarm-left-corner"></span>
        </div>
      </div>
      <div className="bottom-box">
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{marginTop: '10px', backgroundImage: "url('/assets/images/titleBg.png')"}}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">今日一览</span>
          </div>
          <div>
            <ComSummaryInfoSecondPump items={{power:pageData[PAGEDATA.PumpPowerMin],energyCostToday:pageData[PAGEDATA.PumpPowerToday]}}/>
          </div>
        </div>
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">空调热水泵运行状态</span>
          </div>
          <div style={{margin: 'auto', textAlign: 'center', width: '100%', height: '300px'}}>
            <div className="row-item-box">
              <div className="item-text">1号泵</div>
              <div className={"item-value text-"+(pageData[PAGEDATA.PumpRunningState1]==0?"red":"green")}>{pageData[PAGEDATA.PumpRunningState1]==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">2号泵</div>
              <div className={"item-value text-"+(pageData[PAGEDATA.PumpRunningState2]==0?"red":"green")}>{pageData[PAGEDATA.PumpRunningState2]==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">3号泵</div>
              <div className={"item-value text-"+(pageData[PAGEDATA.PumpRunningState3]==0?"red":"green")}>{pageData[PAGEDATA.PumpRunningState3]==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">4号泵</div>
              <div className={"item-value text-"+(pageData[PAGEDATA.PumpRunningState4]==0?"red":"green")}>{pageData[PAGEDATA.PumpRunningState4]==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">5号泵</div>
              <div className={"item-value text-"+(pageData[PAGEDATA.PumpRunningState5]==0?"red":"green")}>{pageData[PAGEDATA.PumpRunningState5]==0?"OFF":"ON"}</div>
            </div>
            <div className="row-item-box">
              <div className="item-text">6号泵</div>
              <div className={"item-value text-"+(pageData[PAGEDATA.PumpRunningState6]==0?"red":"green")}>{pageData[PAGEDATA.PumpRunningState6]==0?"OFF":"ON"}</div>
            </div>
          </div>
        </div>
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">今日告警</span>
          </div>
          <div>
            <ComAlarms items={pageData[PAGEDATA.PumpAlarmToday]}/>
          </div>
        </div>
      </div>
    </div>
  );
}
