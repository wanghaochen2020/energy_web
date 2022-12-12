import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-solar-water-heater.scss';
import { ChartService } from '../../utils/chart.service';
import { EnergyStation } from '../../business/system-layer.service';
import { PAGEDATA } from '../../constants/pageData';

export const AnalyseSolarWaterHeater = () => {
  const [rateButtons, setRateButtons] = useState([
    { name: '日', selected: true }, { name: '月', selected: false }, { name: '年', selected: false }
  ]);
  const [systemRateButtons, setSystemRateButtons] = useState([
    { name: '日', selected: true }, { name: '月', selected: false }, { name: '年', selected: false }
  ]);
  const [systemRateButtons2, setSystemRateButtons2] = useState([
    { name: '日', selected: true }, { name: '月', selected: false }, { name: '年', selected: false }
  ]);
  const [chartDateButtons, setChartDateButtons] = useState([
    { name: '日', selected: true }, { name: '月', selected: false }, { name: '年', selected: false }
  ]);

  let [SolarWaterHeatEfficiencyDay, setSolarWaterHeatEfficiencyDay] = useState([])
  let [SolarWaterHeatEfficiencyMonth, setSolarWaterHeatEfficiencyMonth] = useState([])
  let [SolarWaterHeatEfficiencyYear, setSolarWaterHeatEfficiencyYear] = useState([])
  let [AvrgSolarWaterHeatEfficiencyDay, setAvrgSolarWaterHeatEfficiencyDay] = useState(0)
  let [SolarWaterGuaranteeRateDay, setSolarWaterGuaranteeRateDay] = useState([])
  let [SolarWaterGuaranteeRateMonth, setSolarWaterGuaranteeRateMonth] = useState([])
  let [SolarWaterGuaranteeRateYear, setSolarWaterGuaranteeRateYear] = useState([])
  let [AvrgSolarWaterGuaranteeRateDay, setAvrgSolarWaterGuaranteeRateDay] = useState(0)



  useEffect(() => {
    let dayStr = EnergyStation.getDayStr()
    let yearStr = EnergyStation.getYearStr();
    EnergyStation.getTable(PAGEDATA.SolarWaterHeatEfficiencyDay, dayStr).then((res)=> {
      let avg = 0;
      for (let i = 0; i < res.length; i++) { 
        avg += res[i];
      }
      if (!(res.length)) {
        avg /= res.length;
      }
      setSolarWaterHeatEfficiencyDay(res)
      setAvrgSolarWaterHeatEfficiencyDay(avg)
    })
    EnergyStation.getTable(PAGEDATA.SolarWaterHeatEfficiencyMonth, yearStr).then((res)=> {
      setSolarWaterHeatEfficiencyMonth(res);
    });
    EnergyStation.getTable(PAGEDATA.SolarWaterHeatEfficiencyYear, yearStr).then((res)=> {
      setSolarWaterHeatEfficiencyYear(res);
    });
    EnergyStation.getTable(PAGEDATA.SolarWaterGuaranteeRateDay, dayStr).then((res)=> {
      let avg = 0;
      for (let i = 0; i < res.length; i++) { 
        avg += res[i];
      }
      if (!(res.length)) {
        avg /= res.length;
      }
      setSolarWaterGuaranteeRateDay(res)
      setAvrgSolarWaterGuaranteeRateDay(avg)
    })
    EnergyStation.getTable(PAGEDATA.SolarWaterGuaranteeRateMonth, yearStr).then((res)=> {
      setSolarWaterGuaranteeRateMonth(res);
    });
    EnergyStation.getTable(PAGEDATA.SolarWaterGuaranteeRateYear, yearStr).then((res)=> {
      setSolarWaterGuaranteeRateYear(res);
    });
  }, [])
  const selectRateButton = (item) => {
    if (item.selected) return;
    rateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setRateButtons([...rateButtons]);
  }

  const selectSystemRateButtons = (item) => {
    if (item.selected) return;
    systemRateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setSystemRateButtons([...systemRateButtons]);
  }

  const selectSystemRateButtons2 = (item) => {
    if (item.selected) return;
    systemRateButtons2.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setSystemRateButtons2([...systemRateButtons2]);
  }

  return (
    <div className="analyse-solar-water-heater-view">
      <div className="operation-summary">
          <div className="right-info-box">
              <div className="chart-summary">
                <div>同比增长</div>
                <div>25%</div>
                </div>
              <div style={{ textAlign: 'center', width: '400px', height: '210px' }}>
                <ReactEcharts style={{ width: '100%', height: '200px', margin: 'auto' }} option={{
                  tooltip: {
                    trigger: 'item'
                  },
                  series: [
                    {
                      type: 'pie',
                      startAngle: 90,
                      selectedMode: 'single',
                      radius: ['50%', '60%'],
                      data: [
                        { value: 100, name: '上期能耗：40000' }
                      ]
                    },
                    {
                      type: 'pie',
                      startAngle: 20,
                      hoverAnimation: false,
                      radius: ["55%", "70%"],
                      data: [{
                        value: 80,
                        itemStyle: {
                          normal: {
                            color: "rgba(1,218,220,0)"
                          }
                        }
                      },
                      {
                        value: 30,
                        name: '本期能耗：50000',
                        itemStyle: {
                          normal: {
                            color: "rgba(1,218,220,1)"
                          }
                        }
                      },
                      ]
                    }
                  ]
                }} />
              </div>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
              data: [{ value: 100 }, { value: {AvrgSolarWaterHeatEfficiencyDay}}], startAngle: 240
            })} />
            <div className="number-value">今日太阳能集热效率: {AvrgSolarWaterHeatEfficiencyDay}%</div>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
              data: [{ value: 100 }, { value: {AvrgSolarWaterGuaranteeRateDay}}], colors: ['#323891', '#ecf75d'], startAngle: 40
            })}/>
            <div className="number-value">今日太阳能保证率: {AvrgSolarWaterGuaranteeRateDay}%</div>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
              data: [{ value: 100 }, { value: 70}], colors: ['#323891', '#45f9b7'], startAngle: 140
            })}/>
            <div className="number-value">今日系统总效率: 70%</div>
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
              <span className="title-text">太阳能集热效率</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px', right: '20px'}}>
              {
                rateButtons.map((item, index) =>
                  <span onClick={() => selectRateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getBarOptions({
                  yName: '%',
                  category: (rateButtons[2] && rateButtons[2].selected) ? [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12]
                  : ((rateButtons[1] && rateButtons[1].selected) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                  : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]),
                  series: [
                    {
                      data: (rateButtons[2] && rateButtons[2].selected) ? SolarWaterHeatEfficiencyYear
                      : ((rateButtons[1] && rateButtons[1].selected) ? SolarWaterHeatEfficiencyMonth : SolarWaterHeatEfficiencyDay)
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
              <span className="title-text">今日碳排放量统计</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px', right: '20px'}}>
              {
                chartDateButtons.map((item, index) =>
                  <span onClick={() => setChartDateButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  legend: {
                    show: true,
                    top: 30,
                    right: 12,
                    textStyle: {
                      color: '#fff',
                      fontSize: 14
                    },
                    data: ['绿电碳排放量', '原煤碳排放量', '天然气碳排放量']
                  },
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  series: [
                    {
                      name: '绿电碳排放量',
                      data: [150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                        230, 224, 100, 218, 135, 80, 147, 260, 200, 100]
                    },
                    {
                      name: '原煤碳排放量',
                      data: [35, 80, 47, 160, 100, 50, 60, 50, 60, 30, 124, 60, 118,
                        80, 47, 160, 100, 100, 130, 124, 100, 118, 35]
                    },
                    {
                      name: '天然气碳排放量',
                      data: [25, 60, 57, 40, 50, 40, 50, 50, 60, 40, 54, 50, 48,
                        60, 57, 40, 50, 60, 40, 54, 60, 48, 45]
                    }
                  ]
                })} />
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="bottom-left">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">太阳能保证率</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px', right: '20px'}}>
              {
                systemRateButtons.map((item, index) =>
                  <span onClick={() => selectSystemRateButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getBarOptions({
                  category: (systemRateButtons[2] &&systemRateButtons[2].selected) ? [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12]
                  : ((systemRateButtons[1] && systemRateButtons[1].selected) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                  : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]),
                  series: [
                    {
                      data: (systemRateButtons[2] && systemRateButtons[2].selected) ? SolarWaterGuaranteeRateYear
                      : ((systemRateButtons[1] && systemRateButtons[1].selected) ? SolarWaterGuaranteeRateMonth : SolarWaterGuaranteeRateDay)
                    }
                  ]
                })} />
          </div>
        </div>
        <div className="bottom-right">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">系统总效率</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px', right: '20px'}}>
              {
                systemRateButtons2.map((item, index) =>
                  <span onClick={() => selectSystemRateButtons2(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getBarOptions({
                  category: [1, 2, 3, 4, 5, 6, 7, 8],
                  series: [
                    {
                      data: [150, 60, 230, 224, 100, 218, 135, 80]
                    }
                  ]
                })} />
          </div>
        </div>
      </div>
    </div>
  );
}
