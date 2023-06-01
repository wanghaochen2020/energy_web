import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-energy-station.scss';
import { ChartService } from '../../utils/chart.service';
import { PAGEDATA } from '../../constants/pageData';
import { EnergyStation } from '../../business/system-layer.service';

export const AnalyseEnergyStation = () => {
  const [loadRateButtons, setLoadRateButton] = useState([]);
  const [chartDateButtons, setChartDateButtons] = useState([]);
  let [EnergyBoilerEfficiencyDay, setEnergyBoilerEfficiencyDay] = useState([])
  let [AvrgEnergyBoilerEfficiencyDay, setAvrgEnergyBoilerEfficiencyDay] = useState(0)
  let [EnergyEfficiencyDay, setEnergyEfficiencyDay] = useState([])
  let [AvrgEnergyEfficiencyDay, setAvrgEnergyEfficiencyDay] = useState(0)
  let [EnergyCarbonDay, setEnergyCarbonDay] = useState([])
  let [EnergyCarbonMonth, setEnergyCarbonMonth] = useState([])
  let [EnergyCarbonYear, setEnergyCarbonYear] = useState([])
  let [EnergyCarbonLastYear, setEnergyCarbonLastYear] = useState([])
  let [EnergyBoilerPayloadDay, setEnergyBoilerPayloadDay] = useState([])
  let [EnergyBoilerPayloadMonth, setEnergyBoilerPayloadMonth] = useState([])
  let [EnergyBoilerPayloadYear, setEnergyBoilerPayloadYear] = useState([])

  useEffect(() => {
    setLoadRateButton([
      { name: '日', selected: true }, { name: '月', selected: false }, { name: '年', selected: false }
    ]);
    setChartDateButtons([
      { name: '日', selected: true }, { name: '月', selected: false }, { name: '年', selected: false }
    ]);

    EnergyStation.getPageData(PAGEDATA.Pages.AnalyseEnergy).then((res) => {
      res = JSON.parse(res);

      let avg = 0;
      let list = res[PAGEDATA.EnergyBoilerEfficiencyDay]
      for (let i = 0; i < list.length; i++) { 
        avg += list[i]*100;
        list[i] = (list[i]*100).toFixed(2);
      }
      if (list.length != 0) {
        avg /= list.length;
      }
      setEnergyBoilerEfficiencyDay(list);
      setAvrgEnergyBoilerEfficiencyDay(avg.toFixed(2));
      
      avg = 0;
      list = res[PAGEDATA.EnergyEfficiencyDay];
      for (let i = 0; i < list.length; i++) { 
        avg += list[i]*100;
        list[i] = (list[i]*100).toFixed(2);
      }
      if (list.length != 0) {
        avg /= list.length;
      }
      setEnergyEfficiencyDay(list);
      setAvrgEnergyEfficiencyDay(avg.toFixed(2));

      setEnergyCarbonDay(res[PAGEDATA.EnergyCarbonDay]);
      setEnergyCarbonMonth(res[PAGEDATA.EnergyCarbonMonth]);
      setEnergyCarbonYear(res[PAGEDATA.EnergyCarbonYear]);
      setEnergyCarbonLastYear(res[PAGEDATA.EnergyCarbonLastYear]);
      setEnergyBoilerPayloadDay(res[PAGEDATA.EnergyBoilerPayloadDay]);
      setEnergyBoilerPayloadMonth(res[PAGEDATA.EnergyBoilerPayloadMonth]);
      setEnergyBoilerPayloadYear(res[PAGEDATA.EnergyBoilerPayloadYear]);
    });
  }, []);

  const selectLoadRateButton = (item) => {
    if (item.selected) return;
    loadRateButtons.slice().forEach(button => {
      button.selected = false;
    });
    item.selected = true;
    setLoadRateButton([...loadRateButtons]);
  }

  const selectChartDateButton = (item) => {
    if (item.selected) return;
    chartDateButtons.slice().forEach(button => {
      button.selected = false;
    });
    item.selected = true;
    setChartDateButtons([...chartDateButtons]);
  }

  let items = EnergyStation.powerList(EnergyCarbonYear, EnergyCarbonLastYear);

  return (
    <div className="analyse-energy-station-view">
      <div className="operation-summary">
        <div className="top-info-box" style={{ width: '260px' }}>
          <ReactEcharts
            style={{ width: '260px', height: '260px', margin: 'auto' }}
            option={ChartService.getNewGaugeOptions({ 
              value: AvrgEnergyBoilerEfficiencyDay,
              detail: '今日锅炉平均热效率'
            })} 
          />
        </div>
        {/* <div className="top-info-box" style={{ width: '260px' }}>
          <ReactEcharts
            style={{ width: '260px', height: '260px', margin: 'auto' }}
            option={ChartService.getNewGaugeOptions({ 
              value: AvrgEnergyWatertankEfficiencyDay,
              detail: '今日蓄热水箱平均热效率',
              numberColor: '#5ee200',
              itemColor: '#5ee200'
            })} 
          />
        </div> */}
        <div className="top-info-box" style={{ width: '260px' }}>
          <ReactEcharts
            style={{ width: '260px', height: '260px', margin: 'auto' }}
            option={ChartService.getNewGaugeOptions({ 
              value: AvrgEnergyEfficiencyDay,
              detail: '今日系统总效率',
              numberColor: '#f94e00',
              itemColor: '#f94e00'
            })} 
          />
        </div>
      </div>
      <div className="top-box">
        <div className="top-left">
          <div className="box-wrapper" style={{width: '100%', height: '350px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">电锅炉热效率</span>
            </div>
            <ReactEcharts style={{ width: '100%', height: '350px', margin: 'auto' }} option={
              ChartService.getLineOptions({
                legend: {
                  // data: ['电锅炉', '蓄热水箱', '能源站系统']
                  data: ['电锅炉', '能源站系统']
                },
                xName: '时',
                yName: '%',
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                series: [
                  {
                    name: '电锅炉',
                    data: EnergyBoilerEfficiencyDay
                  },
                  // {
                  //   name: '蓄热水箱',
                  //   data: EnergyWatertankEfficiencyDay
                  // },
                  {
                    name: '能源站系统',
                    data: EnergyEfficiencyDay
                  }
                ]
              })} />
          </div>
          <div className="box-wrapper" style={{width: '100%', height: '350px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">负载率统计</span>
              </div>
            <div className="date-button-wrapper" style={{top: '38px'}}>
              {
                loadRateButtons.map((item, index) =>
                  <span onClick={() => selectLoadRateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
            <ReactEcharts style={{ width: '100%', height: '350px', margin: 'auto' }} option={
              ChartService.getBarOptions({
                yName: '%',
                category: (loadRateButtons[2] && loadRateButtons[2].selected) ? [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12]
                : ((loadRateButtons[1] && loadRateButtons[1].selected) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]),
                series: [
                  {
                    data: (loadRateButtons[2] && loadRateButtons[2].selected) ? EnergyBoilerPayloadYear
                    : ((loadRateButtons[1] && loadRateButtons[1].selected) ? EnergyBoilerPayloadMonth : EnergyBoilerPayloadDay)
                  }
                ]
              })} />
          </div>
        </div>
        <div className="top-right">
          <div className="box-wrapper" style={{width: '100%', height: '350px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">碳排放量统计</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px'}}>
                {
                  chartDateButtons.map((item, index) =>
                    <span onClick={() => selectChartDateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
                }
              </div>
              <ReactEcharts style={{ width: '100%', height: '350px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  xName: (chartDateButtons[2] && chartDateButtons[2].selected) ? "月"
                  : ((chartDateButtons[1] && chartDateButtons[1].selected) ? "日" : "时"),
                  yName: 'tCO2',
                  data: (chartDateButtons[2] && chartDateButtons[2].selected) ? [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12]
                   : ((chartDateButtons[1] && chartDateButtons[1].selected) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                   : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]),
                  series: [
                    {
                      data: (chartDateButtons[2] && chartDateButtons[2].selected) ? EnergyCarbonYear
                       : ((chartDateButtons[1] && chartDateButtons[1].selected) ? EnergyCarbonMonth : EnergyCarbonDay)
                    }
                  ]
                })} />
          </div>
          <div className="box-wrapper" style={{width: '100%', height: '350px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">电量类型碳排占比</span>
            </div>
            <ReactEcharts
              style={{ width: '100%', height: '320px', margin: 'auto' }}
              option={
                ChartService.getNewPieOptions({
                  title: '10000',
                  subTitle: '总数',
                  name: '电量类型碳排占比',
                  data: [
                    { value: 59, name: '火电' },
                    { value: 37, name: '绿电' },
                    { value: 40, name: '其它' },
                  ]
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <table className="table-history">
          <thead>
            <tr>
              <th>时间</th>
              <th>能源站耗能（MWH）</th>
              <th>同比去年同月耗能</th>
              <th>环比上月耗能</th>
              <th>碳排放量（tCO2）</th>
              <th>同比去年同月碳排放量</th>
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
