import React, { useEffect,useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './allocation-day.scss';
import { ChartService } from '../../utils/chart.service';
import { Allocation } from '../../business/allocation';

export const AllocationDay = () => {
  //蓄热水箱逐时建议工况
  const [waterHours, setWaterHours] = useState(['23:00-07:00', '07:00-10:00', '10:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-23:00']);
  const [loadData, setLoadData] = useState([150, 0, 230, 0, 0, 0]);
  const [tempData, setTempData] = useState([0, 20, 0, 16, 20, 30]);
  //错峰用电
  const [flatData, setFlatData] = useState([]);
  const [peakData, setPeakData] = useState([]);
  const [vallyData, setVallyData] = useState([]);
  //负荷明细统计
  const [boilerLoadData, setBoilerLoadData] = useState([]);
  const [tankHeatingData, setTankHeatingData] = useState([]);
  const [tankStorageData, setTankStorageData] = useState([]);
  //设备运行时间
  const [deviceWorkTimeData, setDeviceWorkTimeData] = useState([]);
  //电锅炉逐时建议工况
  const [boilerFactData, setBoilerFactData] = useState([]);
  const [boilerSuggestData, setBoilerSuggestData] = useState([]);
  //设备运行状态
  const [deviceWorkStateData, setDeviceWorkStateData] = useState([]);

  useEffect(() => {
      
      Allocation.getPeriod().then((res)=> {
        setFlatData(res.平电价)
        setPeakData(res.峰电价)
        setVallyData(res.谷电价)
      });

      Allocation.getDeviceWorkTime().then((res)=> {
        setDeviceWorkTimeData(res.data)
      });

      Allocation.getLoadDetail().then((res)=> {
        setBoilerLoadData(res.电锅炉负荷)
        setTankHeatingData(res.水箱放热负荷)
        setTankStorageData(res.水箱蓄热负荷)
      });

      Allocation.getBoilerConfigDaily().then((res)=> {
        setBoilerFactData(res.实际)
        setBoilerSuggestData(res.建议)
      });

      Allocation.getTankConfigDaily().then((res)=> {
        setLoadData([0,res.data[1],0,res.data[3],0,0])
        setTempData([res.data[0],0,res.data[2],0,res.data[4],res.data[5]])
      });

      Allocation.getDeviceWorkState().then((res)=> {
        setDeviceWorkStateData(res.data)
      });

  }, []);

  return (
    <div className="allocation-day-view">
      <div className="top-box">
        <div className="top-left">
          <div className="box-wrapper" style={{width: '100%', height: '300px', marginBottom: '-10px'}}>
              <div className="top-left-corner"></div>
              <div className="top-right-corner"></div>
              <div className="bottom-left-corner"></div>
              <div className="bottom-right-corner"></div>
              <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
                <span className="box-title-icon">&#9658;</span>
                <span className="title-text">错峰用电</span>
              </div>
            <div className="e-price">
              <div className="e-price-item">
                <div className="e-price-desc">平电价阶段</div>
                <div>{flatData[0]}:00 - {flatData[1]}:00</div>
                <div>{flatData[2]}:00 - {flatData[3]}:00</div>
                <div>{flatData[4]}:00 - {flatData[5]}:00</div>
              </div>
              <div className="e-price-item">
                <div className="e-price-desc">峰电价阶段</div>
                <div>{peakData[0]}:00 - {peakData[1]}:00</div>
                <div>{peakData[2]}:00 - {peakData[3]}:00</div>
              </div>
              <div className="e-price-item">
                <div className="e-price-desc">谷电价阶段</div>
                <div>{vallyData[0]}:00 - {vallyData[1]}:00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="box-wrapper" style={{width: '100%', height: '300px', marginBottom: '-10px'}}>
              <div className="top-left-corner"></div>
              <div className="top-right-corner"></div>
              <div className="bottom-left-corner"></div>
              <div className="bottom-right-corner"></div>
              <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
                <span className="box-title-icon">&#9658;</span>
                <span className="title-text">今日设备运行工况</span>
              </div>
                <div className="device-status-box">
                <div className="device-status-column">
                  <div className="device-status-title">锅炉运行</div>
                  <div className="row-item-box">
                    <div className="item-text">1#锅炉</div>
                    <div className="item-value text-yellow">{deviceWorkTimeData[0]}h/天</div>
                  </div>
                  <div className="row-item-box">
                    <div className="item-text">2#锅炉</div>
                    <div className="item-value text-yellow">{deviceWorkTimeData[1]}h/天</div>
                  </div>
                  <div className="row-item-box">
                    <div className="item-text">3#锅炉</div>
                    <div className="item-value text-yellow">{deviceWorkTimeData[2]}h/天</div>
                  </div>
                  <div className="row-item-box">
                    <div className="item-text">4#锅炉</div>
                    <div className="item-value text-yellow">{deviceWorkTimeData[3]}h/天</div>
                  </div>
                </div>
                <div className="device-status-column">
                  <div className="device-status-title">供热泵运行</div>
                  <div className="row-item-box">
                    <div className="item-text">GRB-1</div>
                    <div className="item-value text-yellow">{deviceWorkTimeData[4]}h/天</div>
                  </div>
                  <div className="row-item-box">
                    <div className="item-text">GRB-2</div>
                    <div className="item-value text-yellow">{deviceWorkTimeData[5]}h/天</div>
                  </div>
                  <div className="row-item-box">
                    <div className="item-text">GRB-3</div>
                    <div className="item-value text-yellow">{deviceWorkTimeData[6]}h/天</div>
                  </div>
                </div>
                <div className="device-status-column">
                  <div className="device-status-title">蓄热水箱</div>
                  <div className="row-item-box">
                    <div className="item-text">蓄热水箱-1</div>
                    <div className="item-value text-yellow">{deviceWorkTimeData[7]}h/天</div>
                  </div>
                  <div className="row-item-box">
                    <div className="item-text">蓄热水箱-2</div>
                    <div className="item-value text-yellow">{deviceWorkTimeData[8]}h/天</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="top-box">
        <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
              <div className="top-left-corner"></div>
              <div className="top-right-corner"></div>
              <div className="bottom-left-corner"></div>
              <div className="bottom-right-corner"></div>
              <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
                <span className="box-title-icon">&#9658;</span>
                <span className="title-text">负荷明细统计</span>
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
                    data: ['电锅炉负荷(除去蓄热部分)', '水箱蓄热负荷kw*h', '水箱放热负荷kw*h']
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
                    name: '时',
                    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    axisLine: {
                      show: true,
                      lineStyle: {
                        color: '#fff',
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
                        color: '#fff',
                        width: 1,
                        type: 'solid'
                      }
                    },
                    splitLine: {
                      show: false
                    }
                  },
                  series: [
                    {
                      name: '电锅炉负荷(除去蓄热部分)',
                      //data: [130, 150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                      //  230, 224, 100, 218, 135, 80, 147, 260, 200, 100],
                      data: boilerLoadData,
                      type: 'bar',
                      stack: 'Ad',
                      symbolSize: 6,
                      barWidth: 12
                    },
                    {
                      name: '水箱蓄热负荷kw*h',
                      //data: [120, 35, 80, 47, 160, 100, 50, 60,50, 60, 30, 124, 60, 118, 
                      //  80, 47, 160, 100, 100, 130, 124, 100, 118, 35],
                      data: tankStorageData,
                      type: 'bar',
                      stack: 'Ad',
                      symbolSize: 6,
                      barWidth: 12
                    },
                    {
                      name: '水箱放热负荷kw*h',
                      //data: [65, 45, 60, 47, 160, 60, 50, 60,80, 50, 40, 124, 40, 118, 
                      //  80, 47, 130, 100, 80, 120, 124, 100, 108, 35],
                      data: tankHeatingData,
                      type: 'bar',
                      stack: 'Ad',
                      barWidth: 12,
                    }
                  ]
                }} />
          </div>
      </div>
      <div className="top-box">
        <div className="top-left">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
              <div className="top-left-corner"></div>
              <div className="top-right-corner"></div>
              <div className="bottom-left-corner"></div>
              <div className="bottom-right-corner"></div>
              <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
                <span className="box-title-icon">&#9658;</span>
                <span className="title-text">电锅炉逐时建议工况</span>
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  legend: {
                    show: true,
                    top: 10,
                    right: 12,
                    textStyle: {
                      color: '#fff',
                      fontSize: 14
                    },
                    data: ['建议运行台数', '实际运行台数']
                  },
                  xName: '时',
                  yName: '台数',
                  data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  series: [
                    {
                      name: '建议运行台数',
                      data: boilerSuggestData,
                    },
                    {
                      name: '实际运行台数',
                      data: boilerFactData,
                    }
                  ]
                })} />
          </div>
        </div>
        <div className="top-right">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
              <div className="top-left-corner"></div>
              <div className="top-right-corner"></div>
              <div className="bottom-left-corner"></div>
              <div className="bottom-right-corner"></div>
              <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
                <span className="box-title-icon">&#9658;</span>
                <span className="title-text">蓄热水箱逐时建议工况</span>
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                legend: {
                  show: true,
                  top: 6,
                  left: 10,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  },
                  data: ['负荷量', '温度(°C)']
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
                  data: waterHours,
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#ffffff',
                      width: 1,
                      type: 'solid'
                    },
                  }
                },
                yAxis: [{
                  name: 'KWH',
                  type: 'value',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#ffffff',
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
                  max: 100,
                  position: 'right',
                  alignTicks: false,
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
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
                    name: '负荷量',
                    data: loadData,
                    type: 'bar',
                    barGap: -1,
                    barWidth: '60%',
                  },
                  {
                    name: '温度(°C)',
                    yAxisIndex: 1,
                    data: tempData,
                    type: 'bar',
                    barWidth: '60%',
                  }
                ]
              }} />
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <table className="table-history">
          <thead>
            <tr>
              <th>1#锅炉</th>
              <th>2#锅炉</th>
              <th>3#锅炉</th>
              <th>3#锅炉</th>
              <th>蓄热水箱一</th>
              <th>蓄热水箱二</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={(deviceWorkStateData[0]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[0]}</span></td> 
              <td><span className={(deviceWorkStateData[1]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[1]}</span></td> 
              <td><span className={(deviceWorkStateData[2]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[2]}</span></td> 
              <td><span className={(deviceWorkStateData[3]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[3]}</span></td> 
              <td><span className={(deviceWorkStateData[4]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[4]}</span></td> 
              <td><span className={(deviceWorkStateData[5]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[5]}</span></td> 
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bottom-box">
        <table className="table-history">
          <thead>
            <tr>
              <th>XRB-1</th>
              <th>XRB-2</th>
              <th>XRB-3</th>
              <th>GRB-1</th>
              <th>GRB-2</th>
              <th>GRB-3</th>
              <th>IV-1</th>
              <th>IV-2</th>
              <th>IV-3</th>
              <th>DV-4</th>
              <th>IV-5</th>
              <th>DV-6</th>
              <th>DV-7</th>
              <th>DV-8</th>
              <th>DVT-1</th>
              <th>DVT-2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={(deviceWorkStateData[6]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[6]}</span></td> 
              <td><span className={(deviceWorkStateData[7]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[7]}</span></td> 
              <td><span className={(deviceWorkStateData[8]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[8]}</span></td> 
              <td><span className={(deviceWorkStateData[9]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[9]}</span></td> 
              <td><span className={(deviceWorkStateData[10]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[10]}</span></td> 
              <td><span className={(deviceWorkStateData[11]==="工作") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[11]}</span></td> 
              <td><span className={(deviceWorkStateData[12]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[12]}</span></td>
              <td><span className={(deviceWorkStateData[13]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[13]}</span></td>
              <td><span className={(deviceWorkStateData[14]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[14]}</span></td>
              <td><span className={(deviceWorkStateData[15]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[15]}</span></td>
              <td><span className={(deviceWorkStateData[16]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[16]}</span></td>
              <td><span className={(deviceWorkStateData[17]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[17]}</span></td>
              <td><span className={(deviceWorkStateData[18]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[18]}</span></td>
              <td><span className={(deviceWorkStateData[19]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[19]}</span></td>
              <td><span className={(deviceWorkStateData[20]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[20]}</span></td>
              <td><span className={(deviceWorkStateData[21]==="开通") ? "text-box-green" : "text-box-red"}>{deviceWorkStateData[21]}</span></td> 
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
